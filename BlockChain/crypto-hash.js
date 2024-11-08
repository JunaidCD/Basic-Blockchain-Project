const crypto = require("crypto");

const cryptoHash = (...inputs) => {
    const hash = crypto.createHash("sha256");
    hash.update(inputs.join(""));  // Join the inputs into a single string
    return hash.digest("hex");  // Return the hash as a hex string
};

module.exports = cryptoHash;
