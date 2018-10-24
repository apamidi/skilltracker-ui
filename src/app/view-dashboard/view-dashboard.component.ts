import { Component, OnInit } from '@angular/core';
import { AssociateService } from '../associate.service';
import { Associate } from '../associate';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { AssociateSkill } from '../associate-skill';
import { AssociateSkillSummary } from '../associate-skill-summary';
import { DashboardSummary } from '../dashboard-summary';

@Component({
  selector: 'app-view-dashboard',
  templateUrl: './view-dashboard.component.html',
  styleUrls: ['./view-dashboard.component.css']
})
export class ViewDashboardComponent implements OnInit {

  associateService : AssociateService;
  dashboardService : DashboardService;
  associateArr : Associate[];
  asSummaryArr : AssociateSkillSummary[];
  assocNm : string;
  assocEmail : string;
  assocId : number;
  assocMob : number;
  assocStr : string;
  message : string;
  errMsg : string;
  assocCount : number = 0;
  dashboardSummary : DashboardSummary;
  malePercentage : number;
  femalePercentage : number;
  levelOnePercentage : number;
  levelTwoPercentage : number;
  levelThreePercentage : number;

  constructor(associateService : AssociateService, dashboardService : DashboardService, private router: Router) { 
    this.associateService = associateService;
    this.dashboardService = dashboardService;
    this.dashboardSummary = new DashboardSummary();
  }

  ngOnInit() {
    this.associateService.getAssociateList().subscribe(data => {
      this.associateArr = data;
      if(this.associateArr != null){
        this.assocCount = this.associateArr.length;
      }
            
    }, err => {alert('Service temporarily unavailable')});

    this.dashboardService.getAssociateSkillList().subscribe(data => {
      this.asSummaryArr = data;
            
    }, err => {alert('Dashboard Service temporarily unavailable')});

    this.associateService.getDashboardSummary().subscribe(data => {
      this.dashboardSummary = data;
                  
    }, err => {alert('Dashboard Service temporarily unavailable')});
  }

  viewAssociate(aId : number){
    console.log('View Associate :: ' + aId);
    if(aId != 0){
      this.router.navigateByUrl('viewAssociate/' + aId);
    }
  }

  editAssociate(aId : number){
    console.log('Edit Associate :: ' + aId);
    if(aId != 0){     
      this.router.navigateByUrl('editAssociate/' + aId);
    }
  }

  deleteAssociate(associate : Associate){
    console.log("delete associate :: " + associate.associateId);

    var index = this.associateArr.indexOf(associate);
    console.log('index :: ' + index);
    this.associateArr.splice(index, 1);

    this.associateService.deleteAssociate(associate).subscribe(isDeleted =>{
      console.log('delete response :: ' + isDeleted);
      if(isDeleted){
        this.message = 'Associate deleted';
        
      }else{
        this.errMsg = 'Failed to delete associate. Please try again';
      }
    }, err => {
      alert(err + 'Delete Service temporarily unavailable');
      this.associateArr.splice(index, 0, associate);
    });
    window.location.reload(); 
  }

}
