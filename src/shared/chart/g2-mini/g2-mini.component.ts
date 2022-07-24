import { Component, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { Chart } from '@antv/g2';

@Component({
  selector: 'sh-chart',
  templateUrl: './g2-mini.component.html',
  styleUrls: ['./g2-mini.component.scss']
})
export class G2MiniComponent {
  chart: any;
  option: any = {
    chartType: '迷你柱状图', // '迷你折线图'
    chartXY: 'index*value',
    data: null // []
  };
  @Input('option')
  set option_(value: any) {
    this.chart&&this.chart.destroy();
    this.option = Object.assign(this.option, value);
    this.option.data&&this.initChart();
  }
  get option_(): any { return this.option; }
  @ViewChild('chart') ele!: ElementRef;

  ngAfterViewInit(): void {
    this.ele&&this.initChart();
  }

  initChart() {
    this.chart = new Chart({
      container: this.ele.nativeElement,
      autoFit: true,
      height: 300,
      padding: [5, 30, 50, 50]
    });
    this.chart.data(this.option.data);
    this.chart.scale({
      year: {
        range: [0, 1],
      },
      value: {
        min: 0,
        nice: true,
      },
    });

    this.chart.tooltip({
      showCrosshairs: true, // 展示 Tooltip 辅助线
      shared: true,
    });

    this.chart.line().position('year*value').label('value');
    this.chart.point().position('year*value');

    this.chart.render();
  }
}
