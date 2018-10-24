import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Headers, Http, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Skill } from './skill';

@Injectable()
export class SkillService {

  url: string;

  constructor(private http : Http) {
    this.url = environment.stBaseAPIUrl + 'skills/';
   }

   addSkill(skill : Skill){
    
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers : headers });
    return this.http.post(this.url, skill, options)
    .map((res) => (res.status == 201));  
    
  } 
    
  
  getSkillList(){
    return this.http.get(this.url).map(res => res.json());
  }

  getSkill(skillId : number){
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.get(this.url + skillId, options)
      .map(res => res.json());
  }

  updateSkill(skill : Skill){

    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });

    return this.http.put(this.url + skill.skillId, JSON.stringify(skill), options)
      .map(res => res.json());
    
  }

  deleteSkill(skill : Skill){
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });

    return this.http.delete(this.url + skill.skillId, options)
    //.map(res => res.json()).catch(this.handleError);
    .map((res) => (res.status == 200));
    
  }

  private handleError(error: any): Promise<any> {
    console.error('Error', error); 
    return Promise.reject(error.message || error);
  }

}
