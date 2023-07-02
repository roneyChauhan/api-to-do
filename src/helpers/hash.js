const { APP_HASH_SECRETKEY } = process.env;
const crypto = require('crypto');
module.exports = {
    createHash(string) {
        const hashedPassword = crypto.createHmac('sha256', APP_HASH_SECRETKEY || 'password-key')
		.update(string);
    	return hashedPassword;
    },
    verifyHash(string, hash) {
        const passwordHash = crypto.createHash(string);
	    return passwordHash === hash;
    }
};