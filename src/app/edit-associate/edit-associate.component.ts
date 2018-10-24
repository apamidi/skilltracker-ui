import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule }    from '@angular/forms';
import { AssociateService } from '../associate.service';
import { Associate } from '../associate';
import { AssociateSkill } from '../associate-skill';
import { SkillService } from '../skill.service';
import { Skill } from '../skill';

@Component({
  selector: 'app-edit-associate',
  templateUrl: './edit-associate.component.html',
  styleUrls: ['./edit-associate.component.css']
})
export class EditAssociateComponent implements OnInit {

  route : ActivatedRoute;
  associateService : AssociateService;
  skillService : SkillService;
  aId : number;
  associate : Associate;
  aSkillArr : AssociateSkill[];
  statusArr : string[];
  levelArr : number[];
  skillArr : Skill[];
  validInput : boolean = true;
  errorMessages : string[];
  associateSkill : AssociateSkill;
  skillObj : Skill;

  constructor(route : ActivatedRoute, associateService : AssociateService, skillService : SkillService, private router: Router) {
    this.route = route;
    this.associateService = associateService;
    this.skillService = skillService;
    this.associate = new Associate();
    this.aSkillArr = new Array();
    //this.skillArr = new Array();
    this.statusArr = ['Green', 'Blue', 'Red'];
    this.levelArr = [1, 2, 3];
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      
      this.aId = params['aId'];
         
      this.associateService.getAssociate(this.aId).subscribe(data => {
        this.associate = data;
        console.log('Inside edit associate :: ' + this.associate.associateName);
        console.log('Inside edit associate ID :: ' + this.associate.associateId);
        if(data != null){
          this.aSkillArr = this.associate.associateSkills;
          console.log('Pre selected associate skills length 1 :: ' + this.aSkillArr.length);

          //Fetching skills from Skills table
          this.skillService.getSkillList().subscribe(data => {
            this.skillArr = data;
            console.log('Skill length :: ' + this.skillArr.length);
            //check pre selected associate skills
            console.log('Pre selected associate skills length 2 :: ' + this.aSkillArr.length);
            
            console.log('This associate has pre selected skills');
            for(let skill of this.skillArr){ //
              //console.log('Pre selected skill :: ' + aSkill.skillName);
              skill.isSelected = false;
              if(this.aSkillArr.length > 0){
                for(let aSkill of this.aSkillArr){
                  console.log('Skill Name :: ' + aSkill.skillName);
                  if(skill.skillName == aSkill.skillName){
                    //console.log('Skill Name matched..present in skill list ');
                    skill.isSelected = true;
                    skill.isSaved = true;
                    skill.skillRating = aSkill.points;
                  }
                  console.log('Is Skill selected :: ' + skill.isSelected);
                }
              }
            }     
          }, err => {alert('Service temporarily unavailable')});
        }
                               
      }, err => {alert('Service temporarily unavailable')});
      
    });
    
  }

  editAssociate(associate : Associate){
    this.validInput = true;
    this.errorMessages = new Array();
    if(associate != null){

      //Validate input data
      this.validateAssociateSaveReq(associate);

      for(let skill of this.skillArr){

        // Adding new added skills
        if(skill.isSelected && !skill.isSaved){
          if(!this.aSkillArr.some(x => x.skillName === skill.skillName)){
            this.associateSkill = new AssociateSkill();
            this.associateSkill.skillId = skill.skillId;
            this.associateSkill.skillName = skill.skillName;
            if(skill.skillRating > 0){
              this.associateSkill.points = skill.skillRating;

              this.aSkillArr.push(this.associateSkill);
            }else{
              this.validInput = false;
              this.errorMessages.push('Please rate selected skill.');
            }
          }
        }

      }

      if(this.validInput){
        if(this.errorMessages.length <= 0){
          this.errorMessages = new Array();
          this.associateService.updateAssociate(this.associate).subscribe(isSaved =>{
            if(isSaved){
              alert('Assciate information updated');
              this.router.navigateByUrl('editAssociate/' + this.associate.associateId);
            }else{
              this.errorMessages.push('Failed to edit skill. Please try again');
            }
          }, err => {alert(err + 'Save Service temporarily unavailable')});
          //this.associate = new Associate();
          //this.associate.associateSkills = [];
          window.location.reload();  
        }
      }
    }
  }

  private validateAssociateSaveReq(associate : Associate){
    this.validInput = true;
    
    if(associate != null){
      
      if(associate.email == null || associate.email == ''){
        this.validInput = false;
        this.errorMessages.push('Please enter Associate Email.');
      }
      if(associate.mobile == null || associate.mobile == 0){
        this.validInput = false;
        this.errorMessages.push('Please enter Associate Mobile.');
      }
      
      if(associate.mobile != null && associate.mobile.toString().length != 10){
        this.validInput = false;
        console.log('mobile :: ' + associate.mobile.toString().length);
        this.errorMessages.push('Please enter valid Mobile Number.');
      }
      
      if(associate.status == null || associate.status == ''){
        this.validInput = false;
        this.errorMessages.push('Please select Associate Status.');
      }
      if(associate.level == null || associate.level == 0){
        this.validInput = false;
        this.errorMessages.push('Please select Associate Level.');
      }
          
    }
  }

  cancel(){
    window.location.reload();
  }

}
