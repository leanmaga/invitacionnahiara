// hooks/useQuinceaneraConfig.js
"use client";

export function useQuinceaneraConfig() {
  // Variables de entorno con valores por defecto
  const config = {
    // Información personal
    nombre: process.env.NEXT_PUBLIC_NOMBRE_QUINCEANERA || "Isabella",
    edad: process.env.NEXT_PUBLIC_EDAD || "15",

    // Evento
    fechaEvento: process.env.NEXT_PUBLIC_FECHA_EVENTO || "15 de Abril, 2024",
    horaEvento: process.env.NEXT_PUBLIC_HORA_EVENTO || "7:00 PM - 2:00 AM",
    lugar: process.env.NEXT_PUBLIC_LUGAR_EVENTO || "Salón Crystal",
    direccion: process.env.NEXT_PUBLIC_DIRECCION_EVENTO || "Av. Principal 123",

    // Contacto
    nombreFamilia:
      process.env.NEXT_PUBLIC_NOMBRE_FAMILIA || "Familia García López",
    telefono: process.env.NEXT_PUBLIC_TELEFONO || "+54 11 1234-5678",
    email: process.env.NEXT_PUBLIC_EMAIL_EVENTO || "isabella.quince@email.com",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+541155299849",

    // Redes sociales
    instagramUser: process.env.NEXT_PUBLIC_INSTAGRAM_USER || "isabella_quince",

    // Fechas límite
    fechaLimiteRSVP:
      process.env.NEXT_PUBLIC_FECHA_LIMITE_RSVP || "30 de Julio, 2025",

    // Información bancaria para regalos
    alias: process.env.NEXT_PUBLIC_ALIAS_BANCARIO || "isabella.15años",
    cbu: process.env.NEXT_PUBLIC_CBU || "",
    nombreCuentaBancaria: process.env.NEXT_PUBLIC_NOMBRE_CUENTA_BANCARIA || "",

    // URLs y configuración
    productionUrl:
      process.env.NEXT_PUBLIC_PRODUCTION_URL ||
      "https://invitacion-quinceañera.vercel.app",

    // Música
    musicUrl: process.env.NEXT_PUBLIC_MUSIC_URL || "",
    musicTitle: process.env.NEXT_PUBLIC_MUSIC_TITLE || "Música de Fondo",

    // Admin
    adminPassword: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123",

    // Base de datos
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",

    // Email
    emailJsServiceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
    emailJsTemplateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
    emailJsPublicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "",
  };

  // Generar hashtag automáticamente basado en nombre y edad
  const hashtag = `#${config.nombre}${config.edad}Años`;

  // Generar títulos dinámicos
  const titulos = {
    principal: `${config.nombre} - Quinceañera Invitation`,
    admin: `Panel de Administración - Quinceañera ${config.nombre}`,
    descripcion: `Una celebración mágica - ${config.edad} años de ${config.nombre}`,
    redes: `${config.nombre} ${config.edad} Años`,
  };

  return {
    ...config,
    hashtag,
    titulos,
  };
}
