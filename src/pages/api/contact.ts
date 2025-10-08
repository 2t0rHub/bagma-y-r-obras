import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false; // Necesario para que no intente generar HTML estático

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { name, email, phone, subject, message, privacy } = body;

  if (!name || !email || !phone || !message || !privacy) {
    return new Response(
      JSON.stringify({ message: "Faltan campos obligatorios" }),
      { status: 400 }
    );
  }

  const resendApiKey = import.meta.env.RESEND_API_KEY;
  const emailTo = import.meta.env.EMAIL_TO;
  // Usa el email verificado o el de onboarding de Resend como fallback para desarrollo.
  const emailFrom = import.meta.env.EMAIL_FROM || "onboarding@resend.dev";

  if (!resendApiKey || !emailTo) {
    console.error("Faltan variables de entorno para Resend.");

    return new Response(
      JSON.stringify({ message: "Error de configuración en el servidor." }),
      { status: 500 }
    );
  }

  const resend = new Resend(resendApiKey);

  const emailContent = {
    from: `Formulario Web <${emailFrom}>`, // El dominio de este correo debe estar verificado en Resend
    to: emailTo,
    reply_to: email,
    subject: subject ? `Nuevo mensaje: ${subject}` : `Nuevo mensaje de ${name}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.6;">
        <h1 style="color: #254692;">Nuevo Mensaje del Formulario Web</h1>
        <p>Has recibido un nuevo mensaje de <strong>${name}</strong>.</p>
        <hr style="border: none; border-top: 1px solid #eee;">
        <h2 style="color: #254692; font-size: 1.2em;">Detalles del Contacto:</h2>
        <ul>
          <li><strong>Nombre:</strong> ${name}</li>
          <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>
          <li><strong>Teléfono:</strong> ${phone}</li>
        </ul>
        <h2 style="color: #254692; font-size: 1.2em;">Mensaje:</h2>
        <p><strong>Asunto:</strong> ${subject || "No especificado"}</p>
        <div style="background-color: #f0f7fe; border-left: 4px solid #2c6ee4; padding: 15px; margin-top: 10px;">
          <p style="margin: 0;">${message.replace(/\n/g, "<br>")}</p>
        </div>
      </div>
    `,
  };

  try {
    const { data, error } = await resend.emails.send(emailContent);

    if (error) {
      console.error("Resend error:", error);
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ message: "Mensaje enviado correctamente" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        message: "Error interno del servidor al procesar el envío.",
      }),
      { status: 500 }
    );
  }
};
