var nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "ecommerceg6ft11@gmail.com", // generated ethereal user
        pass: "vvzflnzfwawofijz", // generated ethereal password
    },
    debug:false,
    tls: {
        rejectUnauthorized: false
    }
});

module.exports = { transporter };