// src/utils/getErrorMessage.js

export const getErrorMessage = (t, error, data) => {
  if (data && data.errorCode) {
    return t ? t(`errors.${data.errorCode}`, data.message) : data.message;
  }

  if (error && error.code === "ERR_NETWORK") {
    return t ? t("errors.NETWORK_ERROR") : "Tor ýalňyşlygy (Network Error)";
  }

  return error?.message || (t ? t("errors.SERVER_ERROR") : "Server ýalňyşlygy");
};