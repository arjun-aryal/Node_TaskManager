// export const taskSerializer = (task) => {
//   return {
//     id: task.id,
//     title: task.title,
//     description: task.description,
//     status: task.status,
//     priority: task.priority,
//     due_date: task.due_date,
//     // created_at: task.created_at,
//     // updated_at: task.updated_at,
//     created_by: {
//       id: task.user.id,
//       name: task.user.username
//     },

//     labels: task.task_labels?.map((tl)=>{
//       id: tl.label.id,
//     })
//   };
// };


export const taskSerializer = (task) => ({
  id: task.id,
  title: task.title,
  description: task.description,
  status: task.status,
  priority: task.priority,
  due_date: task.due_date,
  created_by: {
    id: task.user.id,
    name: task.user.username
  },


  labels: task.task_labels?.map((tl) => ({
    id: tl.label.id,
    name: tl.label.name,
    color: tl.label.color
  })) || []


});
