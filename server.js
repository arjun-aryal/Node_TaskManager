import express from "express";
import dotenv from "dotenv";
import rootRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

import { setupSwagger } from "./swagger.js";

import cors from "cors"


dotenv.config()

const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials:true,
    methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"]

}));



const PORT = process.env.PORT || 5000;



app.get("/", (req,res)=>{

    res.send("Backend is running")
})


app.use("/api",rootRouter)
setupSwagger(app);

app.listen(PORT,()=>{
    console.log(`server is running on  http://localhost:${PORT}`)
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);

})
