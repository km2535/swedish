export const check_pw_pattern = (asValue) => {
  var regExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regExp.test(asValue);
};
export const check_id_pattern = (asValue) => {
  var regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
  return regExp.test(asValue);
};
export const check_phone_pattern = (asValue) => {
  var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
  return regExp.test(asValue);
};
