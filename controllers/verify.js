module.exports.verifyForm = ({ firstname,lastname, email,tel}) => {
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let errorMsg = {};
    let  fullname = `${firstname} ${lastname}`
    if (regexEmail.test(email) == true && fullname.length > 4 && tel.length >= 8) {
        return true
    } else if(fullname.length < 4){
        errorMsg = {
            msg:"le nom est trop court"
        }
        return errorMsg;
    }else if(!regexEmail.test(email)){
        errorMsg = { msg: "veillez saisir correctement l'email"}
        return errorMsg;
    }
    else if(tel.length < 8){
        errorMsg = {
            msg: "veuillez entrée un numero de telephone valide et l'email soient bien saisie"
        }
    } 

} 