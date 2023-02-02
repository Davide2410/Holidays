import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { Holiday } from './holiday';

@Injectable({
  providedIn: 'root'
})
export class VacanzeService {

  path='http://localhost:4201/holidays'

  constructor(private http:HttpClient) { }

  allHolidays(){
    return this.http.get<Holiday[]>(this.path).pipe(catchError(err=>{
      console.log(err);
      throw err
    }))
  }

}
