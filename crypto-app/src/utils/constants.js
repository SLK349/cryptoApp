export const DOMAIN = "http://localhost:3001";

export const API_ENDPOINTS = {
  CREATE_TRANSACTION: `${DOMAIN}/transaction/create`,
  ALL_TRANSACTION: `${DOMAIN}/transaction/allTransaction`,
  DELETE_TRANSACTION: `${DOMAIN}/transaction/delete/`,
  ALL_SOLDE: `${DOMAIN}/transaction/allSolde`,

  CREATE_TRADE: `${DOMAIN}/trade/create`,
  ALL_TRADE: `${DOMAIN}/trade/getAll`,
  DELETE_TRADE: `${DOMAIN}/trade/delete/`,

  CREATE_USER: `${DOMAIN}/register/create`,

  AUTH_USER: `${DOMAIN}/login/auth`,

  USERNAME: `${DOMAIN}/user/username`,

  UPDATE_TRADE: `${DOMAIN}/trade/update/`,

  AUTH_TOKEN_ID: `${DOMAIN}/auth/authById/`,

  //ABONNEMENT

  CREATE_ABO: `${DOMAIN}/abo/createAbo`,
};
