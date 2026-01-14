const jsonData = "todos.json";
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

createTask("test");
createTask("better test");