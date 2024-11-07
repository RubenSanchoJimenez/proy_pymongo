import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NgModule} from "@angular/core";
import { CreateComponent } from './crud/create/create.component';
import { ReadComponent } from './crud/read/read.component';
import { AboutThatComponent } from './about-that/about-that.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'creator', component: CreateComponent},
  { path: 'searcher', component: ReadComponent},
  { path: 'about-that', component: AboutThatComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
