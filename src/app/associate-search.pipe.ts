import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'associateSearch'
})
export class AssociateSearchPipe implements PipeTransform {

  transform(value : any[], assocNm : string , assocEmail : string , assocId : number , assocMob : number , assocStr : string ) {
    
    if (value && value.length){
      return value.filter(item =>{
          if (assocNm && (item.associateName != null) && item.associateName.toLowerCase().indexOf(assocNm.toLowerCase()) === -1){
              return false;
          }
          if (assocEmail && (item.email != null) && item.email.toLowerCase().indexOf(assocEmail.toLowerCase()) === -1){
            return false;
          }
                    
          if(assocId && item.associateId != assocId){
              return false;
          }
          if(assocMob && item.mobile != assocMob){
            return false;
          }
          if (assocStr && (item.strength != null) && item.strength.toLowerCase().indexOf(assocStr.toLowerCase()) === -1){
            return false;
          }
          
          return true;
     })
    }
    else{
      return value;
    }

  }

}
