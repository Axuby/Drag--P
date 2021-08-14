"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function AutoBind(target, methodName, descriptor) {
    const boundValue = descriptor.value;
    const adjDescriptor = {
        enumerable: true,
        configurable: true,
        get() {
            let realValue = boundValue.bind(this);
            return realValue;
        }
    };
    return adjDescriptor;
}
class Project {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputElement = document.querySelector('#title');
        this.descriptionInputElement = document.querySelector('#description');
        this.peopleInputElement = document.querySelector('#people');
        this.configure();
        this.attach();
    }
    gatherUserInput() {
        const titleValue = this.titleInputElement.value;
        const descriptionValue = this.descriptionInputElement.value;
        const peopleValue = this.peopleInputElement.value;
        if (titleValue.trim().length === 0 ||
            descriptionValue.trim().length === 0 || peopleValue.trim().length === 0) {
            alert('Please input a value ');
        }
        else {
            return [titleValue, descriptionValue, +peopleValue];
        }
    }
    clearInput() {
        this.descriptionInputElement.value = '';
        this.titleInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [titleValue, descriptionValue, peopleValue] = userInput;
            console.log(titleValue, descriptionValue, +peopleValue);
        }
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
__decorate([
    AutoBind
], Project.prototype, "submitHandler", null);
