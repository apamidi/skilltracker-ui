import { Component, OnInit } from '@angular/core';
import { AssociateService } from '../associate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Associate } from '../associate';
import { AssociateSkill } from '../associate-skill';

@Component({
  selector: 'app-view-associate',
  templateUrl: './view-associate.component.html',
  styleUrls: ['./view-associate.component.css']
})
export class ViewAssociateComponent implements OnInit {

  route : ActivatedRoute;
  associateService : AssociateService;
  aId : number;
  associate : Associate;
  aSkillArr : AssociateSkill[];

  constructor(route : ActivatedRoute, associateService : AssociateService, private router: Router) {
    this.route = route;
    this.associateService = associateService;
    this.associate = new Associate();
    this.aSkillArr = new Array();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      
      this.aId = params['aId'];
         
      this.associateService.getAssociate(this.aId).subscribe(data => {
        this.associate = data;
        console.log('Inside view associate :: ' + this.associate.associateName);
        console.log('Inside view associate ID :: ' + this.associate.associateId);
        if(data != null){
          this.aSkillArr = this.associate.associateSkills;
        }
                               
      }, err => {alert('Service temporarily unavailable')});
    });
  }

}
