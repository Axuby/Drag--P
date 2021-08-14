function AutoBind(target:any, methodName: string, descriptor:PropertyDescriptor) {
  const boundValue = descriptor.value


  const adjDescriptor = {
    enumerable:true,
    configurable:true,
    get(){
      let realValue = boundValue.bind(this)
      return realValue
    }
  } 
  return adjDescriptor
    
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

         this.element = <HTMLFormElement> importedNode.firstElementChild;
        this.element.id = 'user-input';

        this.titleInputElement = <HTMLInputElement> document.querySelector('#title');
        this.descriptionInputElement =<HTMLInputElement> document.querySelector('#description')
        this.peopleInputElement =<HTMLInputElement> document.querySelector('#people')
        

        this.configure()
         this.attach();
    }

  

    private gatherUserInput(): [string, string,number]|void {
      const titleValue = this.titleInputElement.value;
      const descriptionValue= this.descriptionInputElement.value;
      const peopleValue = this.peopleInputElement.value;

      if (titleValue.trim().length === 0 ||
       descriptionValue.trim().length ===0 ||  peopleValue.trim().length ===0) {
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
      private submitHandler(event:Event){
            event.preventDefault(); 
        const userInput = this.gatherUserInput()
        if (Array.isArray(userInput)) {
          const [titleValue,descriptionValue, peopleValue] = userInput

          console.log(titleValue,descriptionValue, +peopleValue)
        }
        
    
      } 

        private configure() {
            this.element.addEventListener('submit',this.submitHandler)
        }

       private attach(){
            this.hostElement.insertAdjacentElement('afterbegin',this.element)
        }
}






