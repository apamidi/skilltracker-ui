import { AssociateSkill } from "./associate-skill";

export class Skill {
    public skillId : number;
    public skillName : string;
    public associateSkills : AssociateSkill[];
    public skillEditable : boolean = false;
    public isSelected : boolean = false;
    public skillRating : number;
    public isSaved : boolean = false;
    
}
