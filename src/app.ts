class Project {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;

    constructor() {
        this.templateElement = <HTMLTemplateElement> document.getElementById('project-input')!;
        this.hostElement =  <HTMLDivElement> document.getElementById('app')!;
         const importNode = document.importNode(this.templateElement.content,true)
    }
   
}



const p1 = new Project();
console.log(p1);

