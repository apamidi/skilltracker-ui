import { Component, OnInit } from '@angular/core';
import { Skill } from '../skill';
import { SkillService } from '../skill.service';
import { ActivatedRoute, Router, Route } from '@angular/router';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrls: ['./edit-skill.component.css']
})
export class EditSkillComponent implements OnInit {

  skill : Skill;
  skillService : SkillService;
  message : string;
  errMsg : string;
  errFlag : boolean;
  skillExist : boolean;
  route : ActivatedRoute;
  skillId : number;
  skillArr : Skill[];

  constructor(route : ActivatedRoute, skillService : SkillService, private router: Router) { 
    this.route = route;
    this.skillService = skillService;
    this.skill = new Skill();
    this.message = '';
    this.errMsg = '';
    this.errFlag = false;
    this.skillExist = false;
  }

  ngOnInit() {

    this.message = '';
    this.errMsg = '';

    this.route.params.subscribe(params => {
      this.skillId = params['skillId'];

      this.skillService.getSkill(this.skillId).subscribe(data => {
        this.skill = data;
              
      }, err => {alert('Service temporarily unavailable')});
      
    });    
  }

  updateSkill(skill : Skill){

    if(skill != null){
      if(skill.skillName != null && skill.skillName != ''){
        this.skillService.getSkillList().subscribe(data => {
          this.skillArr = data;
    
          this.skillExist = this.skillArr.some(x => x.skillName === this.skill.skillName);
          if(this.skillExist){
            this.errMsg = 'Skill already exists. Please add new skill';
            this.errFlag = true;
          }else{
            this.errFlag = false;
    
            this.skillService.updateSkill(this.skill).subscribe(isSaved =>{
              if(isSaved){
                alert('Skill name updated');
                this.router.navigateByUrl('editSkill/' + this.skill.skillId);
              }else{
                this.errMsg = 'Failed to edit skill. Please try again';
              }
            }, err => {alert(err + 'Save Service temporarily unavailable')});
            //this.associate = new Associate();
            //this.associate.associateSkills = [];
            window.location.reload();  
          }
                
        }, err => {alert('Service temporarily unavailable')});
      }else{
        this.errMsg = 'Please enter skill name';
      }
    }

  }

  cancel(){
    window.location.reload();
  }


}
