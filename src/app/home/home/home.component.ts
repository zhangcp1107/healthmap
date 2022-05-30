import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/service/global.service';
import { HttpService } from '../http.service';

export enum DisTypeEnum {
  /** @desc 动物 */
  ANIMAL = 0,
  /** @desc 呼吸 */
  BREATHE = 1
}

const DisMap: any = {
  [DisTypeEnum.ANIMAL]: {
    msg: '动物性感染警报',
    img: './assets/dis-img/60.png'
  },
  [DisTypeEnum.BREATHE]: {
    msg: '呼吸系统感染警报',
    img: './assets/dis-img/68.png'
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  active = 'environment';
  activeb = '';
  popInfoModal = false;
  popAddModal = false;
  popEnvironmentModal = false;
  nearData = [{
    type: DisMap[0],
    count: 14,
    data: [{name: '禽流感', n: 5}, {name: '非洲猪瘟', n: 7}]
  }, {
    type: DisMap[1],
    count: 8,
    data: [{name: '新冠', n: 6}, {name: '流感', n: 1}, {name: '肺炎', n: 1}]
  }];
  add = {
    type: '0',
    show1: false,
    show2: false
  }
  validateForm!: FormGroup;
  isLoading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpService,
    private global: GlobalService,
    private activateRoute: ActivatedRoute,
  ) { }


  addAlert(e: any) {
    if (this.global.login) {
      this.popAddModal = true;
    } else {
      this.router.navigate(['../login'], {
        relativeTo: this.activateRoute
      });
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.isLoading = true;
    }
  }

  ngOnInit(): void {
    this.http.getAlerts({}).subscribe(res => {
      console.log(res)
    })
    this.validateForm = this.fb.group({
      email: ['', [Validators.required]],
      url: ['', [Validators.required]],
      title: [''],
      loc: [''],
      dis: [[]],
      date: [''],
      desc: ['']
    });
  }

}
