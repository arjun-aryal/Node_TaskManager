import express from "express";


import { authenticate } from '../middleware/authMiddleware.js';

import {
    createLabelController,
    deleteLabelController,
    getLabelsController,
    partialUpdateLabelController,
    updateLabelController 
} from "../controllers/labelController.js";




const labelRouter = express.Router();

labelRouter.post("/", authenticate, createLabelController);
labelRouter.get("/", authenticate, getLabelsController);

// labelRouter.get("/:id", authenticate, getLabelsController);
labelRouter.put("/:id", authenticate, updateLabelController);
labelRouter.patch("/:id", authenticate, partialUpdateLabelController);

labelRouter.delete("/:id", authenticate, deleteLabelController);





export default labelRouter;



