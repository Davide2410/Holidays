import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Choose } from 'src/app/choose/choose';
import { ChooseService } from 'src/app/choose/choose.service';
import { Holiday } from 'src/app/holidays/holiday';
import { VacanzeService } from 'src/app/holidays/vacanze.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  
  userId!: number

  sceltaUser: Choose[] = []
  scelta!:Choose
  categoryChoose: Holiday[] = []
  category!:Holiday

  arrayVuoto:any[]= []
  constructor(private authSrv: AuthService, private vacSrv: VacanzeService, private chooSrv: ChooseService, private r: Router) { }

  ngOnInit(): void {
    this.controlloAccesso()
  }

  logOut() {
    this.authSrv.logOut()
    this.r.navigate(['/login'])
  }

  controlloAccesso() {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.userId = utente.user.id
    this.chooSrv.allChoose().subscribe(choose => { 
       choose.forEach(el=>{
        if(this.userId != el.user_id){
        
        }else if(this.userId == el.user_id){
          let sospeso = this.sceltaUser.push(el)
          this.scelta = el
          let form = document.querySelector('.example-form')
          form?.classList.add('none')
          this.visualizzaScelta()
        }
       }) 
    })

  }

  

  visualizzaScelta() {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.userId = utente.user.id

    this.vacSrv.allHolidays().subscribe(res => {
      this.categoryChoose = res
      this.chooSrv.allChoose().subscribe(res => {
        this.sceltaUser = res
        this.categoryChoose.forEach(category => {
          this.sceltaUser.forEach(choose => {
            if (category.category == choose.category && choose.user_id == this.userId && category.dayLess == choose.dayLess && category.fredda == choose.fredda) {
              let sospeso = this.arrayVuoto.push(category)
              this.category = category
              console.log(category);
            } else if (category.category == choose.category && choose.user_id == this.userId && category.dayLess == choose.dayLess && category.calda == choose.calda) {
              let sospeso = this.arrayVuoto.push(category)
              this.category = category
              console.log(category);
            } else if (category.category == choose.category && choose.user_id == this.userId && category.dayMore == choose.dayMore && category.fredda == choose.fredda) {
              let sospeso = this.arrayVuoto.push(category)
              this.category = category
              console.log(category);
            } else if (category.category == choose.category && choose.user_id == this.userId && category.dayMore == choose.dayMore && category.calda == choose.calda) {
              let sospeso = this.arrayVuoto.push(category)
              this.category = category
              console.log(category);
            }
          })
        })
      })
    })
  }

}
