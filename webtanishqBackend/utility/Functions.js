const { PASSWORD_VALUES, ALL_CHARS } = require("./constants");
const nodeMailer = require("nodemailer")

function getOnlyDate(){
    return ((new Date()).toISOString()
    .split('T')[0]).toString();
}

function getOnlyTime(){
    return ((new Date()).toISOString()
    .split('T')[1]).toString();
}

function onlySpaceCheckValidation(
    message
){
    let intruders = [
        " ", "\n"
    ]
    for (let index = 0; index < message.length; index++) {
        if (!intruders.includes(message[index])){
            return true;
        }
    }
    return false;
}

function messageFilter(message){
    // we will trim the message here from start and end
    let myMessage = String(message);
    let intruders = [
        " ", "\n"
    ]
    let i_start = 0
    while(
        intruders.
        includes(myMessage[i_start])
    ){
        i_start = i_start + 1;
    }

    // doing same below for back trim
    let i_end = myMessage.length - 1;
    while(
        intruders.
        includes(myMessage[i_end])
    ){
        i_end = i_end - 1;
    }

    // now adding the trimmed message here
    myMessage = myMessage.slice(i_start, i_end+1);
    return myMessage;
}

class Validator{
    constructor(){
        this.a = 23;
    }
    async verifyPassword(password){
        // validating the Password here
        if(!password){
            return [false, "invalid password entered, please try again"]
        }
        if(String(password).length <= 7){
            return [false,"Password must be greater then 7 character"]
        }
        // else now i will track the error over here
        let errors = {
            numbersError: "Password must contain atleast 1 digit",
            abcError: "Password must contain atleast 1 small letter",
            capAbcError: "Password must contain atleast 1 Capital letter",
            specialCharError: `must contain atleast one these ${PASSWORD_VALUES.special_chars.split("").join(", ")}`
        }
        for(let i = 0; i < password.length; i++){
            if(PASSWORD_VALUES.numbers.includes(password[i])){
                errors.numbersError = null;
            }
            else if(PASSWORD_VALUES.abc.includes(password[i])){
                errors.abcError = null;
            }
            else if(
                PASSWORD_VALUES.abc.toUpperCase()
                .includes(password[i])
            ){
                errors.capAbcError = null;
            }
            else if (
                PASSWORD_VALUES.special_chars
                .includes(password[i])
            ){
                errors.specialCharError = null;
            }
            else{
                return [
                    false,
                    `character "${password[i]}" not allowed in password`
                ]
            }
        }

        // detecting if any error is left to destroy
        for (const key in errors) {
            if(errors[key]){
                return [
                    false,
                    errors[key]
                ]
            }
        }
        return [
            true,
            null
        ]
    }

    async validateEmail(email){
        if(!email) return false;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(String(email));
    }
}

class Utils{
    createRandomToken(tokenLength){
        let deciders = ALL_CHARS;
        let token = ""
        // decider itereation
        let decide_i = 0;
        let lastIndex = 0;
        while(decide_i < tokenLength){
            let ranIndex = Math.floor(Math.random() * deciders.length)
            if(ranIndex == lastIndex) continue;
            // now we know index is not repeated from here
            token += deciders.charAt(ranIndex)
            decide_i += 1
            lastIndex = ranIndex;
        }
        return token;
    }

    getRandomToken(tokenCache, tokenLength){
        let token = null;
        while (true){
            token = this.createRandomToken(parseInt(tokenLength));
            if(tokenCache.get(token)) continue;
            else{
                tokenCache.set(token, "VALID");
                break;
            };
        }
        return token;
    }

    createRandomOTP(otpCache){
        let otp = null
        while (true){
            otp = ""
            for(let otp_i = 0; otp_i < 8; otp_i++){
                otp += PASSWORD_VALUES.numbers.charAt(
                    Math.floor(Math.random() * PASSWORD_VALUES.numbers.length)
                )
            }
            if(!otpCache.get(otp)) break
            else otp = null
        }
        // setting the new OTP
        try{
            otpCache.set(otp, "valid")
        }
        catch(e){
            console.log("ERROR => "+e.message);
        }
        return otp;
    }
}

class mailService{
    constructor(
        service
    ){
        this.transporter = nodeMailer.createTransport({
            service:service,
            auth:{
                user:"fireeyes634@gmail.com",
                pass: "mfkzeyogvrjhkpbr"
            }
        });
    }

    async sendMail(
        reciever,
        subject,
        message,
        multiple=false
    ){
        let recieverTemp = reciever;
        if (multiple){
            recieverTemp = Array(reciever).join(", ")
        }
        let data;
        await this.transporter.sendMail({
            from:"fireeyes634@gmail.com",
            to:recieverTemp,
            subject:subject,
            text:message
        }).then((successvalue)=>{
            data =  {
                status:true,
                data:successvalue
            }
        }).catch((e)=>{
            data =  {
                status: false,
                data: e
            }
        })
        return data
    }
}

module.exports = {
    getOnlyDate,
    getOnlyTime,
    messageFilter,
    onlySpaceCheckValidation,
    Validator,
    Utils,
    mailService
}