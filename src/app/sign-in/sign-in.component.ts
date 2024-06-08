import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, CognitoService } from '../../service/cognito.service';
import { MultiLingualService } from 'src/service/multi-lingual.service';

@Component({
  // standalone:true,
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  loading: boolean;
  user: IUser;
  translations : any;  resettingPassword: boolean;
  newPassword: string;

  constructor(private router: Router, private cognitoService: CognitoService,private multiLingualService : MultiLingualService) {
    this.loading = false;
    this.user = {} as IUser;
    this.resettingPassword = false;
    this.newPassword = '';
  }

  public signIn(): void {
    console.log('Sign-in button clicked.');

    this.loading = true;
    this.cognitoService
      .signIn(this.user)
      .then(() => {
        console.log('Sign-in successful. Navigating to /project-dir.');
        this.router.navigate(['/project-dir']);
      })
      .catch((error) => {
        console.error('Sign-in error:', error);
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
  DoSignup(){
    this.router.navigate(['/signUp'])
  }
  
  newPasswordSumbit() {
    if (this.user && this.user.email && this.newPassword.trim().length != 0) {
      this.cognitoService
        .confirmResetPassword(this.user, this.newPassword.trim())
        .then(() => {
          console.log('Password Updated');
          this.resettingPassword = false;
          this.router.navigate(['/login']);
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      console.log('Please Enter valid input code');
    }
  }

  Onforget(){
    if (this.user && this.user.email) {
      this.cognitoService
        .resetPassword(this.user)
        .then(() => {
          this.resettingPassword = true;
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      console.log('Please Enter a valid email address.');
    }
  }
}
