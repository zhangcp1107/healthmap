import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Map } from 'mapbox-gl';
import { GlobalService } from 'src/app/service/global.service';
import { MapComponent } from 'src/shared/map/map/map.component';
import { HttpService } from '../http.service';

// export enum DisTypeEnum {
//   /** @desc 动物 */
//   ANIMAL = 0,
//   /** @desc 呼吸 */
//   BREATHE = 1
// }

const DisMap: any = {
  ['动物健康威胁']: './assets/dis-img/60.png',
  ['人类健康威胁']: './assets/dis-img/68.png'
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('map') private map!: MapComponent;
  count = 0;
  search = {};
  listdata: any[] = [];
  listview: any[] = [];
  diseasesList: any[] = [];
  chartOption: any = {data: []};

  active = 'environment';
  activeb = '';
  popInfoModal = false;
  popAddModal = false;
  popEnvironmentModal = false;
  nearData: any[] = [];
  add = {
    type: '0',
    show1: false,
    show2: false
  }
  validateForm!: FormGroup;
  isLoading = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpService,
    private global: GlobalService,
    private activateRoute: ActivatedRoute,
  ) { }

  mapInit(e: any) {
    this.getData();
    this.http.getDiseases().subscribe((res: any) => {
      this.diseasesList = res.map((d: any) => ({ label: d.disease, value: d.disease }))
    })
  }

  getData() {
    this.isLoading = true;
    this.http.getAlerts(this.search).subscribe(res => {
      this.count = res.markers.length;
      this.listdata = res.listview;
      this.chartOption.data = res.listview.map((d: any) => {
        if (d.disease_classification) {
          const cf = d.disease_classification;
          let near: any = this.nearData.find((n: any) => n.name == cf.specie);
          if (near) {
            let level = near.data.find((n: any) => n.name == cf.level)
            if (level) {
              let name = level.data.find((n: any) => n.name == cf.chinese)
              if (name) {
                name.data.push(d)
              } else {
                level.data.push({
                  name: cf.chinese,
                  family: cf.family,
                  english: cf.english,
                  data: [d]
                })
              }
            } else {
              near.data.push({
                name: cf.level,
                data: [{
                  name: cf.chinese,
                  family: cf.family,
                  english: cf.english,
                  data: [d]
                }]
              })
            }
          } else {
            near = {
              name: cf.specie,
              icon: DisMap[cf.specie],
              data: [{
                name: cf.level,
                data: [{
                  name: cf.chinese,
                  family: cf.family,
                  english: cf.english,
                  data: [d]
                }]
              }]
            }
            this.nearData.push(near)
          }
        }
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
      this.isLoading = false;
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
        ...this.validateForm!.getRawValue()
      }}).subscribe(() => {
        this.isLoading = false;
      })
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required]],
      url: ['', [Validators.required]],
      title: [''],
      plcae_name: [''],
      disease: [[]],
      date: [''],
      summary: ['']
    });
  }

  getSum1(data: any[]) {
    return data.reduce((s, d) => (s+d.data.length),0)
  }

  getSum2(data: any[]) {
    return data.reduce((s, d) => (s+this.getSum1(d.data)),0)
  }

  list1(data: any[]) {
    const list = data.reduce((s, d) => {
      s.push(...(d.data as any[]).reduce((s1, d1) => {
        s1.push(...d1.data)
        return s1;
      }, []))
      return s;
    }, [])
    this.listview = list;
    this.activeb='list';
  }

  list2(data: any[]) {
    const list = data.reduce((s, d) => {
      s.push(...d.data);
      return s;
    }, [])
    this.listview = list;
    this.activeb='list';
  }

  list3(data: any[]) {
    const list = data;
    this.listview = list;
    this.activeb='list';
  }

  showList() {
    this.listview = this.listdata;
    this.activeb='list';
  }
}
