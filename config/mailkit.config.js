const nodemailer = require('nodemailer');

function sendDoc(destinataire) {
//   console.log('from config',__dirname)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'eliezerodjo@gmail.com',
      pass: process.env.APP_PASS
    }
  });

  const mailOptions = {
    from: 'chaîne de Venom <eliezerodjo@gmail.com>',
    to: destinataire,
    subject: 'Evenement Sageo',
    text: 'Votre Passe est pret Veuillez le telecharger et l\'imprimer',
    attachments: [
      {
        filename: 'output.pdf',
        path: './output.pdf'
      }
    ]
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('E-mail envoyé: ' + info.response);
    }
  });
}
module.exports = sendDoc;