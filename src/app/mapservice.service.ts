import { Injectable } from "@angular/core";
import * as L from "leaflet";
import { MonsterClass } from "./monster-class.service";

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map!: L.Map;
  private icon!: L.Icon;
  private locList: any[];
  private markers: L.Marker[] = []; // Store all markers
  constructor() { 
    this.locList = [];
  }

  initialize(map: L.Map, icon: L.Icon) {
    this.map = map;
    this.icon = icon;
  }

  createMarker(monster: MonsterClass) {
    let inc = 0;
    this.locList.push(monster.location);
    for(let i = 0; i < this.locList.length; i++){
      if(this.locList[i] == monster.location){
        inc++;
      }
    }
    const popupContent = `<div style="text-align: center;">
                            <strong style="text-transform: uppercase;">${monster.location}</strong><br>
                            MONSTER COUNTER: ${inc}
                          </div>`;
    const marker = L.marker([monster.latitude, monster.longitude], { icon: this.icon });
    this.markers.push(marker); // Add marker to the markers array
    marker.addTo(this.map);
    marker.bindPopup(popupContent);
  }

  removeMarker(monster: MonsterClass){
    const index = this.markers.findIndex(marker => marker.getLatLng().equals([monster.latitude, monster.longitude]));
    let inc = 0;
    for(let i = 0; i < this.locList.length; i++){
      if(this.locList[i] == monster.location){
        inc++;
      }
    }
    if (index !== -1) {
      this.map.removeLayer(this.markers[index]);
      this.markers.splice(index, 1);
      this.locList.splice(index, 1);
      const index2 = this.markers.findIndex(marker => marker.getLatLng().equals([monster.latitude, monster.longitude]));
      if(index2 !== -1){
        const popupContent = `<div style="text-align: center;">
                            <strong style="text-transform: uppercase;">${monster.location}</strong><br>
                            MONSTER COUNTER: ${inc-1}
                          </div>`;
        this.markers[index2].bindPopup(popupContent);
      }
    }
 
  }
}