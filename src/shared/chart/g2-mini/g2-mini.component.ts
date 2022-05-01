import { Component, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { Chart } from '@antv/g2';

@Component({
  selector: 'sh-chart',
  templateUrl: './g2-mini.component.html',
  styleUrls: ['./g2-mini.component.scss']
})
export class G2MiniComponent implements AfterViewInit {
  option: any = {
    chartType: '迷你柱状图', // '迷你折线图'
    chartXY: 'index*value',
    data: null // []
  };
  @Input('option')
  set option_(value: any) {
    this.option = Object.assign(this.option, value);
    this.option.data&&this.initChart();
  }
  get option_(): any { return this.option; }
  @ViewChild('chart') ele!: ElementRef;

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart() {
    let chart = new Chart({
      container: this.ele.nativeElement,
      autoFit: true,
      height: 300,
      padding: [5, 5, 5, 10]
    });
    chart.data([
      { year: '1991', value: 3 },
      { year: '1992', value: 4 },
      { year: '1993', value: 3.5 },
      { year: '1994', value: 5 },
      { year: '1995', value: 4.9 },
      { year: '1996', value: 6 },
      { year: '1997', value: 7 },
      { year: '1998', value: 9 },
      { year: '1999', value: 13 },
    ]);
    chart.scale({
      year: {
        range: [0, 1],
      },
      value: {
        min: 0,
        nice: true,
      },
    });

    chart.tooltip({
      showCrosshairs: true, // 展示 Tooltip 辅助线
      shared: true,
    });

    chart.line().position('year*value').label('value');
    chart.point().position('year*value');

    chart.render();
  }
}
