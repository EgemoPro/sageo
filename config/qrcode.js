const qr = require('qr-image');
const fs = require('fs');

module.exports.makeQrImage = async (string) => {
    try {
        const code = qr.image(string, {
            type: 'png',
            margin: 1,
            size: 10,
            ec_level: 'H',
            parse_url: false,
            color: { dark: '#ffd700ff', light: '#ffffff' }
        });
        // Créer le fichier
        const output = fs.createWriteStream('./static/asset/qrcode.png');
        code.pipe(output);

        console.log('Code QR généré avec succès !');
        return true;
    } catch (error) {
        console.log('qr generator error',error)
        return false
    }

}
