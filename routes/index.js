import express from "express"
import authRouter from "./authRoutes.js";
import taskRouter from "./taskRoute.js"
import labelRouter from "./labelRoute.js";


const rootRouter = express.Router();

rootRouter.use('/auth',authRouter);
rootRouter.use('/task',taskRouter);
rootRouter.use('/label',labelRouter)



export default rootRouter;