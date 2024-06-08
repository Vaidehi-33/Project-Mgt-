import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, CognitoService } from '../../service/cognito.service';
import { MultiLingualService } from 'src/service/multi-lingual.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  loading: boolean;
  isConfirm: boolean;
  user: IUser;
  translations : any;
  constructor(private router: Router, private cognitoService: CognitoService,private multiLingualService : MultiLingualService) {
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
  }

  public signUp(): void {
    this.loading = true;
    this.cognitoService
      .signUp(this.user)
      .then(() => {
        this.loading = false;
        this.isConfirm = true;
      })
      .catch(() => {
        this.loading = false;
      });
  }

  public confirmSignUp(): void {
    this.loading = true;
    this.cognitoService
      .confirmSignUp(this.user)
      .then(() => {
        this.router.navigate(['/landing-page']);
      })
      .catch(() => {
        this.loading = false;
      });
  }
  ngOnInit(){
    console.log(localStorage.getItem('selectedLanguage'),"language");
    this.multiLingualService.getTranslations(localStorage.getItem('selectedLanguage')).subscribe(translations => {
      this.translations = translations; // Make sure translations are correctly stored here
      console.log(this.translations); // Check if translations are fetched correctly
      // this.multiLingualService.multilingual=this.translations;
    });
  }
  DoSignIn(){
    this.router.navigate(['/signIn'])
  }
}
