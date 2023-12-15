const express = require("express");
const mongoose = require("mongoose");
const nodeCache = require("node-cache");
const cors = require("cors");
const { IpModel, AmessageMod, MessagesModel, UserModel } = require("./utility/Model");
const { getOnlyDate, getOnlyTime, onlySpaceCheckValidation, messageFilter, Validator, Utils, mailService } = require("./utility/Functions");

require("dotenv").config();

const corOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200
}

const app = express();
const PORT = parseInt(process.env.PORT);
const MONGODB = process.env.MONGODB;
const HOST = "192.168.29.123";

// connectng to mongoDB instance
mongoose.connect(MONGODB).then((value)=>{
    console.log("Successfully Connected to MONGO...");
}).catch((rej_error)=>{
    console.log("Error in Mongo Connection... "+rej_error);
})

const validator = new Validator();
const util = new Utils();

const sessionCache = new nodeCache({stdTTL: 600});
const tokenCache = new nodeCache({stdTTL: 600});
const otpCache = new nodeCache({stdTTL: 120});
const tokenOtpCache = new nodeCache({stdTTL: 120});
const resendOTPCache = new nodeCache({stdTTL: 120});

const mailSender = new mailService("Gmail");

app.set('trust proxy', true);
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors(corOptions))

app.get('/', async(req, res)=>{
    return res.send(
        "Server is up and running..."
    )
})

const authorization = async(req ,userType) => {
    let authResult = await auth(req);
    if(!authResult[0]){
        return [false, "authentication failed, please try again"]
    }
    // else now check the authorixation
    if(userType.toLowerCase() == "admin"){
        if(!authResult[1].byAdmin){
            return [false, "authorization failed, access forbidden"]
        }
    }
    else{
        if(authResult[1].byAdmin){
            return [false, "authorization failed, access forbidden"]
        }
    }
    return [true, authResult[1]];
}

const auth = async (req) => {
    try{
        // getting the token from headers
        let token = req.headers.authorization;
        let otp = req.body.otp;
        let tokenDaku = String(token).split(" ");
        if(tokenDaku.length != 2){
            // giving error
            return [false, null]
        }
        else{
            if(tokenDaku[0] != "Bearer"){
                return [false, null]
            }
        }
        // getting the data here
        let userData = await UserModel.findOne({
            sessionToken: tokenDaku[1]
        })
        if(!userData){
            return [false, null]
        }
        return [true, userData]
    }
    catch(e){
        return [false, null]
    }
}

app.post("/api/setIP", async(req, res)=>{
    // getting the IP address of the request here
    try{
        let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
        if(!ip){
            // detecting if IP is null
            return res
                .status(200)
                .json({
                    error: true,
                    flag: "CT",
                    data: null
                })
        }
        let userDek = await IpModel.findOne({
            ip: ip
        })
        if(!userDek){
            // detecting the "null" or "undefined"
            // adding the IP here in mongoDB
            console.log("Adding the IP...");
            await IpModel.create({
                ip: ip,
                totalTimeSpan: 2,
                datesEntered:[
                    {
                        date:getOnlyDate(),
                        timeSpent:2
                    }
                ]
            })
        }
        return res
            .status(200)
            .json({
                error: false,
                flag: null,
                data: ip
            })
    }
    catch(e){
        console.log(`Error-> ${e.message}`);
        return res
            .status(400)
            .json({
                error: true,
                flag: "SM",
                data: null
            })
    }
})

app.post('/api/setCount', async(req, res)=>{
    // getting the IP here
    try{
        let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        let ipData = await IpModel.findOne({
            ip:ip
        })
        if(!ipData){
            return res
                .status(400)
                .json({
                    error: true,
                    flag: "DNF",
                    data: null
                })
        }
        let t_date = getOnlyDate();
        let setOld = [];
        if(ipData.datesEntered[(ipData.datesEntered.length) - 1].date == t_date){
            console.log("Old One...");
            setOld = [
                ipData.datesEntered[ipData.datesEntered.length - 1],
                ipData.datesEntered.length - 1
            ]
        }
        console.log(setOld[0]);
        (setOld.length != 0) ?
            await IpModel.updateOne({
                ip: ip
            }, {
                $set:{
                    totalTimeSpan: (parseInt(ipData.totalTimeSpan)+2),
                    [`datesEntered.${setOld[1]}`] : {
                        date: setOld[0].date,
                        timeSpent: parseInt(setOld[0].timeSpent) + 2
                    }
                }
            })
            :
            await IpModel.updateOne({
                ip: ip
            },{
                $set:{
                    totalTimeSpan: (parseInt(ipData.totalTimeSpan)+2)
                },
                $push:{
                    datesEntered: {
                        date: t_date,
                        timeSpent: 2
                    }
                }
            })
        return res
            .status(200)
            .json({
                error: false,
                flag: null,
                data: true
            })
    }
    catch(e){
        console.log(`Error-> ${e.message}`);
        return res
            .status(400)
            .json({
                error: true,
                flag: "SM",
                data: null
            })
    }
})

