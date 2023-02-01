import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import { Route, Router } from '@angular/router';
import { catchError, pipe } from 'rxjs';
import { AuthRegister } from 'src/app/auth/auth';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  err:string|undefined

  constructor(private authSrv:AuthService, private r:Router) { }

  ngOnInit(): void {
  }

  registrati(form:NgForm):void{
    let data:AuthRegister = {
      name: form.value.name,
      surname: form.value.surname,
      email: form.value.email,
      password: form.value.password
    }
    this.authSrv.submit(data).pipe(catchError(err=>{
      let error = document.getElementById('error');
      if (err.error == "Cannot find user") {
        error!.classList.remove('none')
        this.err = `Utente non registrato`
      }else if (err.error == "Incorrect password") {
        error!.classList.remove('none')
        this.err = `Password errata`
      }else if (err.error == "Password is too short") {
        error!.classList.remove('none')
        this.err = `Password troppo corta`
      }
      else if (err.error == "Email format is invalid") {
        error!.classList.remove('none')
        this.err = `Formato email errato`
      }
      else if (err.error == "Email and password are required") {
        error!.classList.remove('none')
        this.err = `Email e Password sono richieste`
      }
      else if (err.error == "Email already exists") {
        error!.classList.remove('none')
        this.err = `Email già esistente`
      }
      throw err
    })).subscribe(res=>{
      console.log(res);
      this.r.navigate(['/login'])
    })
  }


}
