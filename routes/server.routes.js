const express = require("express");
const router = express.Router();
const verify = require("../controllers/verify");
const { addUser, getAllData } = require('../config/firebaseDb');
const { makeQrImage } = require('../config/qrcode');
const outputPDF = require("../config/pdfkit.config");
const sendDoc = require("../config/mailkit.config");

const userAccess = require('../controllers/userAccess')

router.post('/api', async (req, res) => {
    let testing = verify.verifyForm(req.body)
    if (testing === true) {

        const promiseId = addUser(req.body); // id de l'utilisateur pour qr-code apres injection en bd
        const id = await promiseId

        const validate = await makeQrImage(id)
        console.log('validation du code qr',validate);
        if (validate) {
            /*
                processus pour  remplacer 
                le ref de la balise img du code qr
            */
           console.log('apres validation du code qr');
           setTimeout(() => {
                let readyToSendMail = outputPDF(req.body);

                if (readyToSendMail) {
                    sendDoc(req.body.email)
                    console.log('mail envoyé à '+ req.body.email);
                }
           }, 2000);
        }
        res.status(200).json({
            msg: "Valider"
        })
    } else {
        if (typeof (testing) == 'object') {
            res.status(400).json(testing)
        } else {
            console.log('erreur testing', testing);
        }
    }
})

router.get('/api', getAllData)


module.exports = router;