export const validateSignup = (username, password, repeat_password) => {
  const regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  if (username != "" && regPass.test(password) === true && repeat_password === password) {
    return true;
  }
  return false;
};
