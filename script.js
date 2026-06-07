const header = document.getElementById("header");
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const themeToggle = document.getElementById("themeToggle");
const langButtons = document.querySelectorAll(".lang-btn");

const translations = {
  en: {
    "Gemelo Digital": "Digital Twin",
    "Demostración de automatización industrial": "Industrial Automation Demonstration",
    "Celda robótica de paletizado controlada mediante PLC": "PLC-Controlled Robotic Palletizing Cell",
    "Visualización en tiempo real de una secuencia automatizada que integra lógica PLC Ladder, cinta transportadora, sensores, alarmas, conteo de producción y un robot industrial de manipulación.": "Real-time visualization of an automated sequence integrating PLC Ladder logic, conveyor belt, sensors, alarms, production counts and an industrial robot arm.",
    "PLC Ladder": "PLC Ladder",
    "Robótica industrial": "Industrial Robotics",
    "Digital Twin": "Digital Twin",
    "Sensores": "Sensors",
    "Alarmas": "Alarms",
    "Control de procesos": "Process Control",
    "¿Qué demuestra esta solución?": "What does this solution demonstrate?",
    "Integración entre PLC y robótica": "Integration between PLC and robotics",
    "Secuencias automáticas de producción": "Automated production sequences",
    "Monitoreo de sensores y actuadores": "Sensor and actuator monitoring",
    "Alarmas y diagnóstico": "Alarms and diagnostics",
    "Conteo de ciclos": "Cycle counting",
    "Visualización de procesos en tiempo real": "Real-time process visualization",
    "Posibilidad de adaptar el sistema a proyectos industriales reales": "Adaptability to real industrial projects",
    '\"Esta demostración puede adaptarse a líneas de producción, estaciones de ensamblaje, sistemas de clasificación, celdas robotizadas y procesos de paletizado.\"': '"This demonstration can be adapted to production lines, assembly stations, sorting systems, robotic cells, and palletizing processes."',
    "Ver demo completa": "View Full Demo",
    "Solicitar un proyecto": "Request Project",
    "Demo": "Demo",

    "Tecnología • Innovación • Soluciones": "Technology • Innovation • Solutions",
    "Inicio": "Home",
    "Servicios": "Services",
    "Proceso": "Process",
    "Portfolio": "Portfolio",
    "Nosotros": "About",
    "Contacto": "Contact",
    "Cotizar": "Quote",
    "Software + Automatización Industrial": "Software + Industrial Automation",
    "Damos vida a tus ideas con": "We bring your ideas to life with",
    "soluciones digitales reales.": "real digital solutions.",
    "Creamos aplicaciones móviles, páginas web, software para Windows y sistemas de automatización industrial con PLC, HMI y SCADA.": "We build mobile apps, websites, Windows software and industrial automation systems with PLC, HMI and SCADA.",
    "Solicitar cotización": "Request a quote",
    "Ver servicios": "View services",
    "Años en automatización y control": "Years in automation and controls",
    "Años desarrollando software": "Years developing software",
    "Soporte según proyecto": "Project-based support",
    "Software moderno + ingeniería de control en un solo lugar.": "Modern software + controls engineering in one place.",
    "TechSolutions puede ayudarte desde una web profesional hasta una app conectada a Firebase, un software Windows interno o una integración industrial con PLC.": "TechSolutions can help you build anything from a professional website to a Firebase-powered app, internal Windows software or an industrial PLC integration.",
    "Aplicaciones móviles": "Mobile applications",
    "Apps modernas para Android/iOS con buena experiencia de usuario, backend y escalabilidad.": "Modern Android/iOS apps with strong user experience, backend integration and scalability.",
    "Flutter y Dart": "Flutter and Dart",
    "Firebase Auth, Firestore y Storage": "Firebase Auth, Firestore and Storage",
    "Mapas, ubicación y notificaciones": "Maps, location and notifications",
    "Publicación y mantenimiento": "Publishing and maintenance",
    "Desarrollo web": "Web development",
    "Páginas y plataformas web rápidas, responsivas, profesionales y orientadas a conversión.": "Fast, responsive and professional websites and platforms focused on conversion.",
    "Landing pages corporativas": "Corporate landing pages",
    "Portfolios y sitios comerciales": "Portfolios and business websites",
    "Paneles administrativos": "Admin dashboards",
    "SEO técnico básico": "Basic technical SEO",
    "Software para Windows": "Windows software",
    "Herramientas internas, automatización de tareas, sistemas de escritorio y prototipos funcionales.": "Internal tools, task automation, desktop systems and functional prototypes.",
    "Aplicaciones de escritorio": "Desktop applications",
    "Automatización de procesos": "Process automation",
    "Reportes y bases de datos": "Reports and databases",
    "Integración con APIs": "API integrations",
    "Automatización industrial": "Industrial automation",
    "Servicios de ingeniería para control industrial, PLC, HMI, SCADA, integración y soporte en planta.": "Engineering services for industrial controls, PLC, HMI, SCADA, integration and plant support.",
    "Programación multimarcas de PLC": "Multi-brand PLC programming",
    "Studio 5000, Siemens, HMI/SCADA": "Studio 5000, Siemens, HMI/SCADA",
    "Puesta en marcha y troubleshooting": "Commissioning and troubleshooting",
    "Soporte a producción": "Production support",
    "Método de trabajo": "Work method",
    "Del problema real a una solución funcionando.": "From a real problem to a working solution.",
    "No se trata solo de hacer una página bonita o una app. La idea es entender el proceso, diseñar una solución mantenible y dejar algo que puedas usar, mejorar y escalar.": "It is not just about making a good-looking website or app. The goal is to understand the process, design a maintainable solution and deliver something you can use, improve and scale.",
    "Diagnóstico y alcance": "Diagnosis and scope",
    "Revisamos qué necesitas, para quién es la solución, qué problema resuelve y qué restricciones técnicas existen.": "We review what you need, who the solution is for, what problem it solves and what technical constraints exist.",
    "Diseño técnico y visual": "Technical and visual design",
    "Definimos arquitectura, pantallas, tecnologías, integraciones y una experiencia visual alineada a tu marca.": "We define architecture, screens, technologies, integrations and a visual experience aligned with your brand.",
    "Desarrollo e integración": "Development and integration",
    "Construimos el producto con versiones funcionales, validación continua e integración con APIs, bases de datos o sistemas industriales.": "We build the product with functional versions, continuous validation and integration with APIs, databases or industrial systems.",
    "Pruebas, entrega y soporte": "Testing, delivery and support",
    "Probamos, corregimos, documentamos y dejamos la solución lista para usar, con soporte según el tipo de proyecto.": "We test, fix, document and deliver the solution ready to use, with support depending on the project type.",
    "Soluciones que se pueden adaptar a clientes reales.": "Solutions that can be adapted to real clients.",
    "Estos bloques muestran áreas de trabajo y ejemplos de proyectos que TechSolutions puede construir y personalizar.": "These blocks show areas of work and project examples that TechSolutions can build and customize.",
    "App de servicios bajo demanda": "On-demand services app",
    "Aplicación tipo marketplace con usuarios, proveedores, ubicación, notificaciones y panel de gestión.": "Marketplace-style application with users, providers, location, notifications and a management panel.",
    "Sistema de control de planta": "Plant control system",
    "Integración de PLC, HMI/SCADA, alarmas, adquisición de datos y soporte a producción en tiempo real.": "PLC, HMI/SCADA, alarms, data acquisition and real-time production support integration.",
    "Software interno para empresas": "Internal business software",
    "Herramientas Windows o web para reportes, inventario, gestión operativa, automatización y control documental.": "Windows or web tools for reports, inventory, operations management, automation and document control.",
    "Por qué TechSolutions": "Why TechSolutions",
    "Experiencia técnica real aplicada a soluciones digitales.": "Real technical experience applied to digital solutions.",
    "TechSolutions nace de combinar desarrollo de software con experiencia directa en automatización, control industrial, diagnóstico, puesta en marcha y soporte en producción.": "TechSolutions was born from combining software development with direct experience in automation, industrial controls, diagnostics, commissioning and production support.",
    "Eso permite diseñar soluciones que no solo se ven bien, sino que también tienen sentido técnico, son prácticas y pueden crecer con tu negocio.": "This allows us to design solutions that not only look good, but also make technical sense, are practical and can grow with your business.",
    "Control industrial y automatización": "Industrial controls and automation",
    "Flutter, Firebase y APIs": "Flutter, Firebase and APIs",
    "Sitios rápidos y responsivos": "Fast, responsive websites",
    "Software y herramientas internas": "Software and internal tools",
    "Hablemos de tu próximo proyecto.": "Let's talk about your next project.",
    "Cuéntame qué necesitas construir: una app, una web, un software Windows o una solución industrial. Revisamos alcance, tiempos y próximos pasos.": "Tell me what you need to build: an app, a website, Windows software or an industrial solution. We will review scope, timing and next steps.",
    "Teléfono": "Phone",
    "Email": "Email",
    "WhatsApp": "WhatsApp",
    "Enviar mensaje directo": "Send direct message",
    "Nombre": "Name",
    "Servicio de interés": "Service of interest",
    "Mensaje": "Message",
    "Enviar mensaje": "Send message",
    "El mensaje se enviará directamente desde la página.": "The message will be sent directly from the website.",
    "Selecciona un servicio": "Select a service",
    "Aplicación móvil": "Mobile application",
    "Página web": "Website",
    "Consultoría técnica": "Technical consulting",
    "© 2026 TechSolutions. Todos los derechos reservados.": "© 2026 TechSolutions. All rights reserved.",
    "Tu nombre": "Your name",
    "tu@email.com": "your@email.com",
    "Cuéntame sobre tu proyecto...": "Tell me about your project...",
    "Completa todos los campos requeridos antes de enviar.": "Complete all required fields before sending.",
    "Enviando...": "Sending...",
    "Enviando mensaje...": "Sending message...",
    "Mensaje enviado correctamente. Te responderemos pronto.": "Message sent successfully. We will reply soon.",
    "El servidor tardó demasiado en responder. Espera unos segundos y vuelve a intentar.": "The server took too long to respond. Wait a few seconds and try again.",
    
    // New Translations
    "Representación": "Partnership",
    "Automatización industrial, ingeniería de control y": "Industrial Automation, Control Engineering &",
    "soluciones de software desde Argentina.": "Software Solutions from Argentina.",
    "Compatibilidad y experiencia multimarcas de PLC": "Multi-brand PLC compatibility and experience",
    "Simulador": "Simulator",
    "Gemelo Digital": "Digital Twin",
    "Simulador Interactivo de PLC & Robótica": "Interactive PLC & Robotics Simulator",
    "Prueba nuestro gemelo digital interactivo: una simulación en tiempo real de lógica Ladder de PLC controlando una celda robótica de paletizado. Puedes depurar el error o ver cómo trabaja el programador.": "Try our interactive digital twin: a real-time simulation of PLC Ladder logic controlling a robotic palletizing cell. You can debug the tag error yourself or watch the automated programmer do it.",
    "Capacidades": "Capabilities",
    "Especialización técnica en ingeniería de control y automatización.": "Technical Specialization in Control Engineering & Automation.",
    "Ofrecemos soporte e integración técnica avanzada para sistemas industriales, asegurando robustez y continuidad operativa.": "We offer advanced technical support and integration for industrial systems, ensuring robustness and operational continuity.",
    "Resolución de fallas de PLC": "PLC troubleshooting",
    "Diagnóstico y resolución rápida de fallas en controladores lógicos programables.": "Rapid diagnosis and troubleshooting of PLC systems.",
    "Soporte HMI/SCADA": "HMI/SCADA support",
    "Mantenimiento, desarrollo y optimización de interfaces de operación y sistemas SCADA.": "Development, maintenance, and optimization of operator interfaces and SCADA systems.",
    "Integración de sistemas de control": "Control systems integration",
    "Conexión e integración de plataformas de hardware y software industrial.": "Seamless integration of industrial hardware and software platforms.",
    "Redes industriales": "Industrial networking",
    "Configuración y diagnóstico de redes industriales y protocolos de comunicación.": "Configuration and diagnostics of industrial networks and communication protocols.",
    "Soporte en puesta en marcha": "Commissioning support",
    "Acompañamiento en sitio y validación de sistemas de automatización durante el arranque.": "On-site assistance and verification of automation systems during start-up.",
    "Soporte técnico remoto": "Remote technical support",
    "Asistencia remota eficiente para resolver incidencias de automatización de manera ágil.": "Efficient remote troubleshooting and assistance for automation systems.",
    "Relevamientos de sitio": "Site surveys",
    "Inspecciones técnicas de campo para documentar el estado actual de sistemas de control.": "On-site technical surveys to assess and document existing control systems.",
    "Informes técnicos": "Technical reports",
    "Elaboración de reportes de diagnóstico, propuestas de mejora y especificaciones.": "Preparation of detailed diagnostic reports, upgrade paths, and specifications.",
    "Coordinación de clientes": "Client coordination in Spanish",
    "Enlace y gestión de proyectos con clientes de habla hispana en Latinoamérica.": "Project coordination and communication with Spanish-speaking clients.",
    "Soporte para propuestas": "Proposal support",
    "Asistencia en la cotización y definición técnica de alcances para proyectos.": "Technical scoping and estimation support for engineering bids.",
    "Representación LATAM": "International Partnership",
    "Representación técnica-comercial para Latinoamérica": "Local Technical Partner in Argentina for Spanish-speaking Latin American projects.",
    "TechSolutions puede actuar como socio técnico-comercial local en Argentina para empresas internacionales de ingeniería de control que buscan soporte de habla hispana en Latinoamérica.": "TechSolutions can operate as a local technical-commercial partner in Argentina for international control engineering companies seeking Spanish-speaking support across Latin America.",
    "Rol propuesto": "Proposed role",
    "Representante Técnico de Habla Hispana – Latinoamérica.": "Spanish-Speaking Technical Representative – Latin America.",
    "Sin autoridad contractual": "Without contractual authority",
    "TechSolutions puede apoyar en el desarrollo de oportunidades, la coordinación técnica y la comunicación con el cliente, mientras que las propuestas comerciales y los contratos finales son aprobados por la empresa principal.": "TechSolutions can support opportunity development, technical coordination and client communication, while commercial proposals and final contracts remain approved by the principal company.",
    "Socio Técnico Local": "Local Technical Partner",
    "Estructura flexible y soporte comercial para clientes regionales.": "Flexible structure and direct support for regional clients.",
    "Argentina": "Argentina",
    "LATAM": "LATAM",
    "Contacto corporativo disponible para consultas sobre alianzas internacionales.": "Corporate contact available for international partnership inquiries."
  }
};

