export const labelSerializer = (labels) => {
  if (Array.isArray(labels)) {
    return labels.map(label => ({
      id: label.id,
      name: label.name,
      color: label.color
    }));
  }

  return {
    id: labels.id,
    name: labels.name,
    color: labels.color
  };
};