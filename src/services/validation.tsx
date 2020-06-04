const validateEmail = (email: string) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const validatePassword = (password: string) => {
  const result = password.length >= 8 ? true : false;
  return result;
};

const validateName = (name: string) => {
  const result = name !== '' ? true : false;
  return result;
};

const validateNumber = (number: string) => {
  const regex = /^[0-9]+$/;
  return regex.test(number);
};

export default {
  validateEmail,
  validatePassword,
  validateName,
  validateNumber,
};