let currentLanguage = localStorage.getItem("techsolutions-language") || getBrowserLanguage();
let textNodesPrepared = false;

function getBrowserLanguage() {
  const browserLang = (navigator.language || navigator.userLanguage || "es").toLowerCase();
  return browserLang.startsWith("en") ? "en" : "es";
}

function prepareTextNodes() {
  if (textNodesPrepared) return;

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const text = node.nodeValue.trim();
      if (!text) return NodeFilter.FILTER_REJECT;

      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;

      if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    }
  });

  while (walker.nextNode()) {
    const node = walker.currentNode;
    node.__originalText = node.nodeValue;
  }

  document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach((element) => {
    element.dataset.originalPlaceholder = element.getAttribute("placeholder") || "";
  });

  document.querySelectorAll("option").forEach((element) => {
    element.dataset.originalText = element.textContent || "";
  });

  textNodesPrepared = true;
}

function translateTextNode(node, lang) {
  const originalRaw = node.__originalText || node.nodeValue;
  const original = originalRaw.trim();

  if (!original) return;

  const leading = originalRaw.match(/^\s*/)?.[0] || "";
  const trailing = originalRaw.match(/\s*$/)?.[0] || "";
  const translated = lang === "en" ? (translations.en[original] || original) : original;

  node.nodeValue = leading + translated + trailing;
}

