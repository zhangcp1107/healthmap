import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from '../http.service';
import moment from 'moment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input('count') count = 0;

  @Input('data')
  data: any = {};
  @Output()
  dataChange = new EventEmitter<any>();
  @Output()
  searchEvent = new EventEmitter<any>();

  active: any = '';

  option: any = { places: [], diseases: [], sources: [], species: []}

  search = {
    dis: { show: false, value: [] },
    loc: { show: false, value: [] },
    sou: { show: false, value: [] },
    type: { show: false, value: [] },
    date: { show: false, value: [] }
  }

  checkType = [
    { label: '新的和正在进行的爆发', value: 'active', checked: true },
    { label: '警告', value: 'warn', checked: true },
    { label: '国际意义', value: 'intl', checked: true }
  ];

  searchList = [{
    id: 1,
    home: true,
    msg: '所有疾病，您在过去一周的位置',
    p: '默认视图：默认本地视图'
  }, {
    id: 2,
    home: false,
    msg: '过去一周的报警',
    p: '过去一周的报警'
  }, {
    id: 3,
    home: false,
    msg: '冠状病毒检测',
    p: '过去一年的冠状病毒报警'
  }, {
    id: 4,
    home: false,
    msg: '2012年的埃博拉病毒爆发',
    p: '乌干达埃博拉病毒与周围国家的看法'
  }, {
    id: 5,
    home: false,
    msg: '禽流感（上个月）',
    p: '过去一个月的所有禽流感报警'
  }, {
    id: 6,
    home: false,
    msg: '禽流感（上个月）',
    p: '过去一个月的所有禽流感报警'
  }, {
    id: 7,
    home: false,
    msg: '禽流感（上个月）',
    p: '过去一个月的所有禽流感报警'
  }, {
    id: 8,
    home: false,
    msg: '禽流感（上个月）',
    p: '过去一个月的所有禽流感报警'
  }, {
    id: 9,
    home: false,
    msg: '禽流感（上个月）',
    p: '过去一个月的所有禽流感报警'
  }, {
    id: 10,
    home: false,
    msg: '禽流感（上个月）',
    p: '过去一个月的所有禽流感报警'
  }]

  searchItemActive = ''

  constructor(
    private http: HttpService,
  ) { }

  change() {
    this.dataChange.emit({
      diseases: this.search.dis.value.join(';'),
      places: this.search.loc.value.join(';'),
      sources: this.search.sou.value.join(';'),
      species: this.search.type.value.join(';'),
      dateS: this.search.date.value[0] ? moment(this.search.date.value[0]).format('YYYY-M-D') : null,
      dateE: this.search.date.value[1] ? moment(this.search.date.value[1]).format('YYYY-M-D') : null,
    })
  }

  clearAll(data: any) {
    data.value = [];
    this.change();
  }

  ngOnInit(): void {
    this.http.getPlaces().subscribe((res: any) => {
      this.option.places = res.map((d: any) => ({ label: d.place_name, value: d.place_name }))
    })
    this.http.getDiseases().subscribe((res: any) => {
      this.option.diseases = res.map((d: any) => ({ label: d.disease, value: d.disease }))
    })
    this.http.getSources().subscribe((res: any) => {
      this.option.sources = res.map((d: any) => ({ label: d.source, value: d.source }))
    })
    this.http.getSpecies().subscribe((res: any) => {
      this.option.species = res.map((d: any) => ({ label: d.species, value: d.species }))
    })
  }

}
