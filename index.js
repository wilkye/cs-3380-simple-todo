import inquirer from 'inquirer';

const fs = require('fs');
const { default: inquirer } = require('inquirer');
const path = require('path');

const jsonPath = "todos.json";
let tasks = [];

function Task(text) {
    this.text = text;
    this.completed = false;
}

function createTask(text) {
    const task = new Task(text);
    tasks.push(task);
    console.log("Task Created.");
    console.log(tasks);
    // Add support for multiple tasks to be created at once
}

let removeTask = (index) => {
    const removedElement = tasks.splice(index - 1, 1);
    console.log(`Successfully removed ${removedElement.text}`);
    // Call main loop
}

let updateTask = (index) => {
    tasks[index - 1].completed = !tasks[index].completed;
    console.log(`Updated completion status of task ${index}`)
    // Call main loop
}

let saveToJSON = () => {
    const filePath = path.join(__dirname, jsonPath);
    jsonData = JSON.stringify(tasks, null, 2);

    fs.writeFile(filePath, jsonData, 'utf-8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log("File written successfully.");
    })
};

let readAndStore = () => {
    const filePath = path.join(__dirname, jsonPath);

    try {
        const jsonData = fs.readFileSync(filePath, 'utf-8');

        const dataArray = JSON.parse(jsonData);
        return dataArray;
    } catch (error) {
        fs.promises.readFile(filePath, { encoding: 'utf-8' })
            .then(() => console.log('File exists but there was an error reading or parsing:', error))
            .catch(() => console.log('No save found...'));
    }
}

let displayTasks = () => {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed === true) {
            console.log(`${i + 1}. [X] ${tasks[i].text}`);
        } else {
            console.log(`${i + 1}. [ ] ${tasks[i].text}`);
        }
    }
}

let mainLoop = () => {
    const outputArray = ["\nWould you like to:",
        "(a) View To Do List",
        "(b) Add items to list",
        "(c) Check off an item",
        "(d) Remove an item",
        "(e) Quit",
        "Enter a, b, c or d to continue:\n"]

    for (let i = 0; i < outputArray.length; i++) {
        console.log(`${outputArray[i]}`);
    }
}

// createTask("test");
// createTask("better test");
tasks = readAndStore();
mainLoop();
// displayTasks();
// saveToJSON();