app.post('/api/login',async(req, res)=>{
    try{
        let {
            email,
            password
        } = req.body
        if(!email || !password){
            // detecting the errors here
            return res
                .status(200)
                .json({
                    error: true,
                    message: "please enter your email and password",
                    data: null
                })
        }
        // now validating the password and email
        let user = await UserModel.findOne({
            email: email
        })
        if(!user){
            return res
                .status(200)
                .json({
                    error: true,
                    message: "no user found with these email",
                    data: null
                })
        }
        // else i will check the validation the main auth here
        if(user.password != password){
            // password is just only in correct we will give error
            return res
                .status(200)
                .json({
                    error: true,
                    message: "incorrect password entered.",
                    data: null
                })
        }
        // else now we will create the session
        let tok = util.getRandomToken(100)
        let upResult = await UserModel.updateOne({
            email: email,
            password: password
        }, {
            sessionToken: tok
        });
        if (upResult.nModified <= 0){
            return res  
                .status()
                .json({
                    error: true,
                    message: "something went wrong, please try again",
                    data: null
                })
        }
        // else we will return the response as session Created
        return res
            .status(200)
            .json({
                error: false,
                message: null,
                data: tok
            })
    }
    catch(e){
        return res
            .status(200)
            .json({
                error: true,
                message: "something went wrong, please try again"
            })
    }
})

app.post('/api/verifyAccount', async(req, res)=>{
    try{
        // getting the token from headers
        let token = req.headers.authorization;
        let otp = req.body.otp;
        let tokenDaku = String(token).split(" ");
        if(tokenDaku.length != 2){
            // giving error
            return res
                .status(200)
                .json({
                    error: true,
                    message: "invalid token given",
                    data: null
                })
        }
        else{
            if(tokenDaku[0] != "Bearer"){
                return res
                    .status(200)
                    .json({
                        error: true,
                        message: "invalid token given",
                        data: null
                    })
            }
        }
        // checking the validity of session first
        let tokenData = sessionCache.get(tokenDaku[1]);
        if(!tokenData){
            // detecting the nullation of session data
            return res
                .status(200)
                .json({
                    error: true,
                    message: "session expired please try from signup page",
                    data: null
                });
        }
        // now checking the validity of OTP
        let isOtpThere = tokenOtpCache.get(tokenDaku[1])
        if(!isOtpThere){
            return res
                .status(200)
                .json({
                    error: true,
                    message: "otp expired, please click on reset otp",
                    data: null
                })
        }
        // now i will check the validation of OTP
        if(isOtpThere != otp){
            return res
                .status(200)
                .json({
                    error: true,
                    message: "invalid otp entered",
                    data: null
                })
        }
        // else now OTP is valid
        await UserModel.create({
            isAdmin: false,
            email: tokenData.email,
            password: tokenData.password,
            sessionToken: null
        });
        
        // and now cleaning the caches
        tokenCache.del(tokenDaku[1]);
        tokenOtpCache.del(tokenDaku[1]);
        sessionCache.del(tokenDaku[1]);

        return res
            .status(200)
            .json({
                error: false,
                message: null,
                data: "Signup Successfull"
            })
    }
    catch(e){
        return res
            .status(200)
            .json({
                error: true,
                message: e.message,
                data: null
            })
    }
});

