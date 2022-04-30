import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
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

  @ViewChild('chart') mapElRef!: ElementRef;
  @ViewChild('popupMsg') popupMsgElRef!: ElementRef;

  activeData: any = {
    title: '',
    dataList: [],
    event: null
  }

  popModal = false;

  constructor() { }

  ngAfterViewInit(): void {
    const map = new mapboxgl.Map({
      container: this.mapElRef.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 6,
      // center: [116.0259, 39.9010],
      center: [121.5, 31.3],
    });
    // map.addControl(new mapboxgl.NavigationControl());
    map.addControl(new MapboxLanguage({
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
    map.on('load', () => {
      map.addSource('trees', {
        'type': 'geojson',
        'data': './assets/trees.geojson'
      });

      map.addLayer(
        {
          'id': 'trees-heat',
          'type': 'heatmap',
          'source': 'trees',
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
              'rgb(208,209,230)',
              0.4,
              'rgb(166,189,219)',
              0.6,
              'rgb(103,169,207)',
              0.8,
              'rgb(28,144,153)'
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

      map.addLayer(
        {
          'id': 'trees-point',
          'type': 'circle',
          'source': 'trees',
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
                [10, 'rgb(236,222,239)'],
                [20, 'rgb(208,209,230)'],
                [30, 'rgb(166,189,219)'],
                [40, 'rgb(103,169,207)'],
                [50, 'rgb(28,144,153)'],
                [60, 'rgb(1,108,89)']
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
    });

    // click on tree to view dbh in a popup
    map.on('click', ['trees-heat','trees-point'], (event: any) => {
      this.activeData.title = event.features[0].properties.place_name
      this.activeData.html = event.features[0].properties.html
      this.activeData.dataList = event.features.map((f: any) => ({
        content: f.properties.content,
        html: f.properties.html
      }))
      this.activeData.event = event
      new mapboxgl.Popup({
        // closeButton: false,
        className: 'sh-map-pop-msg'
      })
        .setLngLat(event.features[0].geometry.coordinates)
        .setDOMContent(this.popupMsgElRef.nativeElement)
        .addTo(map);
    });
  }
}
