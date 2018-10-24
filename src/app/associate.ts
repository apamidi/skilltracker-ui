import { AssociateSkill } from "./associate-skill";

export class Associate {
    public associateId : number;
    public associateName : string;
    public email : string;
    public mobile : number;
    public level : number;
    public status : string;
    public gender : string;
    public remark : string;
    public strength : string;
    public weakness : string;
    public pic : string|any;
    //public pic : File;
    public associateSkills : AssociateSkill[];
}