app.post('/api/resendOTP', async(req, res)=>{
    try{
        // getting the token from headers
        let token = req.headers.authorization;
        let tokenDaku = String(token).split(" ");
        if(tokenDaku.length != 2){
            // giving error
     
            return res
                .status(400)
                .json({
                    error: true,
                    message: "invalid token given",
                    data: null
                })
        }
        else{
            if(tokenDaku[0] != "Bearer"){
                return res
                    .status(400)
                    .json({
                        error: true,
                        message: "invalid token given",
                        data: null
                    })
            }
        }
        // checking the validity of session first
        let tokenData = sessionCache.get(tokenDaku[1]);
        if(!tokenData){
            // detecting the nullation of session data
            return res
                .status(400)
                .json({
                    error: true,
                    message: "session expired please try from signup page",
                    data: null
                });
        }
        // else now checking the resendLIMIT
        let resendLimit = resendOTPCache.get(tokenDaku[1]);
        if(!resendLimit){
            resendOTPCache.set(tokenDaku[1], `${Math.floor(Date.now() / 1000)}`);
        }
        else{
            let timeStamp = Math.floor(Date.now() / 1000);
            let dif = (timeStamp - parseInt(resendLimit))
            if(dif < 120){
                // returning the error here
                return res
                    .status(400)
                    .json({
                        error: true,
                        message: `please wait ${120 - dif} seconds, and try again`,
                        data: null
                    })
            }
        }

        // else we will create new OTP and send the otp again
        let newOtp = util.createRandomOTP(otpCache);
        tokenOtpCache.set(tokenDaku[1], newOtp);
        // sending it now after creating
        await mailSender.sendMail(
            tokenData.email,
            "Verification OTP for tanishqAgency",
            "Here is the OTP "+newOtp,
            false
        );
        return res
            .status(200)
            .json({
                error: false,
                message: null,
                data: "otp reset successfull"
            })
    }
    catch(e){
        return res
            .status(400)
            .json({
                error: true,
                message: e.message,
                data: null
            })
    }
})

app.post('/api/signup', async(req, res)=>{
    try{
        // getting the data first
        let {
            email,
            password,
            cpassword
        } = req.body;
        let errors = {
            emailError: null,
            passwordError: null,
            cpasswordError: null
        };
        // valdiating the email here
        let isEmailValid = await validator.validateEmail(email);
        let isPasswordValid = await validator.verifyPassword(password);

        if(!isEmailValid){
            // setting the email error here
            errors.emailError = "invalid email entered, please try again";
        }
        else{
            // i will check if there are any accounts with this email
            let emailresult = await UserModel.findOne({
                email: email
            });
            if(emailresult != null){
                // so here we finded the results we will set the error here
                console.log("Yeah");
                errors.emailError = "account with email is already registered";
            }
        }
        if(!isPasswordValid[0]){
            // if password is not valid
            console.log(isPasswordValid);
            errors.passwordError = isPasswordValid[1];
        }
        else{
            // i will check for the confirm password input value here
            if(password != cpassword){
                errors.cpasswordError = "confirm password must be same as password";
            }
        }

        // now giving the response if any errors
        for (const key in errors) {
            console.log(errors[key]);
            if(errors[key]){
                return res
                    .status(200)
                    .json({
                        error: true,
                        message: errors,
                        data: null
                    })
            }
        }
        // now from here we will set the cache
        let verifyToken = util.getRandomToken(tokenCache, 20);
        let cotp = util.createRandomOTP(otpCache);
        tokenOtpCache.set(verifyToken, cotp);
        
        sessionCache.set(verifyToken,{
            email: email,
            password: password
        });
        // sending the otp to the email here
        await mailSender.sendMail(
            email, 
            "Signup Verification OTP for TanishqAgency",
            `Here is the signup OTP ${cotp}`,
            false
        );
        return res
            .status(200)
            .json({
                error: false,
                message: null,
                data: verifyToken
            })
    }
    catch(e){
        return res
            .status(200)
            .json({
                error: true,
                message: e.message,
                data: null
            });
    }
})

app.get('/api/profile', async(req, res)=>{
    try{
        let authorize = await authorization(req, "admin");
        if(!authorize[0]){
            return res
                .status(200)
                .json({
                    error: true,
                    message: authorize[1],
                    data: null
                })
        }
        // now returning the profile data
        return res
            .status(200)
            .json({
                error: false,
                message: null,
                data: authorize[1]
            })
    }
    catch(e){
        return res  
            .status(200)
            .json({
                error: true,
                message: "something went wrong, please try again",
                data: null
            })
    }
})

app.listen(PORT, HOST, ()=>{
    console.log(
        `Server is up and running...`
    );
})