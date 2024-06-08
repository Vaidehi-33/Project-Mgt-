import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDirComponent } from './project-dir/project-dir.component';
import { UserDirComponent } from './user-dir/user-dir.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouteGuardService } from 'src/service/route-guard.service';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'landing-page', component: LandingPageComponent },
  // {path:'home',loadChildren: () => import('./project-dir/project-dir.module').then(m => m.ProjectDirModule) },
  {
    path: 'project-dir',
    component: ProjectDirComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'user-dir',
    component: UserDirComponent,
    canActivate: [RouteGuardService],
  },
  // {path:'project-dir/user-dir',component:UserDirComponent},

  {
    path: 'signIn',
    component: SignInComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
