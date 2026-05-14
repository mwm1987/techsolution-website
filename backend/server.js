import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet({
  contentSecurityPolicy: false
}));

app.use(express.json({ limit: "20kb" }));

app.use(cors({
  origin(origin, callback) {
    // Allow curl/Postman/no origin in development
    if (!origin) return callback(null, true);

    if (allowedOrigins.length === 0) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("CORS: Origin not allowed"));
  }
}));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    ok: false,
    message: "Demasiados intentos. Intenta nuevamente en unos minutos."
  }
});

function sanitize(value) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function requiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const transporter = nodemailer.createTransport({
  host: requiredEnv("SMTP_HOST"),
  port: Number(process.env.SMTP_PORT || 465),
  secure: String(process.env.SMTP_SECURE || "true") === "true",
  auth: {
    user: requiredEnv("SMTP_USER"),
    pass: requiredEnv("SMTP_PASS")
  }
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "TechSolutions contact backend",
    time: new Date().toISOString()
  });
});

app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const nombre = sanitize(req.body.nombre);
    const email = sanitize(req.body.email);
    const servicio = sanitize(req.body.servicio);
    const mensaje = sanitize(req.body.mensaje);

    if (!nombre || !email || !servicio || !mensaje) {
      return res.status(400).json({
        ok: false,
        message: "Todos los campos son obligatorios."
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        ok: false,
        message: "El email no parece válido."
      });
    }

    if (mensaje.length > 3000) {
      return res.status(400).json({
        ok: false,
        message: "El mensaje es demasiado largo."
      });
    }

    const toEmail = requiredEnv("MAIL_TO");
    const fromEmail = process.env.MAIL_FROM || process.env.SMTP_USER;

    const subject = `Nueva consulta TechSolutions - ${servicio}`;

    const text = `
Nueva consulta desde la web de TechSolutions

Nombre: ${nombre}
Email: ${email}
Servicio: ${servicio}

Mensaje:
${mensaje}
`;

    const html = `
      <div style="font-family: Arial, sans-serif; color:#111827; line-height:1.6;">
        <h2 style="color:#0ea5e9;">Nueva consulta desde TechSolutions</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Servicio:</strong> ${servicio}</p>
        <p><strong>Mensaje:</strong></p>
        <div style="white-space:pre-line; background:#f3f4f6; padding:14px; border-radius:10px;">${mensaje}</div>
      </div>
    `;

    await transporter.sendMail({
      from: `"TechSolutions Web" <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject,
      text,
      html
    });

    return res.json({
      ok: true,
      message: "Mensaje enviado correctamente."
    });
  } catch (error) {
    console.error("Contact error:", error);
    return res.status(500).json({
      ok: false,
      message: "No se pudo enviar el mensaje."
    });
  }
});

// Optional: serve frontend from backend too
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "..", "frontend");

app.use(express.static(frontendPath));

app.get("*", (_req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`TechSolutions backend running on port ${PORT}`);
});
