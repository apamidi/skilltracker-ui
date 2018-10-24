import { Component, OnInit } from '@angular/core';
import { SkillService } from '../skill.service';
import { Associate } from '../associate';
import { AssociateService } from '../associate.service';
import { Skill } from '../skill';
import { AssociateSkill } from '../associate-skill';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-create-associate',
  templateUrl: './create-associate.component.html',
  styleUrls: ['./create-associate.component.css']
})
export class CreateAssociateComponent implements OnInit {

  skillService : SkillService;
  associateService : AssociateService;
  associate : Associate;
  statusArr : string[];
  levelArr : number[];
  skillArr : Skill[];
  associateSkill : AssociateSkill;
  assocSkillArr : AssociateSkill[];
  skillObj : Skill;
  associateObj : Associate;
  assocByEmail : Associate;
  validInput : boolean = true;
  errorMessages : string[];
  emailExist : boolean;
  observableAssoc : Observable<Associate>;
  assocImage : string|any;

  constructor(skillService : SkillService, associateService : AssociateService) {
    this.skillService = skillService;
    this.associateService = associateService;
    this.associate = new Associate();
    this.statusArr = ['Green', 'Blue', 'Red'];
    this.levelArr = [1, 2, 3];

   }

  ngOnInit() {
    this.assocByEmail = new Associate();
    this.skillService.getSkillList().subscribe(data => {
      this.skillArr = data;
            
    }, err => {alert('Service temporarily unavailable')});
  }

  addAssociate(){
    this.validInput = true;
    this.errorMessages = new Array();

    if(this.skillArr != null && this.skillArr.length > 0){
      
      this.assocSkillArr = new Array();
      for(let skill of this.skillArr){
        if(skill.isSelected){
          
          this.associateSkill = new AssociateSkill();
           
          this.associateSkill.skillId = skill.skillId;
          this.associateSkill.skillName = skill.skillName;
          this.associateSkill.points = skill.skillRating;

          this.assocSkillArr.push(this.associateSkill);
        }
      }      
    }

    if(this.assocSkillArr != null && this.assocSkillArr.length > 0){
      this.associate.associateSkills = this.assocSkillArr;
    }

    //validate inputs
    this.validateAssociateSaveReq();
    console.log('check validInput 1 :: ' + this.validInput);

    // checking if email already exists
    // Keeping this commented. additional logic implemnted as NFR
    /*
    if(this.associate.email != null && this.associate.email != ''){
      //this.loadAssoc(this.associate.email);
      console.log('After loadAssoc :: ' + this.assocByEmail);
    }
    
    
    this.associateService.getAssociateByEmail(this.associate.email).subscribe(doExist =>{
      alert('Inside validate email 3 :: ' + doExist);
      this.emailExist = doExist;
      if(doExist){
        alert('Inside validate email 4 :: ' + doExist);
        this.validInput = false;
        this.errorMessages.push('Associate already exists.');
        
      }else{
        alert('Inside validate email 5 :: ' + doExist);
        //this.errorMessages.push('Failed to add skill. Please try again');
        this.validInput = true;
       
      }
    }, err => {alert('Email Validate Service temporarily unavailable')});
    */

    
    console.log('check validInput 2 :: ' + this.validInput);
    console.log('email exists :: ' + this.emailExist);
    console.log('check error length :: ' + this.errorMessages.length);
        
    this.associate.pic = this.assocImage;
    console.log('Associate pic 3 :: ' + this.associate.pic);
    
    if(this.errorMessages.length <= 0){
      this.errorMessages = new Array();
      this.associateService.addAssociate(this.associate).subscribe(isSaved =>{
        if(isSaved){
          alert('Assciate added');
        }else{
          this.errorMessages.push('Failed to add skill. Please try again');
        }
      }, err => {alert(err + 'Save Service temporarily unavailable')});
      this.associate = new Associate();
      this.associate.associateSkills = [];
      window.location.reload();  
    }
    
  }

  loadAssoc(email : string){
    this.associateService.getAssociateByEmail(email).subscribe(data => this.assocByEmail = data);
   
    console.log('Inside loadAssoc 1 :: ' + this.assocByEmail);
    console.log('Inside loadAssoc 2 :: ' + this.assocByEmail.associateId);
  }

  validateAssociateSaveReq(){
    this.validInput = true;
    let assoc : Associate = this.associate;
    if(assoc != null){
      if(assoc.associateName == null || assoc.associateName == ''){
        this.validInput = false;
        this.errorMessages.push('Please enter Associate Name.');
      }
      if(assoc.email == null || assoc.email == ''){
        this.validInput = false;
        this.errorMessages.push('Please enter Associate Email.');
      }
      if(assoc.mobile == null || assoc.mobile == 0){
        this.validInput = false;
        this.errorMessages.push('Please enter Associate Mobile.');
      }
      
      if(assoc.mobile != null && assoc.mobile.toString().length != 10){
        this.validInput = false;
        console.log('mobile :: ' + assoc.mobile.toString.length);
        this.errorMessages.push('Please enter valid Mobile Number.');
      }
      
      if(assoc.status == null || assoc.status == ''){
        this.validInput = false;
        this.errorMessages.push('Please select Associate Status.');
      }
      if(assoc.level == null || assoc.level == 0){
        this.validInput = false;
        this.errorMessages.push('Please select Associate Level.');
      }

      
      if(assoc.associateSkills != null && assoc.associateSkills.length > 0){
        for(let aSkill of assoc.associateSkills){
          if(aSkill.points == null || aSkill.points == 0){
            this.validInput = false;
            this.errorMessages.push('Please rate selected skill.');
            break;
          }
        }
      }
     
    }

  }

  handleInputChange (event) {
    
    var image = event.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!image.type.match(pattern)) {
        console.error('File is not an image');
        return;
    }
    
    reader.onload = (e: any) => {
      this.assocImage = e.target.result;
      this.associate.pic = this.assocImage;
      console.log('Associate pic 1 :: ' + this.associate.pic);
    }

    reader.readAsDataURL(event.target.files[0]);
    
  }

  imageRemoved($event){
    this.assocImage='http://placehold.it/380x500';
  }

}
