import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RepoViewComponent } from './repo-view/repo-view.component';
import { EntViewComponent } from './ent-view/ent-view.component';
import { OrgViewComponent } from './org-view/org-view.component';
import { SettingsComponent } from './settings/settings.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';

const routes: Routes = [
  {path: 'repository', component: RepoViewComponent},
  {path: 'enterprise', component: EntViewComponent},
  {path: 'organisation', component: OrgViewComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'dashboard', component: MainDashboardComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }