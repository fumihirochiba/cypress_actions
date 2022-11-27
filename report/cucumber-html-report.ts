const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');

const mapOs = (os) => {
    if(os.startsWith('win')) {
        return 'windows';
    } else if (os.startsWith('osx')) {
        return 'osx';
    } else if (os.startsWith('linux')) {
        return 'linux';
    } else if (os.startsWith('ubuntu')) {
        return 'ubuntu';
    } else if (os.startsWith('android')) {
        return 'android';
    } else if (os.startsWith('ios')) {
        return 'ios';
    }
};

fs.readFile('report/logs/cypress/runInfo.json', function read(err, data) {
    if (err) {
        throw err;
    }
    const runInfos = JSON.parse(data)
    report.generate({
        jsonDir: "report/logs/preprocessor", // ** Path of .json file **//
        reportPath: "report/html-reports",
        metadata:{
            browser: {
                name: runInfos.browserName,
                version: runInfos.browserVersion
            },
            device: 'Local test machine',
            platform: {
                name: mapOs(runInfos.osName),
                version: runInfos.osVersion
            }
        },
        displayDuration: true,
        displayReportTime: true,
        customData: {
            title: 'Run info',
            data: [
                {label: 'Project', value: 'project'},
                {label: 'Release', value: '0.8.0'},
                {label: 'Execution Start Time', value: new Date(runInfos.startedTestsAt).toLocaleString()},
                {label: 'Execution End Time', value: new Date(runInfos.endedTestsAt).toLocaleString()}
            ]
        }
    });
});
