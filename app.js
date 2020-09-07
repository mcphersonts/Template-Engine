const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamMembers = [];

function app() {
  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "Select team member role:",
          choices: ["Manager", "Engineer", "Intern", "Exit"],
        },
      ])
      .then((choice) => {
        switch (choice.role) {
          case "Manager":
            addManager();
            break;
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
    function addManager() {
      inquirer
        .prompt([
          {
            type: "input",
            name: "managerName",
            message: "Enter name:",
            validate: (answer) => {
              if (answer !== "") {
                return true;
              }
              return "Please enter name";
            },
          },
          {
            type: "input",
            name: "managerId",
            message: "Enter ID:",
          },
          {
            type: "input",
            name: "managerEmail",
            message: "Enter Email:",
          },
          {
            type: "input",
            name: "managerOfficeNumber",
            message: "Enter office number:",
          },
        ])
        .then((answers) => {
          const manager = new Manager(
            answers.managerName,
            answers.managerId,
            answers.managerEmail,
            answers.managerOfficeNumber
          );
          teamMembers.push(manager);
          console.log(manager);
          console.log(teamMembers);
          createTeam();
        });
    }
    function addEngineer() {
      inquirer
        .prompt([
          {
            type: "input",
            name: "engineerName",
            message: "Enter name:",
            validate: (answer) => {
              if (answer !== "") {
                return true;
              }
              return "Please enter name";
            },
          },
          {
            type: "input",
            name: "engineerId",
            message: "Enter ID:",
          },
          {
            type: "input",
            name: "engineerEmail",
            message: "Enter Email:",
          },
          {
            type: "input",
            name: "engineerGithub",
            message: "Enter Github:",
          },
        ])
        .then((answers) => {
          const engineer = new Engineer(
            answers.engineerName,
            answers.engineerId,
            answers.engineerEmail,
            answers.engineerGithub
          );
          teamMembers.push(engineer);
          console.log(engineer);
          console.log(teamMembers);
          createTeam();
        });
    }
    function addIntern() {
      inquirer
        .prompt([
          {
            type: "input",
            name: "internName",
            message: "Enter name:",
            validate: (answer) => {
              if (answer !== "") {
                return true;
              }
              return "Please enter name";
            },
          },
          {
            type: "input",
            name: "internId",
            message: "Enter ID:",
          },
          {
            type: "input",
            name: "internEmail",
            message: "Enter Email:",
          },
          {
            type: "input",
            name: "internSchool",
            message: "Enter name of school:",
          },
        ])
        .then((answers) => {
          const intern = new Intern(
            answers.internName,
            answers.internId,
            answers.internEmail,
            answers.internSchool
          );
          teamMembers.push(intern);
          console.log(intern);
          console.log(teamMembers);
          createTeam();
        });
    }
  }
  function buildTeam() {
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }
  createTeam();
}

app();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
