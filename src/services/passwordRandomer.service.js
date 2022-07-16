const PasswordRandomer = {
    generateRandomPassword: () => {
        const length = 10;
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let password = '';

        for(let i=0; i < length; i++){
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return password;
    }
};

module.exports = PasswordRandomer;