import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectApiService } from '../../service/project-api.service';
import Swal from 'sweetalert2';
import { SearchFilterPipe } from '../search-filter.pipe';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { OrderModule } from 'ngx-order-pipe';
import { MultiLingualService } from '../../service/multi-lingual.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css'],
})
export class ProjectCardComponent {
  projectStatus: string = '';
  translations: any;
  // selectedLanguage: string = 'hn';
  // languages: { code: string, name: string }[] = [
  //   { code: 'en', name: 'English' },
  //   { code: 'hn', name: 'Hindi' },
  //   { code: 'mr', name: 'Marathi' }
  // ];

  // @ViewChild('#projectForm') form: NgForm;
  @Input()
  projectArr: any = {};

  accordions = [
    {
      question: 'Lorem ipsum dolor sit amet consectetur.',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione modi incidunt doloremque eius recusandae quibusdam nihil beatae laudantium nesciunt praesentium?',
      active: false,
    },
  ];
  style: any;
  router: any;
  page: number = 1;

  toggleAccordion(accordion: any): void {
    accordion.active = !accordion.active;
  }

  // activeProject: any;

  // // Toggle accordion function
  // toggleAccordion(project: any): void {
  //   this.activeProject = this.activeProject === project ? null : project;
  // }

  @Input()
  accordionItems: any[] = [];

  constructor(
    private user: ProjectApiService,
    public translate: TranslateService,
    private multiLingualService: MultiLingualService,

  ) {
    // translate.addLangs(['en', 'hn', 'es', 'mr', 'fr']);
    // translate.setDefaultLang('en');
  }
  switchLang(lang: string) {
    this.translate.use(lang);
  }

  // goToPage(pageName: string, recipeId: string): void {
  //   this.router.navigate([`${pageName}`, `${recipeId}`]);
  // }

