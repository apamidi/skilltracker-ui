import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Headers, Http, RequestOptions, RequestMethod } from '@angular/http';
import {ResponseOptions, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { URLSearchParams } from '@angular/http';
import { Associate } from './associate';

@Injectable()
export class AssociateService {

  url: string;

  constructor(private http : Http) {
    this.url = environment.stBaseAPIUrl + 'assocs/';
   }

   addAssociate(associate : Associate){
    console.log('Associate JSON before save :: ' + JSON.stringify(associate));
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers : headers });
    return this.http.post(this.url, associate, options)
    .map((res) => (res.status == 201));  
    
  } 
    
  
  getAssociateList(){
    return this.http.get(this.url).map(res => res.json());
  }

  getAssociate(associateId : number){
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.get(this.url + associateId, options)
      .map(res => res.json());
  }

  getAssociateByEmail(email : string): Observable<Associate>{
    alert('Validate email :: ' + email);
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let myParams = new URLSearchParams();
    myParams.set('email', email);
    let options = new RequestOptions({ headers : cpHeaders });
    options.search = myParams;

    return this.http.get(this.url + 'searchAssoc/', options).map(this.extractData);
    //.map(res => res.json());
    //.map((res:Response) => (res.status == 200));
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  } 

  updateAssociate(associate : Associate){

    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });

    return this.http.put(this.url + associate.associateId, JSON.stringify(associate), options)
      .map(res => res.json());
    
  }

  deleteAssociate(associate : Associate){
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });

    return this.http.delete(this.url + associate.associateId, options)
    //.map(res => res.json()).catch(this.handleError);
    .map((res) => (res.status == 200));
    
  }

  private handleError(error: any): Promise<any> {
    console.error('Error', error); 
    return Promise.reject(error.message || error);
  }

  getDashboardSummary(){
    return this.http.get(this.url + 'summary/').map(res => res.json());
  }
}
