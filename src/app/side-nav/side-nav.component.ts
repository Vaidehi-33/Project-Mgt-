import { Component } from '@angular/core';
import { navbarData } from './nav-data';
import { ProjectApiService } from '../../service/project-api.service';
import { Router } from '@angular/router';
import { MultiLingualService } from 'src/service/multi-lingual.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {
  navData = navbarData;
 translations: any;
  constructor(public sid: ProjectApiService, private router: Router, private multiLingualService: MultiLingualService) {}
  public Navigation() {
    this.router.navigate(['/landing-page']);
  }

  toggleDarkMode(): void {
    this.sid.toggleDarkMode();
  }
  ngOnInit()
{
console.log(localStorage.getItem('selectedLanguage'),"language");
    this.multiLingualService.getTranslations(localStorage.getItem('selectedLanguage')).subscribe(translations => {
      this.translations = translations; // Make sure translations are correctly stored here
      console.log(this.translations); // Check if translations are fetched correctly
      // this.multiLingualService.multilingual=this.translations;
    });
}
}
