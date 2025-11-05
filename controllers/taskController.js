import { taskSchema , partialTaskSchema} from "../middleware/taskvalidator.js";
import { prismaClient } from "../prismaClient.js";
import { taskSerializer } from "../serializers/taskSerializer.js";
import { taskFilter } from "../utils/filter.js";
import { paginate } from "../utils/pagination.js";

// create new task

export const createTaskController = async (req, res) => {
  try {
    const { error, value } = taskSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({ errors: error.details.map(d => d.message) });
    }

    const { title, description, status: taskStatus, priority, due_date, labels } = value;

    console.log("labels from request:", labels);

    
    const userId = req.user?.id || req.body.created_by; 

    const task = await prismaClient.task.create({
      data: {
        title,
        description,
        status: taskStatus,     
        priority,
        due_date: due_date ? new Date(due_date) : null,
        created_by: userId,
      }
    });



    // label and task label

    if (Array.isArray(labels) && labels.length > 0) {
      await Promise.all(
        labels.map(async (labelName) => {
          const sanitizedName = labelName.trim();

          // Find an existing label by name
          let label = await prismaClient.label.findFirst({
            where: { name: sanitizedName }
          });

          // If not found, create a new label
          if (!label) {
            label = await prismaClient.label.create({
              data: { name: sanitizedName, color: "#3c29ebff" }
            });
          }

          // Link task and label via TaskLabel
          await prismaClient.taskLabel.create({
            data: {
              task_id: task.id,
              label_id: label.id
            }
          });
        })
      );
    }


    const taskWithLabels = await prismaClient.task.findUnique({
      where: { id: task.id },
      include: {
        user: { select: { id: true, username: true } },
        task_labels: { include: { label: true } }
      }
    });



    // return res.status(201).json({ message: "Task created successfully", task: taskSerializer(task) });



    return res.status(201).json({ message: "Task created successfully", task: taskSerializer(taskWithLabels) });
    

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create task" });
  }
};

//get all task

export const getAllTasksController = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 25
    console.log("I'm here")

    const { where, orderBy } = taskFilter(req.query, req.user.id);


    const result = await paginate({
      model: prismaClient.task,
      where,
      page,
      limit: limit,
      orderBy,
      include: {
        user: { select: { id: true, username: true } },
        task_labels: { include: { label: true } }
      }
    });

    console.log(JSON.stringify(result.data[0], null, 2));

    const tasks = result.data.map(taskSerializer);
    return res.json({
      page: result.page,
      limit: result.limit,
      total: result.total,
      totalPages: result.totalPages,
      tasks: tasks
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};


// get individual task
export const getTaskByIdController = async (req,res) => {
    // console.log("I'm here")

    try {
        const taskId = Number(req.params.id);

        if(isNaN(taskId)){
            return res.status(400).json({error: "Invalid task ID"})

        }

        const task = await prismaClient.task.findUnique({
            where : {id : taskId},
            include: {
                user: { select: { id: true, username: true } },
                task_labels: { include: { label: true } }
            }
        });


        if(!task){
            return res.status(404).json({error: "Task not found"});
        }

        if(task.created_by !== req.user.id){
            return res.status(403).json({error: "Unauthorized access"});
        }

        return res.json({task: taskSerializer(task)});
    


    } catch (error) {

        res.status(500).json({ error: "Failed to fetch task" });
        
    }

};



// update task : put

export const updateTaskController = async (req,res) => {
  
    try {
        const taskId = Number(req.params.id);
        const { error, value } = taskSchema.validate(req.body, { abortEarly: false });


        if (error) {
      return res.status(400).json({ errors: error.details.map(d => d.message) });
    }

    const task = await prismaClient.task.findUnique({ where: { id: taskId } });

    if (!task){
        return res.status(404).json({message: "Task not found"})
    }

    if(task.created_by !== req.user.id){
        return res.status(403).json({error: "Unauthorized access"});
    }

    const updated = await prismaClient.task.update({
        where: {id: taskId},
        data: value,
        include: { 
          user: { select: { id: true, username: true } },
          task_labels: { include: { label: true } }
      }


    });

    return res.json({ message: "Task fully updated", task: taskSerializer(updated) });




        
    } catch (error) {
        res.status(500).json({ error: "Failed to update task" });
        
    }
}


// patch
export const partialUpdateTaskController = async (req, res) => {
  try {
    const taskId = Number(req.params.id);
    const { error, value } = partialTaskSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({ errors: error.details.map(d => d.message) });
    }

    const task = await prismaClient.task.findUnique({ where: { id: taskId } });

    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.created_by !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    const updated = await prismaClient.task.update({
      where: { id: taskId },
      data: value,
      include: { 
        user: { select: { id: true, username: true } },
        task_labels: { include: { label: true } } }
    });

    return res.json({ message: "Task partially updated", task: taskSerializer(updated) });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to partially update task" });
  }
};



export const deleteTaskController = async (req, res) => {
  try {
    const taskId = Number(req.params.id);

    const task = await prismaClient.task.findUnique({ where: { id: taskId } });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.created_by !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized: You cannot delete this task" });
    }

    await prismaClient.task.delete({ where: { id: taskId } });

    return res.json({ message: "Task deleted successfully" });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to delete task" });
  }
};