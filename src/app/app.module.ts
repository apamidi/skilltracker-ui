import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { DxChartModule, DxButtonModule } from 'devextreme-angular';
//import { ImageUploadModule } from "angular2-image-upload";

import { AppComponent } from './app.component';
import { SkillComponent } from './skill/skill.component';
import { SkillService } from './skill.service';
import { AssociateService } from './associate.service';
import { CreateAssociateComponent } from './create-associate/create-associate.component';
import { ViewDashboardComponent } from './view-dashboard/view-dashboard.component';
import { AssociateSearchPipe } from './associate-search.pipe';
import { ViewAssociateComponent } from './view-associate/view-associate.component';
import { DashboardService } from './dashboard.service';
import { EditAssociateComponent } from './edit-associate/edit-associate.component';
import { EditSkillComponent } from './edit-skill/edit-skill.component';



const routes: Routes = [
  { path: 'addSkill', component: SkillComponent },
  { path: '', component: ViewDashboardComponent },
  { path: 'addAssociate', component: CreateAssociateComponent },
  { path: 'viewAssociate/:aId', component: ViewAssociateComponent },
  { path: 'editAssociate/:aId', component: EditAssociateComponent },
  { path: 'editSkill/:skillId', component: EditSkillComponent }
];

@NgModule({

  exports: [ RouterModule ],

  declarations: [
    AppComponent,
    SkillComponent,
    CreateAssociateComponent,
    ViewDashboardComponent,
    AssociateSearchPipe,
    ViewAssociateComponent,
    ViewAssociateComponent,
    EditAssociateComponent,
    EditSkillComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DxChartModule,
    DxButtonModule,    
    RouterModule.forRoot(routes)
    //ImageUploadModule.forRoot()
  ],
  providers: [SkillService, AssociateService, DashboardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
