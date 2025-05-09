const sha1 = require("sha1");

module.exports = {
    generateAuthToken: (salt) => {
        return sha1(salt + new Date().getTime())
    },
    generatePassword: (password) => {
        return sha1(password);
    },
};