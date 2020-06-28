export const ValidationPattern = {
  username: /^[0-9a-zA-Z]{2,10}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+(?:\.[a-zA-Z]+)+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+\-=!*(){}[\]<>\/?,.\\|~`;:'"]).{6,20}$/,
  callingCode: /^\d{1,7}$/,
  phone: /^\d{9,12}$/,
};
