import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css']
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {


  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-74.10380784179445, 4.651165392795477); //Valor inicial al entrar en la página (Lat/lang de Bogotá)


  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat,
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove(); //si eliminas el mapa, eliminas los listeners
  }

  mapListeners() {
    if ( !this.map ) throw 'Mapa no inicializado';

    this.map.on('zoom', (ev) => { // .on es un listener (ev) esun callback
      this.zoom = this.map!.getZoom(); //cada vez que se dispara un evento de zoom, obtienes el zoom (clase propia de mapbox)
    });

    this.map.on('zoomend', (ev) => {
      if ( this.map!.getZoom() < 18 ) return; //el zoomIn sea menor de 18, que no haga nada
      this.map!.zoomTo(18); //si el zoom es mayor de 18, mueves el zoom a 18
    });

    this.map.on('move', () => { // cuando el mapa se mueva
      this.currentLngLat = this.map!.getCenter(); //obtiene el current lat lang con las coordenadas iniciales y lo entra en el mapa
    });

  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChanged( value: string ) {
    this.zoom = Number(value); //transforma el string a número
    this.map?.zoomTo( this.zoom );
  }


}
