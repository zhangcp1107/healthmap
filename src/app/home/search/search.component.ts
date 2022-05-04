import { Component, OnInit } from '@angular/core';
import { dis } from './dis'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  active: any = 'search';

  disOption = dis.filter(i => i.label);

  search = {
    dis: {
      show: false,
      type: '0',
      value: []
    },
    loc: {
      show: false,
      type: '0',
      value: []
    },
    sou: {
      show: false,
      type: '0',
      value: []
    },
    type: {
      show: false,
      type: '0',
      value: []
    },
    date: {
      show: false,
      type: '0',
      value: []
    }
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

  constructor() { }

  ngOnInit(): void {
  }

}
