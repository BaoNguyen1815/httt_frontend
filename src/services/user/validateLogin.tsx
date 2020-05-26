export const validateLogin = (username: string, password: string) => {
  if (username != "" && password != "") {
    return true;
  }
  return false;
};
