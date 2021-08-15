#! /usr/bin/env node

const inquirer = require('inquirer');
const gdrive = require('../src/google_drive');

const csv = require('csvtojson');

const https = require('https');
const fs = require('fs');

const FILE_TYPE = ['TXT', 'CSV', 'JSON'];
const CLI_OPTIONS = {
    LoginWithGoogle: 'Login with Google',
    DownloadFile: 'Download File ⬇',
    ConvertJSONLocal: 'CSV to JSON (Local File)',
    DownloadCSV: 'Download CSV and convert to JSON',
    DownloadGDrive: 'Download file from Google Drive'
};

inquirer
    .prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What do you need?',
            choices: ['Login with Google', 'Download File ⬇', 'CSV to JSON (Local File)', 'Download CSV and convert to JSON', 'Download file from Google Drive']
        }
    ]).then(answers => {
        checkOptions(answers.options);
    });

function checkOptions(selectedOption) {
    switch (selectedOption) {
        case CLI_OPTIONS.LoginWithGoogle:
            taskOne();
            break;
        case CLI_OPTIONS.DownloadFile:
            taskTwo();
            break;
        case CLI_OPTIONS.ConvertJSONLocal:
            taskThree();
            break;
        case CLI_OPTIONS.DownloadCSV:
            taskFour();
            break;
        case CLI_OPTIONS.DownloadGDrive:
            downloadFileFromGDrive();
            break;
        default:
            break;
    }
}

/**
 * Check if Auth is alive and show user info.
 */
async function taskOne() {
    const authInfo = await gdrive.checkAuth();
    if (authInfo) { console.log(authInfo.data.user); }
}


/**
 * Download files CVS/TXT/JSON.
 */
function taskTwo() {

    const DOWNLOAD_QUESTION = [
        { type: 'list', name: 'fileType', message: 'Please, what type of file are u going to download?', choices: FILE_TYPE },
        { type: 'input', name: 'fileName', message: 'Write the name of your file: ' },
        { type: 'input', name: 'fileUrl', message: 'Write the URL to download (locally) your file: ' }
    ];

    inquirer.prompt(DOWNLOAD_QUESTION).then(answers => {

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
    return JSON.stringify(filePath.path);
}

// TASK 3 - CONVERT CSV TO JSON (LOCAL - NO DOWNLOAD)
function taskThree() {

    const CSVTOJSON_QUESTIONS = [
        { type: 'input', name: 'localPath', message: 'Please, insert the path of your CSV file: ' },
        { type: 'input', name: 'fileName', message: 'Write the name of the JSON to be generated: ' }];

    inquirer
        .prompt(CSVTOJSON_QUESTIONS).then(answers => {
            toJson(answers.localPath, answers);
        });
}


function taskFour() {

    const CSVTOJSON_QUESTIONS = [
        { type: 'input', name: 'fileName', message: 'Write the name of your file: ' },
        { type: 'input', name: 'fileUrl', message: 'Write the URL to download (locally) your file: ' }];

    inquirer
        .prompt(CSVTOJSON_QUESTIONS)
        .then(answers => {

            const downloadFileUrl = answers.fileUrl;
            const path = `../${answers.fileName}.csv`;
            const filePath = fs.createWriteStream(path);

            getFile(downloadFileUrl, filePath)
                .then(function (resp) {
                    if (resp.statusCode === 200) {
                        convertCsvToJson(resp, filePath, answers);
                    }
                });
        });
}
/**
 * Pipe the resp stream and when finish the operation convert the CSV to JSON.
 */
function convertCsvToJson(resp, filePath, answers) {
    resp.pipe(filePath);
    filePath.on('finish', () => {
        filePath.close();
        console.log(`File downloaded successfully in: ${JSON.stringify(filePath.path)}.`)
        toJson(filePath.path, answers);
    });
}

/**
 * Convert the downloaded or local CSV file into JSON.
 * @param { String } csvFile 
 * @param { Object } answers 
 */
function toJson(csvFile, answers) {
    csv()
        .fromFile(csvFile)
        .then((jsonValue) => {
            fs.writeFileSync(`${answers.fileName}.json`, JSON.stringify(jsonValue), "utf8", (error) => {
                if (error) { console.log(error); }
            });
        })
        .then(`File converted to JSON: ${JSON.stringify(csvFile.path)}.`);
}


async function downloadFileFromGDrive() {
    const elementsGDrive = await gdrive.listGoogleDrive();

    const driveFiles = [];

    elementsGDrive.data.files.forEach(element => {
        driveFiles.push(`${element.name}[gdriveid]${element.id}`);
    });

    inquirer
        .prompt(
            { type: 'list', name: 'driveFileName', message: 'Please, select the ID ?', choices: driveFiles }
        )
        .then(answers => {
            let id = answers.driveFileName.split('[gdriveid]');
            const file = gdrive.downloadFile(id[1]);
            // console.log(file) Commented because retrieve 403 error. Forbiden, TODO: need to check this error
        });
}



