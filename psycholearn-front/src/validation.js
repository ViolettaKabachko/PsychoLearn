export const hasEnoughLength = (len, text) => {
    return text.length >= len;
}

export const hasCapitalLetters = (text) => {
    return text.toLowerCase() !== text;
}

export const hasLowerLetter = (text) => {
    return text.toUpperCase() !== text;
}

export const hasDigits = (text) => {
    return Array.from(text).some((el) => "0123456789".includes(el))
}

export const passwordAreTheSame = (password, secondPassword) => {
    return password === secondPassword;
}

let emailRegex = new RegExp("^[\\w\\d.-_]+@[\\w\\d.-_]+[\\w\\d]$")

export const validateEmail = (email) => {
    return String(email).match(emailRegex) !== null
};