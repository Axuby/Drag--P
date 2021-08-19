
interface Validatable{
  value:string|number;
  required?:boolean
  minLength?: number;
  maxLength?:number;
  min?:number;
  max?:number
}


function validate(validatableInput:Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && 
    validatableInput.value.toString().trim().length !== 0
  }
  if (validatableInput.minLength != null && typeof validatableInput.value === "string") {
    isValid = isValid && validatableInput.value.length > validatableInput.minLength
  
}
  if (validatableInput.maxLength != null && typeof validatableInput.value === "string") {
    isValid = isValid && validatableInput.value.length < validatableInput.maxLength
}
  if (validatableInput.min != null && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value >= validatableInput.min 
}


  if (validatableInput.max != null && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value <= validatableInput.max
}
  return isValid
}





function AutoBind(_:any, _2: string, descriptor:PropertyDescriptor) {
  const boundValue = descriptor.value

  const adjDescriptor: PropertyDescriptor = {
    configurable:true,
    get(){
      let realValue = boundValue.bind(this)
      return realValue;
    }
  } 
  return adjDescriptor;
    
}



//ProjectList Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.getElementById(
      'project-list'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;
    // this.attach();
    // this.renderContent();
  }

//   private renderContent() {
//     const listId = `${this.type}-projects-list`;
//     this.element.querySelector('ul')!.id = listId;
//     this.element.querySelector('h2')!.textContent =
//       this.type.toUpperCase() + ' PROJECTS';
    
//   }

//   private attach() {
//     this.hostElement.insertAdjacentElement('beforeend', this.element);
//   }
}

 
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

         this.element = <HTMLFormElement>importedNode.firstElementChild;
        this.element.id = 'user-input';

        this.titleInputElement = <HTMLInputElement> document.querySelector('#title');
        this.descriptionInputElement = <HTMLInputElement> document.querySelector('#description')
        this.peopleInputElement = <HTMLInputElement> document.querySelector('#people')
        

        this.configure();
        this.attach();
    }

  

    private gatherUserInput(): [string, string,number]|void {
      const titleValue = this.titleInputElement.value;
      const descriptionValue= this.descriptionInputElement.value;
      const peopleValue = this.peopleInputElement.value;


      //used interface instead of class and avoided declaring the new keyword
              const validatableTitle :Validatable = { 
                value:titleValue,
                required:true,
              }
              const validatableDescription:Validatable = {
                value:descriptionValue,
                required:true,
                minLength:5
              }
              const validatablePeople :Validatable = {
                value:+peopleValue,
                required:true,
                    min:1,
                    max:5
              }

      if(!validate(validatableTitle) ||
      !validate(validatableDescription) ||
      !validate(validatablePeople))  {
      alert('Please input a value ')
      } else {
        return [titleValue,descriptionValue, +peopleValue]
      }
    }



        private clearInput(){
          this.descriptionInputElement.value = '';
          this.titleInputElement.value = '';
          this.peopleInputElement.value = '';
        }


     @AutoBind
      submitHandler(event:Event){
            event.preventDefault(); 
           
       const userInput = this.gatherUserInput()
       console.log(userInput)
        if (Array.isArray(userInput)) {
          const [titleValue,descriptionValue, peopleValue] = userInput

          console.log(titleValue,descriptionValue, +peopleValue)
        }
        this.clearInput()
      } 


       configure() {
            this.element.addEventListener('submit',this.submitHandler)
        }
        

       attach(){
            this.hostElement.insertAdjacentElement("afterbegin",this.element)
        }
}


const prjInput = new Project();
// const activePrjList = new ProjectList('active');
// const finishedPrjList = new ProjectList('finished');






