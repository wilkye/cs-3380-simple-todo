const fs = require('fs');
const path = require('path');

const jsonPath = "todos.json";
let tasks = [];

function Task(text) {
    this.text = text;
    this.completed = false;
}

function createTask(text) {
    const task1 = new Task(text);
    tasks.push(task1);
    console.log("Task Created.");
    console.log(tasks);
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

// createTask("test");
// createTask("better test");
tasks = readAndStore();
console.log(tasks);
// saveToJSON();