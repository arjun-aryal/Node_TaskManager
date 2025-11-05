import jwt from "jsonwebtoken";
import { prismaClient } from "../prismaClient.js";


export const authenticate = async (req, res, next) => {
    try {
        
        
        // Authorization :  "Bearer <token>"


        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({ message: "token missing" });
        }

        const token = authHeader.split(" ")[1]; // split on space

        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const user = await prismaClient.user.findUnique({ where: { id: decoded.id } });
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = { id: user.id, username: user.username, email: user.email };


        next(); 


    } catch (error) {

        console.error(error);

        return res.status(403).json({ message: "Unauthorized" });
    }
};
