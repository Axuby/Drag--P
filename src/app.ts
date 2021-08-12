






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
        this.descriptionInputElement =<HTMLInputElement> document.querySelector('#description')
        this.peopleInputElement =<HTMLInputElement> document.querySelector('#people')
        

        this.configure()
         this.attach();
    }



  
      private submitHandler(event:Event){
        event.preventDefault(); 

      } 

        private configure() {
            this.element.addEventListener('submit',this.submitHandler.bind(this))
        }

       private attach(){
            this.hostElement.insertAdjacentElement('afterbegin',this.element)
        }
}



const p1 = new Project();
console.log(p1);


