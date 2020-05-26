interface IState {
  email: string;
  phoneNumber: string;
  entityLegalName: string;
  // dateOfBirth: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isValidState: boolean;
  options: any;
  base64_image: any;
  category: string;
  formErrors: any;
  formInputValid: any;
  formValid: boolean;
  companyEIN: string;
  website: string;
  regulatoryAML: string;
  securities: string;
  owner_name: any;
  regulatoryOptAML: any;
  regulatoryOpt: any;
  isFileFormat: boolean;
  owner_name_1: string;
  phoneCountry: string;
  companyDetail: any;
  companyAdvance: any;
  owner_name_2: string;
  owner_name_3: string;
  owner_name_4: string;
  companyDBA: string;
  imageIds: any;
}

interface IDispachToProps {
  editComBasicAction?: (userDetail, detail, fileUpload) => void;
  getCompanyProfileAction?: (message, isShow) => void;
  editUserInformation?: (dashboardInfo ) => void;
  offSuccessAction: (message, isShow) => void;
  getProfileAdvanceAction?: (userId, companyId) => void;
  getCompanyAdvanceAction?: (userId, companyId) => void;
  
}

interface IProps extends IDispachToProps {
  error: any;
  errorMess: string;
  isLoading: boolean;
  userInfo: any;
  isSuccess: boolean;
  isCopProfile?: boolean;
  isShow?: boolean;
  companyDetail?: any;
  isDataLoading?: boolean;
  adminDetail?: any;
}

export { IProps, IState };
