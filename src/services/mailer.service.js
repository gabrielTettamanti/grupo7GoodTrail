//***** Require´s *****/
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { clientId, clientSecret, redirectUri, refreshToken } = require('../config');  

const Mailer = {
    sendEmail: async (email, randomPassword) => {
        //***** oAuth2 Configuration *****/
        const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

        oAuth2Client.setCredentials({ refresh_token: refreshToken });

        const accessToken = oAuth2Client.getAccessToken();

        //***** Email Body generation *****/
        const contentHTML = `
            <h1>Contraseña generada</h1>
            <p>Tu nueva contraseña es: <strong>${randomPassword}</strong></p> 
        `;

        //***** Nodemailer Configuration *****/
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAUTH2',
                user: 'goodtrailexperiences@gmail.com',
                clientId: clientId,
                clientSecret: clientSecret,
                refreshToken: refreshToken,
                accessToken: accessToken
            }
        });

        const mailOptions = {
            from: 'GoodTrail Experiences <goodtrailexperiences@gmail.com>',
            to: email,
            subject: 'Nueva contraseña generada',
            html: contentHTML
        };

        const result = await transporter.sendMail(mailOptions);

        return result;
    }
}

module.exports = Mailer;