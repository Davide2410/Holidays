import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Choose } from './choose';

@Injectable({
  providedIn: 'root'
})
export class ChooseService {

  path = 'http://localhost:4201/choose'

  constructor( private http:HttpClient) { }

  chooseUtente(data:Choose){
    return this.http.post<Choose>(this.path, data).pipe(catchError(err=>{
      console.log(err);
      throw err
    }))
  }

  allChoose(){
    return this.http.get<Choose[]>(this.path).pipe(catchError(err=>{
      console.log(err);
      throw err
    }))
  }

}