function translatePage(lang) {
  prepareTextNodes();

  currentLanguage = lang;
  localStorage.setItem("techsolutions-language", lang);
  document.documentElement.lang = lang;

  langButtons.forEach(btn => {
    if (btn.dataset.lang === lang) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const text = node.nodeValue.trim();
      if (!text) return NodeFilter.FILTER_REJECT;

      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;

      if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    }
  });

  while (walker.nextNode()) {
    translateTextNode(walker.currentNode, lang);
  }

  document.querySelectorAll("input[placeholder], textarea[placeholder]").forEach((element) => {
    const original = element.dataset.originalPlaceholder || element.getAttribute("placeholder") || "";
    element.setAttribute("placeholder", lang === "en" ? (translations.en[original] || original) : original);
  });

  document.querySelectorAll("option").forEach((element) => {
    const original = element.dataset.originalText || element.textContent || "";
    element.textContent = lang === "en" ? (translations.en[original] || original) : original;
  });


}

function t(spanishText) {
  return currentLanguage === "en" ? (translations.en[spanishText] || spanishText) : spanishText;
}

function toggleLanguage() {
  translatePage(currentLanguage === "en" ? "es" : "en");
}

// Theme
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("techsolutions-theme", theme);

  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "☾" : "☀";
  }


}

