// import { IUserModel } from "models";

interface IStateStepVerify {
  formActivePanel3: any;
  selectedFile: any;
  formActivePanel1Changed: any;
  checked: boolean;
  category1: string;
  base64_image1: any;
  category2: string;
  base64_image2: string;
  category3: string;
  base64_image3: string;
  [x: string]: any;
}
interface IStateVerification {
  collapseID: string;

  selectedFile: any;
  options: any;
  userAdvance: any;
  checked: boolean;
  category: string;
  base64_image: any;
  category1: string;
  base64_image1: any;
  category2: string;
  base64_image2: string;
  category3: string;
  base64_image3: string;
  category4: string;
  base64_image4: string;
  countFile: number;
  isIdfront: boolean;
  isIdback: boolean;
  isSelf: boolean;
  isProo: boolean;
  isDisabled: boolean;
  isLoadingUpload: boolean;
  uploadSuccess: boolean;
  uploadFalse:  boolean;
}

interface IDispachToProps {
  getProfileAdvanceAction: (userDetail) => void;
  uploadDocumentTypeAction: (userAdv) => void;
  addUserAdvanceAction: (userAdv) => void;
  offSuccessAction: (mess, isShow) => void;
}

interface IProps extends IDispachToProps {
  userInfo?: any;
  userDetail?: any;
  isLoading?: boolean;
  collapseID?: boolean;
  error?: boolean;
  isSuccess?: boolean;
  userAdv?: any;
}
export { IProps, IStateStepVerify, IStateVerification, };
