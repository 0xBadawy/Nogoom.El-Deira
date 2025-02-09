const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

export const formatDateTime = (isoDate) => {
  const date = new Date(isoDate);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

export default formatDate;