setTheme(localStorage.getItem("techsolutions-theme") || "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });
}

if (langButtons.length > 0) {
  langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      translatePage(btn.dataset.lang);
    });
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks?.classList.remove("open"));
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 40);

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

// Reveal animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Digital rain background
const canvas = document.getElementById("matrix");
const ctx = canvas?.getContext("2d");
let columns = [];
const chars = "01TS{}[]<>/\\|+=TECHSOLUTIONS";

function resizeCanvas() {
  if (!canvas || !ctx) return;

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
  if (!canvas || !ctx) return;

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

// Contact form using Render backend
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const API_BASE_URL = window.TECHSOLUTIONS_API_URL || "https://techsolution-website.onrender.com";

if (contactForm) {
  contactForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    e.stopPropagation();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    formStatus.textContent = "";
    formStatus.className = "form-status";

    if (!contactForm.checkValidity()) {
      formStatus.textContent = t("Completa todos los campos requeridos antes de enviar.");
      formStatus.classList.add("error");
      return false;
    }

    submitButton.disabled = true;
    submitButton.textContent = t("Enviando...");
    formStatus.textContent = t("Enviando mensaje...");

    const payload = {
      nombre: document.getElementById("nombre").value.trim(),
      email: document.getElementById("email").value.trim(),
      servicio: document.getElementById("servicio").value.trim(),
      mensaje: document.getElementById("mensaje").value.trim()
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      let result = {};
      try {
        result = await response.json();
      } catch (_) {
        result = {};
      }

      if (!response.ok || !result.ok) {
        throw new Error(result.error || result.message || "Error al enviar el mensaje.");
      }

      formStatus.textContent = t("Mensaje enviado correctamente. Te responderemos pronto.");
      formStatus.classList.add("success");
      contactForm.reset();
    } catch (error) {
      clearTimeout(timeoutId);
      console.error("Backend contact error:", error);

      if (error.name === "AbortError") {
        formStatus.textContent = t("El servidor tardó demasiado en responder. Espera unos segundos y vuelve a intentar.");
      } else {
        formStatus.textContent = currentLanguage === "en"
          ? `The message could not be sent: ${error.message}`
          : `No se pudo enviar el mensaje: ${error.message}`;
      }

      formStatus.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }

    return false;
  });
}

// Force initial translation after all nodes exist.
prepareTextNodes();
translatePage(currentLanguage);
