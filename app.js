const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "static")));

app.use(express.static(path.join(__dirname, "static/images")));

app.use(
  "/css",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use(
  "/static",
  express.static(
    path.join(__dirname, "node_modules/@fortawesome/fontawesome-free")
  )
);

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "gabrielwkun@gmail.com",
    pass: "ymnc zolv tvke jycz",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Eleven 11 Foundation | Home" });
});

app.post("/updates", async (req, res) => {
  const { useremail } = req.body;

  if (!useremail) {
    return res.status(400).send("User email is required");
  }

  try {
    await transporter.sendMail({
      from: '"Eleven 11 Foundation" <gabrielwkun@gmail.com>',
      to: useremail,
      subject: "Eleven 11 Foundation Updates",
      text: `Thank you for subscribing to updates from Eleven 11 Foundation.`,
      html: `<p>Thank you for subscribing to updates from Eleven 11 Foundation. We are pleased to welcome you to our community of supporters.</p>
             <p>Warm regards,<br><strong>Eleven 11 Foundation Organization</strong></p>`,
    });

    res.render("index", { title: "Eleven 11 Foundation | Home" });
  } catch (error) {
    console.error("Failed to send email:", error.message);
    res
      .status(500)
      .send(
        "An error occurred while sending the email. Please try again later."
      );
  }
});

app.get("/linkedIn", (req, res) => {
  res.redirect(
    "https://www.linkedin.com/in/eleven-eleven-foundation-liberia-chapter-004a9b336"
  );
});

app.get("/facebook", (req, res) => {
  res.redirect("https://web.facebook.com/share/p/19Mcy8SKRm/");
});

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Server crash at port ${PORT}`, err);
  } else {
    console.log(`Server listening on ${PORT}`);
  }
});
