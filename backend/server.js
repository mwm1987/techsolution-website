import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);

app.use(express.json({ limit: "30kb" }));

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.length === 0) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.error("CORS blocked origin:", origin);
      return callback(new Error(`CORS: Origin not allowed: ${origin}`));
    }
  })
);

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

function buildEmailHtml({ nombre, email, servicio, mensaje }) {
  return `
    <div style="font-family: Arial, sans-serif; color:#111827; line-height:1.6;">
      <h2 style="color:#0ea5e9;">Nueva consulta desde TechSolutions</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Servicio:</strong> ${servicio}</p>
      <p><strong>Mensaje:</strong></p>
      <div style="white-space:pre-line; background:#f3f4f6; padding:14px; border-radius:10px;">${mensaje}</div>
    </div>
  `;
}

function buildEmailText({ nombre, email, servicio, mensaje }) {
  return `
Nueva consulta desde la web de TechSolutions

Nombre: ${nombre}
Email: ${email}
Servicio: ${servicio}

Mensaje:
${mensaje}
`;
}

async function sendWithBrevo({ nombre, email, servicio, mensaje }) {
  const apiKey = requiredEnv("BREVO_API_KEY");

  const mailTo = requiredEnv("MAIL_TO");
  const mailFrom = requiredEnv("MAIL_FROM");
  const mailFromName = process.env.MAIL_FROM_NAME || "TechSolutions Web";

  const subject = `Nueva consulta TechSolutions - ${servicio}`;

  const payload = {
    sender: {
      name: mailFromName,
      email: mailFrom
    },
    to: [
      {
        email: mailTo,
        name: "TechSolutions"
      }
    ],
    replyTo: {
      email,
      name: nombre
    },
    subject,
    htmlContent: buildEmailHtml({ nombre, email, servicio, mensaje }),
    textContent: buildEmailText({ nombre, email, servicio, mensaje })
  };

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": apiKey,
      "content-type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      data?.message ||
      data?.code ||
      `Brevo API error: HTTP ${response.status}`;

    const error = new Error(message);
    error.status = response.status;
    error.details = data;
    throw error;
  }

  return data;
}

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: "TechSolutions backend",
    provider: "Brevo API",
    message: "Backend running. Use /api/health, /api/debug-config, /api/test-brevo or /api/contact."
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "TechSolutions contact backend",
    provider: "Brevo API",
    time: new Date().toISOString()
  });
});

app.get("/api/debug-config", (_req, res) => {
  res.json({
    ok: true,
    provider: "Brevo API",
    brevo_api_key_is_set: Boolean(process.env.BREVO_API_KEY),
    brevo_api_key_prefix: process.env.BREVO_API_KEY
      ? `${process.env.BREVO_API_KEY.slice(0, 8)}...`
      : null,
    mail_to: process.env.MAIL_TO || null,
    mail_from: process.env.MAIL_FROM || null,
    mail_from_name: process.env.MAIL_FROM_NAME || null,
    allowed_origins: allowedOrigins
  });
});

app.get("/api/test-brevo", async (_req, res) => {
  try {
    const result = await sendWithBrevo({
      nombre: "Test TechSolutions",
      email: process.env.MAIL_TO || "techsolution.cod@gmail.com",
      servicio: "Prueba Brevo API",
      mensaje: "Este es un correo de prueba enviado desde el backend de TechSolutions usando Brevo API."
    });

    res.json({
      ok: true,
      message: "Brevo test email sent successfully.",
      result
    });
  } catch (error) {
    console.error("Brevo test error:", {
      message: error.message,
      status: error.status,
      details: error.details
    });

    res.status(500).json({
      ok: false,
      message: "Brevo test failed.",
      error: error.message,
      status: error.status || null,
      details: error.details || null
    });
  }
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

    const result = await sendWithBrevo({
      nombre,
      email,
      servicio,
      mensaje
    });

    return res.json({
      ok: true,
      message: "Mensaje enviado correctamente.",
      result
    });
  } catch (error) {
    console.error("Contact error:", {
      message: error.message,
      status: error.status,
      details: error.details
    });

    return res.status(500).json({
      ok: false,
      message: "No se pudo enviar el mensaje.",
      error: error.message,
      status: error.status || null,
      details: error.details || null
    });
  }
});

app.listen(PORT, () => {
  console.log(`TechSolutions backend running on port ${PORT} using Brevo API`);
});
