"use strict";
class Project {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importNode = document.importNode(this.templateElement.content, true);
    }
}
const p1 = new Project();
console.log(p1);
