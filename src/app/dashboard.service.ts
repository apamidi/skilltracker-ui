import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Headers, Http, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class DashboardService {

  url : string;
  
  constructor(private http : Http) {
    this.url = environment.stBaseAPIUrl + 'asSummary/';
   }
   
  getAssociateSkillList(){
    return this.http.get(this.url).map(res => res.json());
  }

  getAssociateSkillsById(skillId : number){
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.get(this.url + skillId, options)
      .map(res => res.json());
  }

}
