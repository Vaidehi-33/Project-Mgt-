import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectDirComponent } from './project-dir/project-dir.component';
import { UserDirComponent } from './user-dir/user-dir.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { UserCardComponent } from './user-card/user-card.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import {HttpClientModule} from '@angular/common/http';
import { FilterPipe } from './filter.pipe';
import { SearchFilterPipe } from './search-filter.pipe';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TranslateLoader,TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { ObjectToArrayPipe } from './object-to-array.pipe';
import { EmployeeComponent } from './employee/employee.component';


@NgModule({
  declarations: [
    AppComponent,
    ProjectDirComponent,
    UserDirComponent,
    ProjectCardComponent,
    UserCardComponent,
    SideNavComponent,
    FilterPipe,
    SearchFilterPipe,
    LandingPageComponent,
    SignUpComponent,
    SignInComponent,
    ObjectToArrayPipe,
    EmployeeComponent
  
  
  ],
 
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:httpTranslateLoader,
        deps:[HttpClient]
      }
    }),
    
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function httpTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http);
}