import { Component, OnInit, Input } from '@angular/core';
import * as L from 'leaflet';
import { MonsterService } from '../monster.service';
import { MapService } from '../mapservice.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  //@Input() markers: any;
  markers: any;
  public map!: L.Map;
  constructor(private ms: MonsterService, private mapService: MapService) { }

  ngOnInit(): void {
    this.showMap();
    this.mapService.initialize(this.map, this.icon);
  }

  public icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [13, 0],
    iconUrl: "assets/Map_marker.svg.png",
  });

  showMap() {
    // Specify a different initial view without a default marker
    this.map = L.map('mapid', {
      center: [49.27, -123],
      zoom: 11,
      layers: []
    });
  
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',
    }).addTo(this.map);
  }
  putLabels() {
      L.marker([this.markers.lat, this.markers.lng], { icon: this.icon }).addTo(this.map)
        .bindPopup(this.markers.popup);
  }

  createMarker(lat: number, lng: number) {
    L.marker([lat, lng], { icon: this.icon }).addTo(this.map)
      .bindPopup("<b>Monster</b><br />");
  }
}
