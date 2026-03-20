export const regex = {
    mobile: /^\d{8,15}$/,
    password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/,
    email: /^[a-zA-Z._][a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,5}$/,
    fullName: /^([a-zA-Z]+\s?)*$/,
    state: /^([a-zA-Z]+\s?)*$/,
    number: /^\d*$/,
    firstname: /^[a-zA-Z]*$/,
    lastname: /^[a-zA-Z]*$/,
    alphaNumeric: /^[a-zA-Z0-9]*$/,
    alphaNumericWithOneSpace: /^([a-zA-Z0-9]+\s?)*$/,
    floatingNumber: /^\d+(\.\d*)?$/,
    zero: /^0+$/,
    address: /^([a-z0-9A-Z\-\.\/\,]+\s?)*$/,
    mobliedesh: /^(\d{3} ?\d{3} ?\d{2,4} ?\d{0,5})$/,
  };
  