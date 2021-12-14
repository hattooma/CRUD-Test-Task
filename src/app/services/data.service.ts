import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  URL: string = "http://localhost:3000/persons/"
  constructor(private httpClient: HttpClient ) {}


  public getPersons() {
    return this.httpClient.get(this.URL);
  }

  public getPerson(id:any) {
    return this.httpClient.get(this.URL +id);
  }

  public deletePerson(id:any) {
    return this.httpClient.delete(this.URL +id);
  }

  public updatePerson(person:any) {
    console.log(person);
    
     return this.httpClient.put<any>(`${this.URL}/${person.id}`,person).pipe(map((res:any)=>{
        return res;
     }));
  }

  public addPerson(person:any) {
    console.log(person);
    
     return this.httpClient.post<any>(`${this.URL}`,person).pipe(map((res:any)=>{
        return res;
     }));
  }

}
