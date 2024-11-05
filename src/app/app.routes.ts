import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NgModule} from "@angular/core";
import {ContentsComponent} from "./contents/contents.component";
import {TeachersComponent} from "./teachers/teachers.component";
import {ProfileComponent} from "./profile/profile.component";
import {CitationsComponent} from "./citations/citations.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contents', component: ContentsComponent },
  { path: 'teachers', component: TeachersComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'citations', component: CitationsComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
