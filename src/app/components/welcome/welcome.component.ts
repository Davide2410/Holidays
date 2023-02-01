import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private authSrv:AuthService , private r:Router) { }

  ngOnInit(): void {
  }

  logOut(){
    this.authSrv.logOut()
    this.r.navigate(['/login'])
  }

}
