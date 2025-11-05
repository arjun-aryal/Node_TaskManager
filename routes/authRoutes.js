import express from "express";
import { RegisterController , LoginController, LogoutController, RefreshTokenController} from "../controllers/authController.js";
import { validateBody } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../middleware/authValidator.js";
import rootRouter from "./index.js";


const authRouter = express.Router();


authRouter.post("/register",validateBody(registerSchema),RegisterController)
authRouter.post("/login",validateBody(loginSchema),LoginController)
authRouter.post("/logout",LogoutController)
authRouter.post("/refresh",RefreshTokenController)




export default authRouter;



