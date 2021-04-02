exports.getNumberFromString = (value) => {
  const parsed = parseInt(value);
  if (isNaN(parsed)) {
    return undefined;
  }
  return parsed;
};
