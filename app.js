const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");


// create a variable [your_team_members] to store an empty array, later to be populated with your team members
const teamMembers = [];
// create variable [id_array] to store ids for the employees (not the office number)
const idArray = [];

function startApp() {

  function createEmpManager() {
    console.log("Please build your team");

    // inquriy prompt with array of questions for manager name, manager id, email, and office number
    inquirer
      .prompt([
        {
          // ask for manager's name
          type: "input",
          name: "mgrName",
          message: "Please enter Manager's name.",
          // validate user input for not a empty string. return true or if false, return a message
          validate: function (value) {
            if (value === "") {
              return false,
                console.log("Must input Manager's name");
            }
            else {
              return true;
            }
          }
        },
        {
          // ask for manager's id
          type: "input",
          name: "mgrId",
          message: "Please enter Manager's ID.",
          // validate user input for numbers; return true or if false, return a message
          validate: function (value) {
            if (value === "") {
              return false,
                console.log("Must input Manager's id");
            }
            else {
              return true;
            }
          }
        },
        {
          // ask for manager's email
          type: "input",
          name: "mgrEmail",
          message: "Please enter Manager's email.",
          // validate user input for correct email format; return true or if false, return a message
          validate: function (value) {
            if (value === "") {
              return false,
                console.log("Must input Manager's email");
            }
            else {
              return true;
            }
          }
        },
        {
          // ask for manager's office number
          type: "input",
          name: "mgrOffice",
          message: "Please enter your office number.",
          // validate user answer for number; return true or if false, return a message
          validate: function (value) {
            if (value === "") {
              return false,
                console.log("Must input office number.");
            }
            else {
              return true;
            }
          }
        },
      ])
      .then((answers) => {
        console.log(answers);
        // create a manager variable to store new manager object created with the imported Manager class
        // initialize it with user answers for name, id, email, office number.
        var mgr = new Manager(answers.mgrName, answers.mgrId, answers.mgrEmail, answers.mgofficeName);
          // push newly created manager object to [your_team_members]
          teamMembers.push(mgr);

          // push id from user answer to [id_array]
          idArray.push(mgr.id);
          // call createEmpTeam to start creat the team for the manager
          createEmpTeam();
      });
  }

  // create createEmpTeam function with logic to create manager's team
  function createEmpTeam() {
    // prompt with a list of choices for the types of employees to create - "Engineer", ""Intern", and "No more team member to add"
    inquirer
      .prompt([
        {
          // ask for choice for type of employee to create
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members", // change this example to your words
          ],
        },
      ])
      .then((userChoice) => {
        //
        switch (userChoice.memberChoice) {
          case "Engineer":
            // call function to add engineer
            addEmpEngineer();
            break;
          case "Intern":
            // call function to add intern
            addEmpIntern();
            break;
          default:
            // call function to build team
            buildEmpTeam();
        }
      });
  }

  function addEmpEngineer() {
    inquirer
      .prompt([
        {
          // ask for engineer's name
          type: "input",
          name: "engName",
          message: "Please enter Engineer's name.",
          // validate the name is not empty; return true or if false, return a message
          validate: function (value) {
            if (value === "") {
              return false,
                console.log("Must input Engineer's name.");
            }
            else {
              return true;
            }
          }
        },
        {
          // ask for engineer's id
          type: "input",
          name: "engId",
          message: "Please enter Engineer's ID.",

          // validate the id is numbers and the id has not been taken; return true or 
          // if false, just return a reminder message
          validate: function (value) {
            if (value === "") {
              return false,
                console.log("Must input Engineer's id.");
            }
            else {
              return true;
            }
          }
        },
        {
          // ask for engineer's email
          type: "input",
          name: "engEmail",
          message: "Please enter Engineer's email.",
          // validate email for correct email format
          validate: function (value) {
            if (value === "") {
              return false,
                console.log("Must input Engineer's email.");
            }
            else {
              return true;
            }
          }
        },
        {
          // ask for gibhub user name
          type: "input",
          name: "engGitHub",
          message: "Please enter Engineer's Github username.",
          // validate user name is not empty; return true or if false, just return a user friendly message
          validate: function (value) {
            if (value === "") {
              return false,
                console.log("Must input Engineer's Github username.");
            }
            else {
              return true;
            }
          }
        },
      ])
      .then((answers) => {
        // create an engineer object with user answers and store it to a constant variable
        var eng = new Engineer(answers.engName, answers.engId, answers.engEmail, answers.engGitHub);

        // push newly created engineer object to [your_team_members]
        teamMembers.push(eng);

        // push engineer id to id array
        idArray.push(eng.id);

        // call function createEmpTeam 
        createEmpTeam();
      });
  }

  function addEmpIntern() {
    inquirer
      .prompt([
        {
          // ask for intern's name
          type: "input",
          name: "intName",
          message: "Please enter Intern's name.",

          // validate name is not empty; return true or if false, return a message
          validate: function (value) {
            if (value === "") {
              return false,
                console.log("Must input Intern's name.");
            }
            else {
              return true;
            }
          }
        },
        {
          // ask for intern's id
          type: "input",
          name: "intId",
          message: "Please enter Intern's ID.",

          // validate id is number and id has not been taken; return true or if false, return a message
          validate: function (value) {
            if (value === "") {
              return false,
                console.log("Must input Intern's id.");
            }
            else {
              return true;
            }
          }
        },
        {
          // ask for intern's email
          type: "input",
          name: "intEmail",
          message: "Please enter Intern's email.",
          // validate email for correct email format; return trur or if false, return a message
          validate: function (value) {
            if (value === "") {
              return false,
                console.log("Must input Intern's email.");
            }
            else {
              return true;
            }
          }
        },
        {
          // ask for intern's school
          type: "input",
          name: "intSchool",
          message: "Please enter Intern's school.",

          // validate school is not empty;  return true or if false, return a message
          validate: function (value) {
            if (value === "") {
              return false,
                console.log("Must input Intern's school.");
            }
            else {
              return true;
            }
          }
        },
      ])
      .then((answers) => {

        // create an intern object and intialize it wirh user's answers; assign it to a constant variable
        var int = new Intern (answers.intName, answers.intId, answers.intEmail, answers.intSchool);

        // push the newly created intern object to [your_team_members]
        teamMembers.push(int);

        // push id to id array
        idArray.push(int.id);

        // call function createEmpTeam
        createEmpTeam();
      });
  }

  function buildEmpTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }

    // call function 'render' passing [your_team_members] array as input argument
    // use the return value from render function as data to fs.writeFileSync function
    render(teamMembers){
      return fs.writeFileSync
    }
  }

  createEmpManager();
}

startApp();

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
