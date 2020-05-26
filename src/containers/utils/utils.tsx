
import moment from "moment/moment";
export const validateField = (type, value, name?) => {
  const filedValidate = {
    filedValid: null,
    fieldValidationErrors: ""
  };

  switch (type) {
    case "email":
      const regEmail = /^\w+([\+.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      filedValidate.filedValid = regEmail.test(value);
      if (value) {
        filedValidate.fieldValidationErrors = filedValidate.filedValid ? "" : " Not a valid Email Address.";
      } else {
        filedValidate.fieldValidationErrors = "Email is required.";
      }
      break;
    case "password":
    case "newpassword":
      const regPass = /^([.\w^\S]){6,}$/;
      filedValidate.filedValid = regPass.test(value);
      if (value) {
        filedValidate.fieldValidationErrors = filedValidate.filedValid
          ? ""
          : " Password must be greater than 6 characters";
      } else {
        filedValidate.fieldValidationErrors = "Password is required.";
      }
      break;
    case "text":
    case "textarea":
     
      const regDNI = /^[0-9]{7,8}$/;
      const regCUIT = /^[0-9]{11}$/;
      filedValidate.filedValid = value.length > 0;
      filedValidate.fieldValidationErrors = filedValidate.filedValid ? "" : " Text is not valid";
      if (name === "CUITNumber") {
        filedValidate.filedValid = regCUIT.test(value);
        filedValidate.fieldValidationErrors = filedValidate.filedValid ? "" : " CUIT Number is not valid";
      }
      if (name === "DNINumber") {
        filedValidate.filedValid = regDNI.test(value);
        filedValidate.fieldValidationErrors = filedValidate.filedValid ? "" : " DNINumber Number is not valid";
      }
     
      break;
    case "url":
      const regUrl = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
      filedValidate.filedValid = regUrl.test(value);
      if (value) {
        filedValidate.fieldValidationErrors = filedValidate.filedValid
          ? ""
          : "  url not correct";
      } else {
        filedValidate.fieldValidationErrors = "website is required.";
      }
      break;
    case "number":
      const regCBU = /([0-9]){22}/;
      if (name === "phoneNumber") {
        filedValidate.filedValid = value.length > 4;
      } else {
        filedValidate.filedValid = value.length > 0;
      }
      filedValidate.fieldValidationErrors = filedValidate.filedValid ? "" : " number is not valid";
      if (name === "CBUNumber") {
        filedValidate.filedValid = regCBU.test(value);
        filedValidate.fieldValidationErrors = filedValidate.filedValid ? "" : " CBUNumber is not valid";
      }  
      break;
    case "date":
      if (moment(value, "YYYY-MM-DD", true).isValid()) {
        filedValidate.filedValid = true;
      }
      filedValidate.fieldValidationErrors = filedValidate.filedValid ? "" : " Date is not valid";
      break;
  }
  return filedValidate;
};

export const getBase64 = (file, cb) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () => {
    const dataBase64 = reader.result.toString();
    cb(dataBase64);
  };
  reader.onerror = (error) => {
    console.log('Error: ', error);
    cb(false);
  };
};

export const checkFileType = (type, size) => {
  if ((type === 'application/pdf' || type === 'image/jpeg' || type === 'image/png') && size < 4194304) {
    return true;
  }
  return false;
};

export const getUserSession = (key) => {
  let userData = null;
  const data = sessionStorage.getItem(key);
  if (data) {
    userData = JSON.parse(data);
  }
  return userData;
};

// const resizeImage = (base64Str, maxWidth = 500, maxHeight = 300) => {
//   return new Promise((resolve) => {
//     let img = new Image();
//     img.src = base64Str;
//     img.onload = () => {
//       // alert(img.width + " " + img.height);
//       let canvas = document.createElement('canvas');
//       const MAX_WIDTH = maxWidth;
//       const MAX_HEIGHT = maxHeight;
//       let width = img.width;
//       let height = img.height;

//       if (width > height) {
//         if (width > MAX_WIDTH) {
//           height *= MAX_WIDTH / width;
//           width = MAX_WIDTH;
//         }
//       } else {
//         if (height > MAX_HEIGHT) {
//           width *= MAX_HEIGHT / height;
//           height = MAX_HEIGHT;
//         }
//       }
//       canvas.width = width;
//       canvas.height = height;
//       let ctx = canvas.getContext('2d');
//       ctx.drawImage(img, 0, 0, width, height);
//       resolve(canvas.toDataURL());
//     }
//   })
// };