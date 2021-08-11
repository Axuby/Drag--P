class Project {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement : HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement

 

    constructor() {
        this.templateElement = <HTMLTemplateElement> document.getElementById('project-input')!;
        this.hostElement =  <HTMLDivElement> document.getElementById('app')!;

    
         const importedNode = document.importNode(this.templateElement.content,true)
         this.element = <HTMLFormElement> importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputElement = <HTMLInputElement> document.querySelector('#title');
       
         this.attach();
    }


        attach(){
            this.hostElement.insertAdjacentElement('afterbegin',this.element)
        }
}



const p1 = new Project();
console.log(p1);