  deleteItem(id: any) {
    // this.user.getProjectbyID(id).then((response: any) => {
    //   console.log('API Response:', response);

    //   // this.recipe = response['Items']['Item'];

    //   // // Convert ingredients and method to arrays
    //   // this.recipe.recipeIngridents = this.convertToArray(
    //   //   this.recipe.recipeIngridents
    //   // );
    //   // this.recipe.recipeMethod = this.convertToArray(this.recipe.recipeMethod);
    // });
    // if(confirm("Are you sure to Delete ?")){
    //   this.user.deleteUser(id).subscribe((result)=>{

    //     console.log(id);
    //   })
    //   // this.projectArr.splice(0,1);
    //   delete this.projectArr.pid;
    //   alert("Deleted");
    // }
    // console.log(id);

    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this project?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.user
          .deleteProject(id)
          .then((response) => {
            console.log('Project deleted successfully');
            Swal.fire('Success!', 'Project deleted successfully!', 'success');
            this.childMethod();
            // this.updateProjectArr(id);
          })
          .catch((e) => {
            console.error('Error deleting Project', e);
            Swal.fire('Error', 'Failed to delete the Project', 'error');
          });
      }
    });
  }

  // onEditClicked(pid : string){
  //   let currentProject = this.projectArr.find((p: { pid: string; })=> {return p.pid ===pid})
  //   console.log(currentProject);

  //   // this.form.setValue({
  //   //   pname:currentProject.pname,
  //   // });
  // }

  selectedItem: any = null;

  viewItem(project: any) {
    console.log(project.id);
    this.selectedItem =
      this.selectedItem === project.projectDetails
        ? null
        : project.projectDetails;
    if (this.selectedItem) {
      // this.selectedItem.style.display = "block";
    }
  }
  id: string = '';
  uname: string = '';
  stdate: string = '';
  endate: string = '';
  des: string = '';
  newSelectArr: any = {};
  sel: string = '';

  updateItem(project: any) {
    this.id = project.id;
    this.uname = project.projectDetails.pname;
    this.stdate = project.projectDetails.pstartDate;
    this.endate = project.projectDetails.pendDate;
    this.des = project.projectDetails.pdescription;
    this.newSelectArr = project.projectDetails.selectUsers;
    this.sel = project.projectDetails.selectedStatus;
    const myFormElement = document.getElementById('pform');
    if (myFormElement) {
      myFormElement.style.display = 'block';
    }
  }
  closeform() {
    const myFormElement = document.getElementById('pform');
    if (myFormElement) {
      myFormElement.style.display = 'none';
    }
  }
  closeDetails() {
    this.selectedItem = null;
  }

  // viewItem(){
  //   const myFormElement = document.getElementById('ans');
  // if (myFormElement) {
  //   myFormElement.style.display = 'block';
  // }
  // }

  // closeDetails(){
  //   const myFormElement = document.getElementById('ans');
  // if (myFormElement) {
  //   myFormElement.style.display = 'none';
  // }
  // }

  // private updateProjectArr(deletedProjectId: any) {

  //   const deletedIndex = this.projectArr.findIndex((project: any) => project.id === deletedProjectId);

  //   if (deletedIndex !== -1) {
  //     this.projectArr.splice(deletedIndex, 1);
  //   }
  // }

  @Input()
  searchText: string = '';

  status: string = 'Pending';

  updateStatus(newStatus: string) {
    this.status = newStatus;
  }
  @Output() testEvent = new EventEmitter();

  childMethod() {
    this.testEvent.emit();
  }

  accordionItem: any[] = [];

  addItemToAccordion(option: any) {
    this.newSelectArr.push(option);
    const indexToRemove = this.unameArray.indexOf(option);
    if (indexToRemove !== -1) {
      this.unameArray.splice(indexToRemove, 1);
    }
    const myFormElement = document.getElementById('select');
    if (myFormElement) {
      myFormElement.style.display = 'block';
    }
  }
  selectUserArr: any = {};
  unameArray: string[] = [];

  error = null;
  ngOnInit() {
    this.retrieveProjects();
    // // this.getTranslations(this.selectedLanguage);
    // this.translations= this.multiLingualService.multilingual;
    // console.log("vajidA",this.translations);
    console.log(localStorage.getItem('selectedLanguage'),"language");
    this.multiLingualService.getTranslations(localStorage.getItem('selectedLanguage')).subscribe(translations => {
      this.translations = translations; // Make sure translations are correctly stored here
      console.log(this.translations); // Check if translations are fetched correctly
      // this.multiLingualService.multilingual=this.translations;
    });
 
  }
 

  retrieveProjects() {
    this.user.getProjectData().then(
      (details: any) => {
        this.projectArr = details.Items;

        console.log(details);
        console.log('array is', this.projectArr);
      },
      (error: { message: null }) => {
        console.log(error);
        this.error = error.message;
      }
    );

    this.user
      .getUserData()
      .then((details: any) => {
        this.selectUserArr = details.Items;
        this.unameArray = this.selectUserArr.map(
          (user: { userDetails: { uname: string } }) => user.userDetails.uname
        );

        console.log(details);
        // console.log("user array is",unameArray);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  saveProjectFormData(details: any) {
    console.log('details is', details);
    let body = {
      id: details.id,
      projectDetails: {
        pname: details.name,
        pdescription: details.description,
        pstartDate: details.stdate,
        pendDate: details.endate,
        selectUsers: this.newSelectArr,
        selectedStatus: this.selectedStatus,
      },
    };
    this.user.saveproject(body).then((result) => {
      console.log('res is', result);
      this.retrieveProjects();
    });

    this.closeform();
    this.accordionItems = [];
    // const myFormElement = document.getElementById('select');
    // if (myFormElement) {
    //   myFormElement.style.display = 'none';
    // }
  }

  deleteUser(item: any) {
    const indexToRemove = this.newSelectArr.indexOf(item);
    if (indexToRemove !== -1) {
      this.newSelectArr.splice(indexToRemove, 1);
    }
  }

  selectedStatus: string = '';
  handleRadioChange(status: string) {
    this.selectedStatus = status;
  }

  key: string = 'pstartDate';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
  // defaultStatus = 'Pending'
  // statusArr=[
  //   {"id":'1',"value":'Completed'},
  //   {"id":'2',"value":'Pending'}
  // ]
  getTranslations(language: string): void {
    this.multiLingualService.getTranslations(language).subscribe(translations => {
      this.translations = translations; // Make sure translations are correctly stored here
      console.log(this.translations); // Check if translations are fetched correctly
    });
  }
 
  switchLanguage(language: string): void {
    this.getTranslations(language);
  }
}
