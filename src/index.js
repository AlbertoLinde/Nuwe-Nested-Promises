#! /usr/bin/env node

const inquirer = require('inquirer');

const https = require('https');
const fs = require('fs');

const CLI_OPTIONS = {
    LoginWithGoogle: 'Login with Google',
    DownloadFile: 'Download File ⬇',
    DownloadCSV: 'Download CSV and convert to JSON',
    DownloadGDrive: 'Download file from Google Drive'
};

const fileType = ['TXT', 'CSV', 'JSON'];

inquirer
    .prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What do you need?',
            choices: ['Login with Google', 'Download File ⬇', 'Download CSV and convert to JSON', 'Download file from Google Drive']
        }
    ]).then(answers => {
        checkOptions(answers.options);
    });

function checkOptions(selectedOption) {
    switch (selectedOption) {
        case CLI_OPTIONS.LoginWithGoogle:

            break;
        case CLI_OPTIONS.DownloadFile:
            dowloadFile();
            break;
        case CLI_OPTIONS.DownloadCSV:

            break;
        case CLI_OPTIONS.DownloadGDrive:

            break;
        default:
            break;
    }
}

function dowloadFile() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'fileType',
            message: 'Please, what type of file are u going to download?',
            choices: fileType
        },
        {
            type: 'input',
            name: 'fileName',
            message: 'Write the name of your file: '
        },
        {
            type: 'input',
            name: 'fileUrl',
            message: 'Write the URL to download (locally) your file: '
        }
    ]).then(answers => {

        const downloadFileUrl = answers.fileUrl;
        const path = `../${answers.fileName}.${answers.fileType.toLowerCase()}`;
        const filePath = fs.createWriteStream(path);

        getFile(downloadFileUrl, filePath)
            .then(function (resp) {
                if (resp.statusCode === 200) {
                    saveFile(resp, filePath);
                } else {
                    console.log(`ERROR - Please check the URL\nCODE: ${resp.statusCode}\nMESSAGE: ${resp.statusMessage}`)
                }
            }).catch((error) => {
                filePath.on('error', () => console.log('ERROR: '.concat(error)));
            });
    });
}

function getFile(downloadFileUrl) {
    return new Promise((resolve) => {
        https.get(downloadFileUrl, (resp, error) => {
            resolve(resp);
        });
    });
}

function saveFile(resp, filePath) {
    resp.pipe(filePath);
    filePath.on('finish', () => {
        filePath.close();
        console.log(`File downloaded successfully in: ${JSON.stringify(filePath.path)}.`)
    });
}
