import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CognitoService } from './cognito.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectApiService {
  isDarkMode: boolean = false;

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  getProjectURL =
    'https://9tufi5js1k.execute-api.ca-central-1.amazonaws.com/projectDir';  
  delteProjectURL =
    'https://9tufi5js1k.execute-api.ca-central-1.amazonaws.com/projectDir';
  saveProjectURL =
    'https://9tufi5js1k.execute-api.ca-central-1.amazonaws.com/projectDir';
  updateProjectURL =
    'https://9tufi5js1k.execute-api.ca-central-1.amazonaws.com/projectDir';

  getUsersURL =
    'https://9tufi5js1k.execute-api.ca-central-1.amazonaws.com/userDir';  
  deleteUserURL = 
    'https://9tufi5js1k.execute-api.ca-central-1.amazonaws.com/userDir';
  saveUserURL =
    'https://9tufi5js1k.execute-api.ca-central-1.amazonaws.com/userDir';
  updateUserURL =
    'https://9tufi5js1k.execute-api.ca-central-1.amazonaws.com/userDir';

  idUrl =
    'https://3q7gy5e75i.execute-api.ca-central-1.amazonaws.com/newdev/newuser';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cognitoService: CognitoService
  ) {}

  saveProjectData(body: any): Promise<any> {
    return this.cognitoService.getJwt().then((token: any) => {
      const header = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      });

      return this.http
        .post<any>(this.saveProjectURL, body, { headers: header })
        .toPromise();
    });
  }

  getProjectData(): Promise<any> {
    return this.cognitoService.getJwt().then((token: any) => {
      const header = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      });

      return this.http
        .get<any>(this.getProjectURL, { headers: header })
        .toPromise();
    });
  }

  getUserData(): Promise<any> {
    return this.cognitoService.getJwt().then((token: any) => {
      const header = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      });

      return this.http
        .get<any>(this.getUsersURL, { headers: header })
        .toPromise();
    });
  }

  // updateProjectData(){
  //   let url4 = 'https://erhtgn40k9.execute-api.ca-central-1.amazonaws.com/newdev/newproject'
  //   return this.http.put(url4);
  // }

  saveUserData(body: any): Promise<any> {
    return this.cognitoService.getJwt().then((token: any) => {
      const header = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      });

      return this.http
        .post<any>(this.saveUserURL, body, { headers: header })
        .toPromise();
    });
  }
  deleteProject(id: any): Promise<any> {
    const requestBody = { id: id };
    return this.cognitoService.getJwt().then((token: any) => {
      const header = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      });

      return this.http
        .request<any>('delete', this.delteProjectURL, {
          body: requestBody,
          headers: header,
        })
        .toPromise();
    });
  }
  deleteUser(id: any): Promise<any> {
    const requestBody = { id: id };
    return this.cognitoService.getJwt().then((token: any) => {
      const header = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      });

      return this.http
        .request('delete', this.deleteUserURL, {
          body: requestBody,
          headers: header,
        })
        .toPromise();
    });
  }

  navigateOnSuccess(): void {
    // You can modify the route or navigate to a different component
    // this.router.navigate(['/user-dir']);
  }

  saveproject(body: any): Promise<any> {
    return this.cognitoService.getJwt().then((token: any) => {
      const header = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      });

      return this.http
        .put<any>(this.saveProjectURL, body, { headers: header })
        .toPromise();
    });
  }
  saveuser(body: any): Promise<any> {
    return this.cognitoService.getJwt().then((token: any) => {
      const header = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      });

      return this.http
        .put<any>(this.saveUserURL, body, { headers: header })
        .toPromise();
    });
  }

  getProjectbyID(id: string): Promise<any> {
    return this.http.get<any>(`${this.idUrl}/${id}`).toPromise();
  }
}
