export const taskFilter = (query, userId) => {
  const where = { created_by: userId };

  if (query.status) {
    where.status = query.status;
  }

  if (query.priority) {
    where.priority = query.priority;
  }

  const sortOrder = query.order === 'desc' ? 'desc' : 'asc';
  const orderBy = { due_date: sortOrder };

  return { where, orderBy };
};