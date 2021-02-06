const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub username.',
            validate: githubInput => {
                if (githubInput) {
                  return true;
                } else {
                  console.log('Please enter your GitHub username!');
                  return false;
                }
            }
          },
          {
            type: 'input',
            name: 'email',
            message: 'Enter your Email Address.',
            validate: emailInput => {
                if (emailInput) {
                  return true;
                } else {
                  console.log('Please enter your email address!');
                  return false;
                }
            }
          },
          {
            type: 'input',
            name: 'title',
            message: "What is your project's name?",
            validate: projectInput => {
                if (projectInput) {
                  return true;
                } else {
                  console.log('Please enter a project name!');
                  return false;
                }
            }
          },
          {
            type: 'input',
            name: 'description',
            message: 'Enter a description of your project',
            validate: descInput => {
                if (descInput) {
                  return true;
                } else {
                  console.log('Please enter a description!');
                  return false;
                }
            }
          },
          {
            type: 'list',
            name: 'license',
            message: 'What kind of license should your project have?',
            choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD 3', 'None']
          },
          {
            type: 'input',
            name: 'installation',
            message: 'What command should be run to install dependencies?',
            default: 'npm i'
          },
          {
            type: 'input',
            name: 'test',
            message: 'What command should be run to run tests?',
            default: 'npm test'
          },
          {
            type: 'input',
            name: 'usage',
            message: 'What does the user need to know about using the repo?'
          },
          {
            type: 'input',
            name: 'contributing',
            message: 'What does the user need to know about contributing to the repo?'
          }
    ])
}


const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
      fs.writeFile('./dist/readme.md', fileContent, err => {
        // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
        if (err) {
          reject(err);
          // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
          return;
        }
  
        // if everything went well, resolve the Promise and send the successful data to the `.then()` method
        resolve({
          ok: true,
          message: 'File created!'
        });
      });
    });
  };

  
  
promptUser()
  .then(data => {
      return generateMarkdown(data);
  })
  .then(readmePage => {
    return writeFile(readmePage);
    })
    .catch(err => {
    console.log(err);
});