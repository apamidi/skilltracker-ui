import { Component, OnInit } from '@angular/core';
import { Skill } from '../skill';
import { SkillService } from '../skill.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { AssociateSkill } from '../associate-skill';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  skill : Skill;
  skillArr : Skill[];
  skillService : SkillService;
  message : string;
  errMsg : string;
  errFlag : boolean;
  skillExist : boolean;
  canDelete : boolean;
  dashboardService : DashboardService;
  associateSkillArr : AssociateSkill[];

  constructor(skillService : SkillService, dashboardService : DashboardService, route : ActivatedRoute, private router: Router) { 
    this.skillService = skillService;
    this.dashboardService = dashboardService;
    this.skill = new Skill();
    this.message = '';
    this.errMsg = '';
    this.errFlag = false;
    this.skillExist = false;
    this.associateSkillArr = new Array();

  }

  ngOnInit() {
    this.message = '';
    this.errMsg = '';
    this.skillService.getSkillList().subscribe(data => {
      this.skillArr = data;
            
    }, err => {alert('Service temporarily unavailable')});
  }

  addSkill(){
    
    this.message = '';
    this.errMsg = '';

    if(this.skill.skillName != null && this.skill.skillName != ''){

      this.skillExist = this.skillArr.some(x => x.skillName === this.skill.skillName);
      if(this.skillExist){
        this.errMsg = 'Skill already exists. Please add new skill';
        this.errFlag = true;
      }else{
        this.errFlag = false;
      }
      
    }else{
      this.errMsg = 'Please enter Skill';
      this.errFlag = true;
    }
    
    
    if(!this.errFlag){
      
      this.skillService.addSkill(this.skill).subscribe(isSaved =>{
        if(isSaved){
          //this.message = 'Skill added';
          alert('Skill added');
          
        }else{
          this.errMsg = 'Failed to add skill. Please try again';
        }
      }, err => {alert(err + 'Save Service temporarily unavailable')});
      this.skill = new Skill();
    }
    window.location.reload();   
  }

  
  deleteSkill(skill : Skill){
    
    alert("delete skill :: " + skill.skillId);

    if(skill != null){
      this.dashboardService.getAssociateSkillsById(skill.skillId).subscribe(
        data =>{
          this.associateSkillArr = data;

          if(this.associateSkillArr != null && this.associateSkillArr.length > 0){
            this.errMsg = 'Cannot remove this skill. There are associates with this skill.';
          }else{
            var index = this.skillArr.indexOf(skill);
            this.skillArr.splice(index, 1);

            this.skillService.deleteSkill(skill).subscribe(isDeleted =>{
              alert('delete response :: ' + isDeleted);
              if(isDeleted){
                this.message = 'Skill removed';
              }else{
                this.errMsg = 'Failed to remove skill. Please try again';
              }
            }, err => {
              alert(err + 'Delete Service temporarily unavailable');
              this.skillArr.splice(index, 0, skill);
            });
          }
        }
      );
    }
 
  }
   

  editSkill(skill : Skill){
    if(skill != null){
      this.router.navigateByUrl('editSkill/' + skill.skillId);
    }
    
  }

}
