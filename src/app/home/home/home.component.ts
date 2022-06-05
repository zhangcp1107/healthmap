import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Map } from 'mapbox-gl';
import { GlobalService } from 'src/app/service/global.service';
import { MapComponent } from 'src/shared/map/map/map.component';
import { HttpService } from '../http.service';

export enum DisTypeEnum {
  /** @desc 动物 */
  ANIMAL = 0,
  /** @desc 呼吸 */
  BREATHE = 1
}

// const DisMap: any = {
//   [DisTypeEnum.ANIMAL]: {
//     msg: '动物性感染警报',
//     img: './assets/dis-img/60.png'
//   },
//   [DisTypeEnum.BREATHE]: {
//     msg: '呼吸系统感染警报',
//     img: './assets/dis-img/68.png'
//   }
// }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('map') private map!: MapComponent;
  count = 0;
  search = {};
  listview: any[] = [];
  chartOption: any = {data: []};

  active = 'environment';
  activeb = '';
  popInfoModal = false;
  popAddModal = false;
  popEnvironmentModal = false;
  // nearData = [{
  //   type: DisMap[0],
  //   count: 14,
  //   data: [{name: '禽流感', n: 5}, {name: '非洲猪瘟', n: 7}]
  // }, {
  //   type: DisMap[1],
  //   count: 8,
  //   data: [{name: '新冠', n: 6}, {name: '流感', n: 1}, {name: '肺炎', n: 1}]
  // }];
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

  mapInit(e: any) {
    this.getData();
  }

  getData() {
    this.http.getAlerts(this.search).subscribe(res => {
      this.count = res.markers.length;
      this.listview = res.listview;
      this.chartOption.data = res.listview.map((d: any) => {
        return {
          year: d.date, value: 3
        }
      })
      this.map.setData({
        type: "FeatureCollection", features: res.markers.map((data: any) => ({
          type: "Feature",
          properties: {
            count: 2,
            circle_radius: 2,
            circle_color: 5,
            content: data.label,
            list: data.list,
            place_name: data.place_name
          },
          geometry: { type: "Point", coordinates: [data.lon, data.lat] }
        }))
      })
    })
  }

  addAlert(e: any) {
    if (this.global.login) {
      this.popAddModal = true;
    } else {
      this.router.navigate(['../login'], {
        relativeTo: this.activateRoute
      });
    }
  }

  deleteAlert(data: any) {
    this.http.deleteAlert(data.id).subscribe();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.isLoading = true;
      this.http.createAlert({alert: {
        title: this.validateForm!.get('email')!.value,
      }}).subscribe()
    }
  }

  ngOnInit(): void {
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
