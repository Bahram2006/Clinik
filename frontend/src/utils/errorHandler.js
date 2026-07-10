export const getErrorMessage = (t, error, data) => {
  if (data && data.errorCode) {
    return t(`errors.${data.errorCode}`, data.message);
  }

  if (error && error.code === "ERR_NETWORK") {
    return t("errors.NETWORK_ERROR");
  }

  return error?.message || t("errors.SERVER_ERROR");
};