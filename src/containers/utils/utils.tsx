export const validateNotNull = (value: string) => {
  if (value != "") {
    return true;
  }
  return false;
};
