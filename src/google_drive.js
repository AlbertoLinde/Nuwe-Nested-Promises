const { google } = require('googleapis');
require('dotenv').config({ path: '../.env' });
const fs = require('fs');
const { userInfo } = require('os');

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI,
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
});

async function checkAuth() {
    const authInfo = await drive.about.get({ fields: '*' });
    return authInfo;
}

async function listGoogleDrive() {
    try {
        const response = await drive.files.list();
        return response;
    } catch (error) {
        console.log(error.message);
    }
}

async function downloadFile(fileS) {

    try {
        drive.files.get({ fileId: fileS, alt: 'media' }, { responseType: 'stream' },
            function (err, res) {
                res.data
                    .on('end', () => {
                        console.log('Done');
                    })
                    .on('error', err => {
                        console.log('Error', err);
                    })
                    .pipe(dest);
            }
        );
    } catch (error) {
        console.log(error);
    }
}

module.exports.listGoogleDrive = listGoogleDrive;
module.exports.downloadFile = downloadFile;
module.exports.checkAuth = checkAuth;
