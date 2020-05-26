interface IState {
  emailAdmin: string;
  phoneAdmin: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  category1: string;
  base64_image1: any;
  category2: string;
  base64_image2: any;
  category3: string;
  base64_image3: any;
  category4: string;
  base64_image4: any;
  options: any;
  formErrors: any;
  formInputValid: any;
  formValid: boolean;
  isFileFormat: boolean;
  adminDetail: any;
  userDetail: any;
  adminAdvance: any;
  isIdFront: boolean;
  isIdBack: boolean;
  isSelf: boolean;
  isPro: boolean;
}

interface IDispachToProps {
  editComAdvanceAction?: (userDetail, userInfo) => void;
  editUserInformation: (dashboardInfo) => void;
  getAdminProfileAction: (user_id, company_id) => void;
  getProfileAction: (user_id) => void;
  getAdminAdvanceAction: (user_id) => void;
  editAdminProfileAction?: (userInfo, listImages) => void
}

interface IProps extends IDispachToProps {
  error: any;
  errorMess: string;
  isLoading: boolean;
  userInfo: any;
  isSuccess: boolean;
  isAdminProfile?: boolean;
  isShow?: boolean;
  isDataLoading?: boolean;
  adminAdvance?: any;
}

export { IProps, IState };
