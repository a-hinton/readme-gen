const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const markdown = require('./utils/generateMarkdown');

const writeFileAsync = util.promisify(fs.writeFile);

// Questions to prompt user with
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter your name',
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username',
    },
    {
        type: 'input',
        name: 'linkedin',
        message: 'Enter your LinkedIn URL',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address',
    },
    {
        type: 'input',
        name: 'project',
        message: 'Name your project',
    },
    {
        type: 'input',
        name: 'description',
        message: 'describe your program',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'describe the installation steps',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'describe how your program is used',
    },
    {
        type: 'list',
        name: 'license',
        message: 'choose your preferred license',
        choices: ['Apache License v2.0', 'GNU General Public License v3.0', 'MIT License']
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'how can people contribute to your project?',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'describe relevant tests',
    },
]

// function to initialize program
function init() {

    inquirer.prompt(questions)
        .then(function (inputs) {
            // console.log(inputs);
            let template = readme(inputs);
            writeFileAsync('README.md', template);
        }).catch((err)=> console.error(err));
}

// function call to initialize program
init();

const chooseBadge = (license) => {
    let badge = '';
    if (license === 'Apache License v2.0') {
        badge = '![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)'
    }
    else if (license === 'GNU General Public License v3.0') {
        badge = '![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)'
    }
    else if (license === 'MIT License') {
        badge = '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)'
    }
    else {
        badge = '![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)'
    }
    return badge
}


const readme = (inputs) => {

    return `
# ${inputs.project}
${chooseBadge(inputs.license)}

## Description
**${inputs.description}**

# Table of Contents

* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions ](#questions)

# Installation
${inputs.installation}

# Usage
${inputs.usage}

# License
${inputs.license}

# Contributing
${inputs.contributing}

# Tests
To test the program, run the following commands: <br>
\`\`\`${inputs.tests}\`\`\`

# Questions
**Developed by: ${inputs.name}** <br>
**GitHub: ${inputs.github}** <br>
**LinkedIn: ${inputs.linkedin}** <br>
**Email: ${inputs.email}** <br>
Contact me via email with any questions you have regarding this project.`
}

