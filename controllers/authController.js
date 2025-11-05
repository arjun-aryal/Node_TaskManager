import { prismaClient } from "../prismaClient.js";
import jwt from "jsonwebtoken";
import { hashSync , compareSync } from "bcrypt";
import { registerSchema,loginSchema } from "../middleware/authValidator.js";
import { serializeUser } from "../serializers/userSerializer.js";

export const RegisterController = async(req,res) => {

    try {

        const {error,value} = registerSchema.validate(req.body, {abortEarly: false});

        if(error){
            const errors = error.details.map(d=>d.message)
            return res.status(400).json({errors})
        }

        const {name,email,password} =value;

        const userExist = await  prismaClient.user.findFirst({
            where : { email : email}
        });

        if (userExist) {
            return res.status(409).json({ message: "User already exists" });
        }   
        
        const hashpasswd = hashSync(password,10);

        const newUser = await prismaClient.user.create({
            data: {
                username:name,
                email:email,
                password:hashpasswd
                }
        });

        
        const safeUser = serializeUser(newUser);
        
        return res.status(201).json({ message: "User Created Successfully",user: safeUser});

    } catch (error) {
        console.error(error);
        return res.status(500).json({message : "Internal Server Error"});
        
    }

}

export const LoginController = async(req,res) =>{

    try {

        const {error,value} = loginSchema.validate(req.body, {abortEarly: false});

        if(error){
            const errors = error.details.map(d=>d.message)
            return res.status(400).json({errors})
        }

        const {email,password} = value;

        const user = await prismaClient.user.findFirst({ where: { email: email } });


        // if(!user){
        //     return res.status(404).json({message:"User Not found"});
        // }

        const isValidPassword = compareSync(password,user.password);

        if(!isValidPassword){
            return res.status(404).json({message:"Invalid Credentials. Please check your creds and try again"})
        }
        

        const safeUser = serializeUser(user);
        
        //  tokens 

        const accessToken = jwt.sign({ id: user.id, username: user.username },process.env.JWT_SECRET,{ expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN});

        const refreshToken = jwt.sign({ id: user.id, username: user.username },process.env.JWT_SECRET,{ expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN});


        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN.slice(0, -1)) *86400000   // day in ms asumed the expiry being in days only
        });

        
        return res.status(200).json({message:"User Login Sucessfully",access: accessToken,user:safeUser, redirect: "/" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"test Internal Server Error"})
    }
}



export const LogoutController = async (req, res) => {
    try {
        res.clearCookie("refreshToken");
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


export const RefreshTokenController = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "No refresh token found" })
        };

        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        const newAccessToken = jwt.sign(
            { id: decoded.id, username: decoded.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN }
        );

        return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        console.error(error);
        return res.status(403).json({ message: "Invalid or expired refresh token" });
    }
}