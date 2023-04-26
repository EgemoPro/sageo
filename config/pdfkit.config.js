const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a document
function outputPDF({ firstname, lastname, status, place, tel }) {
  try {
    const doc = new PDFDocument({ size: 'A4' });
    doc.pipe(fs.createWriteStream('output.pdf'));

    // Embed a font, set the font size, and render some text
    doc.fontSize(15)
      .text('Nom :', 40, 500);

    doc.fontSize(13)//le name
      .text(firstname, 150, 500);

    doc.fontSize(15)
      .text('Prenom :', 40, 550);

    doc.fontSize(13)//le lastname
      .text(lastname, 150, 550);

    doc.fontSize(15)
      .text('Vous êtes :', 40, 600);

    doc.fontSize(13)//le status
      .text(status, 150, 600);

    doc.fontSize(15)
      .text('Ville :', 40, 650);

    doc.fontSize(13)//le place
      .text(place, 150, 650);

    doc.fontSize(15)
      .text('Tel :', 40, 700);

    doc.fontSize(13)//le tel
      .text(tel, 150, 700);


    //Add an image, constrain it to a given size, and center it vertically and horizontally
    doc.image('static/asset/topImage.jpg', 0, 0, { width: 595 });

    doc.image('static/asset/basse.jpg', 0, 750, { width: 595 });

    doc.image('static/asset/qrcode.png', 460, 650, { width: 95 });

    doc.end();
    console.log('pdfkit terminé');
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = outputPDF;
