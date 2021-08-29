import { Component } from '@angular/core';
import { Map, tileLayer, marker } from 'leaflet';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: Map;

  latitude: number;
  longitude: number;
  category: string;
  workerList: string[];
  constructor() {}

  ionViewDidEnter() {
    this.getLocation();
  }

  leafletMap() {
    this.map = new Map('mapId').setView([this.latitude, this.longitude], 14);
    tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      // tslint:disable-next-line:max-line-length
      {
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      }
    ).addTo(this.map);
    marker([this.latitude, this.longitude])
      .addTo(this.map)
      .bindPopup('You are here')
      .openPopup();

    console.log(
      `From leafletMap -> Latitude: ${this.latitude} | Longitude: ${this.longitude}`
    );
  } // leaflet map

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    console.log(`Location: ${this.latitude} | ${this.longitude}`);

    this.leafletMap();
  }

  // Remove map when we have multiple map objects
  ionViewWillLeave() {
    this.map.remove();
  }
} // class
