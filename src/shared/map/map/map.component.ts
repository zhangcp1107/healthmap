import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import mapboxgl, { Map } from 'mapbox-gl';
declare const MapboxLanguage: any;
mapboxgl.accessToken = 'pk.eyJ1IjoibWFsLXdvb2QiLCJhIjoiY2oyZ2t2em50MDAyMzJ3cnltMDFhb2NzdiJ9.X-D4Wvo5E5QxeP7K_I3O8w';
mapboxgl.setRTLTextPlugin(
  'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
  () => {},
  false // Lazy load the plugin
);

@Component({
  selector: 'sh-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  private map!: Map;
  private keyName = '';
  private mapEvent!: any;

  @ViewChild('chart') mapElRef!: ElementRef;
  @ViewChild('popupMsg') popupMsgElRef!: ElementRef;
  @Output() initEvent = new EventEmitter<{map: Map}>();

  activeData: any = { title: '', dataList: [], event: null }
  popModal: any = null;

  constructor() { }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.mapElRef.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 2,
      // center: [116.0259, 39.9010],
      center: [119.5, 30],
    });
    // map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new MapboxLanguage({
      defaultLanguage: 'zh-Hans'
    }));
    // 定位
    // map.addControl(new mapboxgl.GeolocateControl({
    //   positionOptions: {
    //     enableHighAccuracy: true
    //   },
    //   trackUserLocation: true
    // }));
    // 数据
    this.map.on('load', () => {
      this.initEvent.emit({map: this.map})
    });
  }

  setData(data: any) {
    if (this.keyName) {
      this.map.removeSource(this.keyName);
      this.map.removeLayer(this.keyName + '-heat');
      this.map.removeLayer(this.keyName + '-point');
      this.map.off('click', this.mapEvent);
    }
    this.keyName = 'sdata'+(new Date).getTime();
    this.map.addSource(this.keyName, {
      'type': 'geojson',
      'data': data
    });
    
    this.map.addLayer(
      {
        'id': this.keyName + '-heat',
        'type': 'heatmap',
        'source': this.keyName,
        'maxzoom': 15,
        'paint': {
          // increase weight as diameter breast height increases
          'heatmap-weight': {
            'property': 'dbh',
            'type': 'exponential',
            'stops': [
              [1, 0],
              [62, 1]
            ]
          },
          // increase intensity as zoom level increases
          'heatmap-intensity': {
            'stops': [
              [11, 1],
              [15, 3]
            ]
          },
          // use sequential color palette to use exponentially as the weight increases
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0,
            'rgba(236,222,239,0)',
            0.2,
            'rgb(255,163,158)',
            0.4,
            'rgb(255,120,117)',
            0.6,
            'rgb(255,77,79)',
            0.8,
            'rgb(245,34,45)'
          ],
          // increase radius as zoom increases
          'heatmap-radius': {
            'stops': [
              [11, 15],
              [15, 20]
            ]
          },
          // decrease opacity to transition into the circle layer
          'heatmap-opacity': {
            'default': 1,
            'stops': [
              [14, 1],
              [15, 0]
            ]
          }
        }
      },
      'waterway-label'
    );

    this.map.addLayer(
      {
        'id': this.keyName + '-point',
        'type': 'circle',
        'source': this.keyName,
        'minzoom': 14,
        'paint': {
          // increase the radius of the circle as the zoom level and dbh value increases
          'circle-radius': {
            'property': 'dbh',
            'type': 'exponential',
            'stops': [
              [{ zoom: 15, value: 1 }, 5],
              [{ zoom: 15, value: 62 }, 10],
              [{ zoom: 22, value: 1 }, 20],
              [{ zoom: 22, value: 62 }, 50]
            ]
          },
          'circle-color': {
            'property': 'dbh',
            'type': 'exponential',
            'stops': [
              [0, 'rgba(236,222,239,0)'],
              [10, 'rgb(255,204,199)'],
              [20, 'rgb(255,163,158)'],
              [30, 'rgb(255,120,117)'],
              [40, 'rgb(255,77,79)'],
              [50, 'rgb(245,34,45)']
            ]
          },
          'circle-stroke-color': 'white',
          'circle-stroke-width': 1,
          'circle-opacity': {
            'stops': [
              [14, 0],
              [15, 1]
            ]
          }
        }
      },
      'waterway-label'
    );
    // click on tree to view dbh in a popup
    this.mapEvent = this.map.on('click', [this.keyName + '-heat', this.keyName + '-point'], (event: any) => {
      this.activeData.title = event.features[0].properties.place_name;
      this.activeData.html = event.features[0].properties.html;
      this.activeData.dataList = event.features.reduce((p: [], c: any) => [...p, ...(JSON.parse(c.properties.list) || [])], []);
      this.activeData.dataList = this.activeData.dataList.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
      this.activeData.event = event;
      new mapboxgl.Popup({
        // closeButton: false,
        className: 'sh-map-pop-msg'
      })
        .setLngLat(event.features[0].geometry.coordinates)
        .setDOMContent(this.popupMsgElRef.nativeElement)
        .addTo(this.map);
    });
  }
}
