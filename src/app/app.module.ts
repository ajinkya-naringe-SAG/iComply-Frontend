import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RepoViewComponent } from './repo-view/repo-view.component';
import { AppRoutingModule } from './app-routing.module';
import { EntViewComponent } from './ent-view/ent-view.component';
import { OrgViewComponent } from './org-view/org-view.component';
import { SettingsComponent } from './settings/settings.component';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { HttpClientModule } from '@angular/common/http'; '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    RepoViewComponent,
    EntViewComponent,
    OrgViewComponent,
    SettingsComponent,
    MainDashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule,
    AppRoutingModule,
    MatTabsModule,
    MatListModule,
    HttpClientModule,
    MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
