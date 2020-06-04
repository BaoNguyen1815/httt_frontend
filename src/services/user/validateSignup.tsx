export const validateSignup = (username, password, repeat_password, fullName, role) => {
  const regPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  if (
    username != "" &&
    regPass.test(password) === true &&
    repeat_password === password &&
    fullName !== "" &&
    role !== ""
  ) {
    return true;
  }
  return false;
};
