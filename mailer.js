const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Correct SMTP host
  port: 587, // Gmail SMTP port
  secure: false, // Use true for port 465
  auth: {
    user: "gabrielwkun@gmail.com", // Gmail account
    pass: "gnju asos xtcm yvkj", // App password
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});
