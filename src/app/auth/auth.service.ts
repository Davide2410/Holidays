import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { Auth, AuthLogin, AuthRegister } from './auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  path = 'http://localhost:4201/users'
  
  pathRegsiter = 'http://localhost:4201/register'
  pathLogin = 'http://localhost:4201/login'

  authSubj = new BehaviorSubject<null | Auth>(null)
  // un oggetto che può essere osservato o osservatore, il suo compito è quando ci loggiamo con l'utente salviamo al suo inetrno i valori dell'utente(dati) e tutti i subscribe che vengono chiamti successivamente , ricevono gli stessi valori dell'utente
  user$ = this.authSubj.asObservable()

  jwtHelper = new JwtHelperService()
// scadenza token

  timeOut:any


  constructor(private http:HttpClient, private r:Router) { }

  // REGISTER
  submit(data:AuthRegister){
    return this.http.post<Auth>(this.pathRegsiter, data).pipe(catchError(err=>{
      console.log(err);
      throw err
    }))
  }
  // LOGIN
  login(data:AuthLogin){
    return this.http.post<Auth>(this.pathLogin, data).pipe(catchError(err=>{
      console.log(err);
      throw err
    }), tap((res=>{
      this.authSubj.next(res)
      localStorage.setItem('user' , JSON.stringify(res))
    })))
  }
  // LOGOUT
  logOut(){
    localStorage.removeItem('user')
    this.authSubj.next(null)
    if(this.timeOut){
      clearTimeout(this.timeOut)
    }
    this.r.navigate(['/login'])
  }
  autoLogOut(data:Auth){
    const scadenza = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date
    const intervallo = scadenza.getTime() - new Date().getTime()
    this.timeOut = setTimeout(()=>{
      this.logOut()
    }, intervallo)
  }

  restore(){
    const user = localStorage.getItem('user')
    if(!user){
      return
    }
    const userData:Auth = JSON.parse(user)
    if(this.jwtHelper.isTokenExpired(userData.accessToken)){
      return
    }
    this.authSubj.next(userData)
    this.autoLogOut(userData)
  }

  // ALL USER
  allUser(){
    return this.http.get<Auth[]>(this.path).pipe(catchError(err=>{
      console.log(err);
      throw err
    }))
  }


}
