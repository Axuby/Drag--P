"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid &&
            validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === "string") {
        isValid = isValid && validatableInput.value.length > validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === "string") {
        isValid = isValid && validatableInput.value.length < validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
function AutoBind(_, _2, descriptor) {
    const boundValue = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            let realValue = boundValue.bind(this);
            return realValue;
        }
    };
    return adjDescriptor;
}
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateElement = document.getElementById('project-list');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
    }
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
        const validatableTitle = {
            value: titleValue,
            required: true,
        };
        const validatableDescription = {
            value: descriptionValue,
            required: true,
            minLength: 5
        };
        const validatablePeople = {
            value: +peopleValue,
            required: true,
            min: 1,
            max: 5
        };
        if (!validate(validatableTitle) ||
            !validate(validatableDescription) ||
            !validate(validatablePeople)) {
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
        console.log(userInput);
        if (Array.isArray(userInput)) {
            const [titleValue, descriptionValue, peopleValue] = userInput;
            console.log(titleValue, descriptionValue, +peopleValue);
        }
        this.clearInput();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
__decorate([
    AutoBind
], Project.prototype, "submitHandler", null);
const prjInput = new Project();
