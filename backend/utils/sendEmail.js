import nodemailer from "nodemailer";

export const sendEmailNotification = async ({
  name,
  email,
  message,
  service,
  jobType,
}) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, //  IMPORTANT
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL, // you receive it
    replyTo: email,

    subject: `📩 New ${service} Inquiry (${jobType})`,

    html: `
    <div style="font-family: Arial; background:#f4f6f8; padding:20px;">
      <div style="max-width:600px; margin:auto; background:#fff; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.1);">

        <div style="background:#111827; color:#fff; padding:20px; text-align:center;">
          <h2 style="margin:0;">New Contact Message</h2>
        </div>

        <div style="padding:20px;">
          <p>You received a new inquiry:</p>

          <table style="width:100%; margin-top:10px;">
            <tr><td><b>Name:</b></td><td>${name}</td></tr>
            <tr><td><b>Email:</b></td><td>${email}</td></tr>
            <tr><td><b>Service:</b></td><td>${service}</td></tr>
            <tr><td><b>Job Type:</b></td><td>${jobType}</td></tr>
          </table>

          <div style="margin-top:15px;">
            <b>Message:</b>
            <div style="background:#f1f5f9; padding:12px; border-radius:6px;">
              ${message}
            </div>
          </div>
        </div>

        <div style="background:#f9fafb; padding:10px; text-align:center; font-size:12px;">
          Sent from your portfolio 
        </div>

      </div>
    </div>
    `,
  };
  
  await transporter.sendMail(mailOptions);
};