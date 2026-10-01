export const getDateFromJSONString = (date: Date) => {
  return new Date(date).toLocaleDateString();
};
