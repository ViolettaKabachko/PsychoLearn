export const hasEnoughLength = (len: number, text: string) => {
  return text.length >= len;
};

export const hasCapitalLetters = (text: string) => {
  return text.toLowerCase() !== text;
};

export const hasLowerLetter = (text: string) => {
  return text.toUpperCase() !== text;
};

export const hasDigits = (text: string) => {
  return Array.from(text).some((el) => "0123456789".includes(el));
};

export const passwordAreTheSame = (
  password: string,
  secondPassword: string,
) => {
  return password === secondPassword;
};

let emailRegex = new RegExp("^[\\w\\d.-_]+@[\\w\\d.-_]+[\\w\\d]$");

export const validateEmail = (email: string) => {
  return String(email).match(emailRegex) !== null;
};
