#! /usr/bin/env node
const inquirer = require('inquirer');

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
            downloadFile();
            break;
        case CLI_OPTIONS.DownloadCSV:

            break;
        case CLI_OPTIONS.DownloadGDrive:

            break;
        default:
            break;
    }
}

function downloadFile() {
    inquirer.prompt({
        type: 'list',
        name: 'beverage',
        message: 'And your favorite beverage?',
        choices: fileType
    });
}


