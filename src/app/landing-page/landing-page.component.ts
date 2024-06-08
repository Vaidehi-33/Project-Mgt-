import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, CognitoService } from '../../service/cognito.service';
import { MultiLingualService } from 'src/service/multi-lingual.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  constructor(
    private cognitoService: CognitoService, 
    private router: Router ,
    private multiLingualService: MultiLingualService )
   {
    if(!localStorage.getItem('selectedLanguage'))
    {
    localStorage.setItem('selectedLanguage', 'en');
    }
    const storedLanguage = localStorage.getItem('selectedLanguage');
    console.log(storedLanguage);
    const defaultLanguage = storedLanguage || 'English';
    this. getTranslations(storedLanguage);
    // this.translate.setDefaultLang(defaultLanguage);
    // this.translate.use(defaultLanguage);
  }
  translations : any;
  languages: { code: string, name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'hn', name: 'Hindi' },
    { code: 'mr', name: 'Marathi' }
  ];
  async ngOnInit(): Promise<void> {
    console.log(localStorage.getItem('selectedLanguage'),"language");
    this.multiLingualService.getTranslations(localStorage.getItem('selectedLanguage')).subscribe(translations => {
      this.translations = translations; // Make sure translations are correctly stored here
      console.log(this.translations); // Check if translations are fetched correctly
      // this.multiLingualService.multilingual=this.translations;
    });
    const isAuthenticated: boolean =
      await this.cognitoService.isAuthenticated();

    if (isAuthenticated) 
    {
      this.cognitoService.signOut();
    } 
    else 
    {

    }
  }
  public SignIn()
  {
    this.router.navigate(['/signIn']);
  }
  public SignUp()
  {
    this.router.navigate(['/signUp']);
  }
  getTranslations(language: string | null): void {
    this.multiLingualService.getTranslations(language).subscribe(translations => {
      this.translations = translations; // Make sure translations are correctly stored here
      console.log(this.translations); // Check if translations are fetched correctly
      // this.multiLingualService.multilingual=this.translations;
    });
  }
 
  switchLanguage(language: string): void {
    this.getTranslations(language);
    localStorage.setItem('selectedLanguage', language);
  }
  CurrentLanguage(){
    return localStorage.getItem('selectedLanguage');
  }

}