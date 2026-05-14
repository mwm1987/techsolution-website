const header = document.getElementById("header");
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const themeToggle = document.getElementById("themeToggle");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("techsolutions-theme", theme);
  themeToggle.textContent = theme === "dark" ? "☾" : "☀";
}

setTheme(localStorage.getItem("techsolutions-theme") || "dark");

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 40);

  const sections = document.querySelectorAll("main section[id]");
  const scrollY = window.scrollY + 140;

  sections.forEach(section => {
    const id = section.getAttribute("id");
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (!link) return;

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollY >= top && scrollY < bottom) {
      document.querySelectorAll(".nav-links a").forEach(a => a.classList.remove("active"));
      link.classList.add("active");
    }
  });
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Digital rain background
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");
let columns = [];
const chars = "01TS{}[]<>/\\|+=TECHSOLUTIONS";

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const columnCount = Math.floor(window.innerWidth / 22);
  columns = Array.from({ length: columnCount }, () => ({
    y: Math.random() * window.innerHeight,
    speed: 0.35 + Math.random() * 0.85
  }));
}

function drawMatrix() {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.font = "14px JetBrains Mono";
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--brand").trim() || "#38bdf8";

  columns.forEach((col, i) => {
    const x = i * 22;
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.globalAlpha = 0.16 + Math.random() * 0.22;
    ctx.fillText(char, x, col.y);
    col.y += col.speed;
    if (col.y > window.innerHeight + 20) col.y = -20;
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(drawMatrix);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawMatrix();

// Contact form using your own Render backend.
// IMPORTANT:
// In index.html replace:
// https://TU-BACKEND-DE-RENDER.onrender.com
// with your real Render URL.
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const API_BASE_URL = window.TECHSOLUTIONS_API_URL || "https://TU-BACKEND-DE-RENDER.onrender.com";

contactForm.addEventListener("submit", async function(e) {
  e.preventDefault();
  e.stopPropagation();

  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  formStatus.textContent = "";
  formStatus.className = "form-status";

  if (!contactForm.checkValidity()) {
    formStatus.textContent = "Completa todos los campos requeridos antes de enviar.";
    formStatus.classList.add("error");
    return false;
  }

  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";
  formStatus.textContent = "Enviando mensaje...";

  const payload = {
    nombre: document.getElementById("nombre").value.trim(),
    email: document.getElementById("email").value.trim(),
    servicio: document.getElementById("servicio").value.trim(),
    mensaje: document.getElementById("mensaje").value.trim()
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(result.message || "Error al enviar el mensaje.");
    }

    formStatus.textContent = "Mensaje enviado correctamente. Te responderemos pronto.";
    formStatus.classList.add("success");
    contactForm.reset();
  } catch (error) {
    console.error("Backend contact error:", error);
    formStatus.textContent = "No se pudo enviar el mensaje. Intenta por WhatsApp o escribe a techsolution.cod@gmail.com.";
    formStatus.classList.add("error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }

  return false;
});
