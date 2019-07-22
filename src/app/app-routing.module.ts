import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProyectsComponent} from './components/proyects/proyects.component';
import {RepositoriesComponent} from './components/repositories/repositories.component';
import {FollowersComponent} from './components/followers/followers.component';
import {FollowingComponent} from './components/following/following.component';

const routes: Routes = [
  { path: 'projects', component: ProyectsComponent},
  { path: 'repositories', component: RepositoriesComponent},
  { path: 'followers', component: FollowersComponent},
  { path: 'following', component: FollowingComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'repositories'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
