import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectApiService } from '../../service/project-api.service';
import { MultiLingualService } from '../../service/multi-lingual.service';
import { HttpClient } from '@angular/common/http';
// import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-project-dir',
  templateUrl: './project-dir.component.html',
  styleUrls: ['./project-dir.component.css'],
})
export class ProjectDirComponent {
  accordionItems: any[] = [];
  translations: any;
  selectedLanguage: string = 'en';
  languages: { code: string, name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'hn', name: 'Hindi' },
    { code: 'mr', name: 'Marathi' }
  ];

 
  addItemToAccordion(option: any) {
    this.accordionItems.push(option);
    const indexToRemove = this.unameArray.indexOf(option);
    if (indexToRemove !== -1) {
      this.unameArray.splice(indexToRemove, 1);
    }
    const myFormElement = document.getElementById('select');
    if (myFormElement) {
      myFormElement.style.display = 'block';
    }
  }

  projectform = new FormGroup({
    // pid:new FormControl('',Validators.required),
    pname: new FormControl('', Validators.required),
    pstartDate: new FormControl('', Validators.required),
    pendDate: new FormControl('', Validators.required),
    pdescription: new FormControl('', Validators.required),
  });
  title = 'user';
  selectedValue: string = '';
  dropdownOpen: boolean = false;
  // pid:number=1;
  pname: string = '';
  pstartDate: string = '';
  pendDate: string = '';
  pdescription: string = '';
  issubmitted: boolean = false;
  projectinfo: any[] = [];
  
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  onsubmit() {
    this.issubmitted = true;
    this.projectinfo.push({
      name: this.pname,
      startDate: this.pstartDate,
      endDate: this.pendDate,
      description: this.pdescription,
    });
    this.issubmitted = true;
  }

  openform() {
    const myFormElement = document.getElementById('myform');
    if (myFormElement) {
      myFormElement.style.display = 'block';
    }
  }
  closeform() {
    const myFormElement = document.getElementById('myform');
    if (myFormElement) {
      myFormElement.style.display = 'none';
    }
  }
  close() {
    const myFormElement = document.getElementById('myform');
    if (myFormElement) {
      myFormElement.style.display = 'none';
    }
  }

  searchText: string = '';
  setSearch(inputel: HTMLInputElement) {
    this.searchText = inputel.value;
  }

  error = null;
  projectArr: any[] = [];
  selectUserArr: any = {};
  unameArray: string[] = [];

  constructor(
    private proj: ProjectApiService,
    private multiLingualService: MultiLingualService,
    private http :HttpClient,
    // private translate: TranslateService
  ) {}

  ngOnInit() {
    this.retrieveProjects();
    // this.fetchTranslations('en');
    // this.fetchTranslations(this.selectedLanguage);
    // this.getTranslations(this.selectedLanguage);
    // this.translations= this.multiLingualService.multilingual;
    // console.log("vajidA",this.translations);
    // this.translations=this.multiLingualService.getTranslations(localStorage.getItem('selectedLanguage'));
    // console.log("vajidA",this.translations);
    console.log(localStorage.getItem('selectedLanguage'),"language");
    this.multiLingualService.getTranslations(localStorage.getItem('selectedLanguage')).subscribe(translations => {
      this.translations = translations; // Make sure translations are correctly stored here
      console.log(this.translations); // Check if translations are fetched correctly
      // this.multiLingualService.multilingual=this.translations;
    });
  }

  retrieveProjects() {
    this.proj
      .getProjectData()
      .then((details: any) => {
        console.log('array is', details);
        this.projectArr = details.Items;
        console.log(details);
      })
      .catch((e) => {
        console.log('Error while getting the projects data');
      });

    this.proj
      .getUserData()
      .then((details: any) => {
        this.selectUserArr = details.Items;
        this.unameArray = this.selectUserArr.map(
          (user: { userDetails: { uname: string } }) => user.userDetails.uname
        );

        console.log(details);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  saveProjectFormData(details: any) {
    let body = {
      projectDetails: {
        pname: details.pname,
        pdescription: details.pdescription,
        pstartDate: details.pstartDate,
        pendDate: details.pendDate,
        selectUsers: this.accordionItems,
        selectedStatus: this.selectedStatus,
      },
    };
    this.proj.saveProjectData(body).then((result) => {
      console.log('res is', result);
      this.retrieveProjects();
    });
    this.close();
    this.projectform.reset();
    this.accordionItems = [];
    const myFormElement = document.getElementById('select');
    if (myFormElement) {
      myFormElement.style.display = 'none';
    }
  }
  selectedStatus: string = 'Pending';

  handleRadioChange(status: string) {
    this.selectedStatus = status;
    console.log(this.selectedStatus);
  }

 
  getTranslations(language: string): void {
    this.multiLingualService.getTranslations(language).subscribe(translations => {
      this.translations = translations; // Make sure translations are correctly stored here
      console.log(this.translations); // Check if translations are fetched correctly
      // this.multiLingualService.multilingual=this.translations;
    });
  }
 
  switchLanguage(language: string): void {
    this.getTranslations(language);
  }

}
