import { DOCUMENT } from '@angular/common';
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
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  categories: string[] = []
  c!: string
  fredda!: false
  calda!: true
  userId!: number


  sceltaUser: Choose[] = []
  categoryChoose: Holiday[] = []

  constructor(private authSrv: AuthService, private vacSrv: VacanzeService, private chooSrv: ChooseService, private r: Router) { }

  ngOnInit(): void {
    this.allCategory()
    this.fristPage() 
    this.secondPage()
    this.thirdPage()
    this.back()
    this.backSecond()
    this.checkSecond()
    this.checkThird()
  }


  allCategory() {
    this.vacSrv.allHolidays().subscribe(res => {
      this.categories = Array.from(new Set(res.map(el => el.category)))
      this.categories.forEach(el => {
        this.c = el
      })
    })
  }

  check(){
    let check = document.querySelectorAll('.example-margin') 
    let onePage = document.getElementById('onePage')
    check.forEach(el=>{
      el.addEventListener('click', function(){
        el.classList.toggle('border')
        onePage?.classList.toggle('none')
      })
    })
  }

  checkSecond(){
    let check = document.querySelectorAll('.example-margin') 
    let secondPage = document.getElementById('secondPage')
    check.forEach(el=>{
      el.addEventListener('click', function(){
        el.classList.toggle('border')
        secondPage?.classList.toggle('none')
      })
    })
  }


  checkThird(){
    let check = document.querySelectorAll('.example-margin') 
    let thirdPage = document.getElementById('thirdPage')
    check.forEach(el=>{
      el.addEventListener('click', function(){
        el.classList.toggle('border')
        thirdPage?.classList.toggle('none')
      })
    })
  }


  start(choose: NgForm): void {
    let user: any = localStorage.getItem('user')
    let utente = JSON.parse(user)
    this.userId = utente.user.id
    let data: Choose = {
      user_id: this.userId,
      category: choose.value.category = this.c,
      fredda: choose.value.fredda,
      calda: choose.value.calda,
      dayLess: choose.value.dayLess,
      dayMore: choose.value.dayMore
    }
    this.chooSrv.chooseUtente(data).subscribe(res => {
      console.log(res);
      window.location.reload()
    })
  }

  fristPage() {
    let arrow = document.getElementById('onePage')
    arrow?.addEventListener('click', function () {
      let frist = document.querySelector('.frist')
      let second = document.querySelector('.second')
      frist?.classList.add('none')
      second?.classList.remove('none')
    })
  }

  secondPage() {
    let arrow = document.getElementById('secondPage')
    arrow?.addEventListener('click', function () {
    let third = document.querySelector('.third')
    let second = document.querySelector('.second')
    let thirdPage = document.getElementById('thirdPage')
      third?.classList.remove('none')
      second?.classList.add('none')
      thirdPage?.classList.add('none')
    })
  }

  back(){
    let back = document.getElementById('backPage')
    back?.addEventListener('click' , function(){
      let frist = document.querySelector('.frist')
      let second = document.querySelector('.second')
      frist?.classList.remove('none')
      second?.classList.add('none')
    })
  }

  backSecond(){
    let back = document.getElementById('backSecond')
    back?.addEventListener('click' , function(){
      let third = document.querySelector('.third')
      let second = document.querySelector('.second')
      third?.classList.add('none')
      second?.classList.remove('none')
    })
  }

  thirdPage() {
    let arrow = document.getElementById('thirdPage')
    let third = document.querySelector('.third')
    let last = document.querySelector('.last')
    arrow?.addEventListener('click', function () {
      third?.classList.add('none')
      last?.classList.remove('none')
    })
  }

}
