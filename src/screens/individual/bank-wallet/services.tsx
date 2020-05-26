import config from "containers/config";
import { postService } from "services/config";

export const getBankAccounts = async (user_id) => {
  try {
    return await postService(`${config.STAGE}/user/distributions/view`, { user_id }, "get list BankAccount/Wallet Fail", true);
  } catch (error) {
    throw error;
  }
};

export const getWalletAccounts = async (user_id) => {
  try {
    return await postService(`${config.STAGE}/user/cryptocurrencywallets/view`, { user_id }, "get list Wallet Fail", true);
  } catch (error) {
    throw error;
  }
};


export const createBankAccount = async (bankDetail, apiEndPoint) => {
  try {
    return await postService(`${config.STAGE}/user/distribution/add/bank/${apiEndPoint}`, bankDetail, "add Bank Fail", true);
  } catch (error) {
    if (error.status) {
      return error;
    }
    throw error;
  }
};

export const updateBankWalletAccount = async accountDetail => {
  try {
    return await postService(`${config.STAGE}/user/distribution/update`, accountDetail, "edit accountDetail Fail", true);
  } catch (error) {
    if (error.status === 400) {
      return false;
    }
    throw error;
  }
};

export const editCryptoWalletAccount = async walletAccountDetail => {
  try {
    return await postService(`${config.STAGE}/user/cryptocurrencywallet/edit`, walletAccountDetail, "edit walletAccountDetail Fail", true);
  } catch (error) {
    if (error.status === 400) {
      return false;
    }
    throw error;
  }
};

export const bankAccountTwoFA = async (user_id, pending_distribution_id, two_factor_token) => {
  try {
    return await postService(`${config.STAGE}/user/distribution/confirm`, { user_id, pending_distribution_id, two_factor_token }, "bankAccountTwoFA Bank Fail", true);
  } catch (error) {
    if (error.status === 400 || error.status === 500) {
      return false;
    }
    throw error;
  }
};

export const removeBankWalletAccount = async (user_id, distribution_id) => {
  try {
    return await postService(`${config.STAGE}/user/distribution/delete`, { user_id, distribution_id }, "remove bank Account Fail", true);
  } catch (error) {
    throw error;
  }
};

export const removeCryptoAccount = async (user_id, cryptocurrencywallet_id) => {
  try {
    return await postService(`${config.STAGE}/user/cryptocurrencywallet/delete`, { user_id, cryptocurrencywallet_id }, "remove bank cryptocurrencywallet_id Fail", true);
  } catch (error) {
    throw error;
  }
};

export const distributionValidationCrypto = async (detailCrypto, symbol) => {
  try {
    return await postService(`${config.STAGE}/user/distribution_validation/crypto/${symbol}`, detailCrypto, "distributionValidationCrypto Fail", true);
  } catch (error) {
    if (error.status === 500 || error.status === 403) {
      return false;
    }
    throw error;
  }
};

export const distributionValidationCryptoListBTC = async (detailCrypto, symbol) => {
  try {
    return await postService(`${config.STAGE}/user/distribution_validation/crypto/list/${symbol}`, detailCrypto, "distributionValidationCryptoListBTC Fail", true);
  } catch (error) {
    if (error.status === 500 || error.status === 403) {
      return false;
    }
    throw error;
  }
};

export const createCryptoWallet = async (detailCrypto, symbol) => {
  try {
    return await postService(`${config.STAGE}/user/distribution/add/crypto/${symbol}`, detailCrypto, "add Crypto Fail", true);
  } catch (error) {
    if (error.status) {
      return error;
    }
    throw error;
  }
};

export const createListCryptoWallet = async (detailCrypto, symbol) => {
  try {
    return await postService(`${config.STAGE}/user/distribution/add/crypto/list/${symbol}`, detailCrypto, "add Crypto Fail", true);
  } catch (error) {
    if (error.status) {
      return error;
    }
    throw error;
  }
};