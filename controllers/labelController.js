import { prismaClient } from "../prismaClient.js";
import { labelSchema, partialLabelSchema } from "../middleware/labelValidator.js";
import { labelSerializer } from "../serializers/labelSerializer.js";


// create label
export const createLabelController = async (req,res) =>{
    try {

        const { error , value } = labelSchema.validate(req.body, {abortEarly: false});

        if (error) {
            return res.status(400).json({error: error.details.map(d=>d.message)});
        }

        const label = await prismaClient.label.create({data:value});

        return res.status(201).json({message: "Label created Successfully", label: labelSerializer(label)});
        
    } catch (error) {
        res.status(500).json({error: "Failed to create labels"});
    }
};

// all label
export const getLabelsController = async (req, res) => {
  try {
    const labels = await prismaClient.label.findMany({
        orderBy: { id: "asc" },
    });
    
    return res.json({ labels: labelSerializer(labels) });
    // return res.json({ labels });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch labels" });
  }
};

//update -put
export const updateLabelController = async (req, res) => {
  try {
    const labelId = Number(req.params.id);
    const { error , value } = labelSchema.validate(req.body, {abortEarly: false});

    if (error) return res.status(400).json({ errors: error.details.map(d => d.message) });

    const label = await prismaClient.label.update({
      where: { id: labelId },
      data: value
    });

    return res.json({ message: "Label updated successfully", label: labelSerializer(label) });
  } catch (err) {
    res.status(500).json({ error: "Failed to update label" });
  }
};

// partial update -patch


export const partialUpdateLabelController = async (req, res) => {
  try {
    const labelId = Number(req.params.id);
    const { error , value } = labelSchema.validate(req.body, {abortEarly: false});

    if (error) return res.status(400).json({ errors: error.details.map(d => d.message) });

    const label = await prismaClient.label.update({
      where: { id: labelId },
      data: value
    });

    return res.json({ message: "Label partially updated", label: labelSerializer(label) });
  } catch (err) {
    res.status(500).json({ error: "Failed to partially update label" });
  }
};


// Delete Label
export const deleteLabelController = async (req, res) => {
  try {
    const labelId = Number(req.params.id);

    await prismaClient.taskLabel.deleteMany({ where: { label_id: labelId } }); 

    await prismaClient.label.delete({ where: { id: labelId } });

    return res.json({ message: "Label deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete label" });
  }
};