export default {
  emailRegex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  password: /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
  name: /^ [a - zA - Z\s']+$/,
  customAlphaOnly: /^[A-Za-z\s]+$/,
  city: /^[a-zA-Z\s\-'.]{2,}$/,
  phone: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g,
  cvvExpression: /^[0-9]+$/,
  cardNumberExpression: /^[0-9]+$/,
  numberRegex: /^\d+(\.\d{1,2})?$/,
  ssnFormattedRegex: /^\d{2}-\d{2}-\d{4}$/,
  percentageOneDecimalRegex: /^(100(\.0{1,2})?|(\d{1,2})(\.\d{1,2})?)$/,
  removeHyphen: /-/g,
};
