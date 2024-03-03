import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Location {
  name: string;
  count: number;
  longitude: number;
  latitude: number;
  constructor(name: string, count: number, longitude: number, latitude: number){
    this.name = name;
    this.count = count;
    this.longitude = longitude;
    this.latitude = latitude;
  }
}

@Injectable({
  providedIn: 'root'
})

export class LocationsService {
  Locations: Location[];
  private counter = 0;
  constructor(private http: HttpClient) { 
    this.Locations = [
      new Location("Metrotown", 0, -123.0076, 49.2263),
      new Location("Stanley Park", 0, -123.148155, 49.300054),
      new Location("SFU Burnaby", 0, -122.9199, 49.2781)
    ];
  }
  getLocations(){
    return this.Locations;
  }
  addLocation(location: string, longitude: number, latitude: number){
    this.Locations.push({name: location, count: 1, longitude: longitude, latitude: latitude});
    this.http.post('https://272.selfip.net/apps/4remj5i1jO/collections/locations/documents/',{
      "key": this.counter.toString(),
      "data": {
        "name": location,
        "longitude": longitude,
        "latitude": latitude
      }
    });
    this.counter++;
  }
  deleteLocation(location: Location){
    this.counter--;
    this.Locations = this.Locations.filter((l) => {
      return l.name != location.name;
    });
  }
  ngOninit(): void{
    this.http.get<any[]>('https://272.selfip.net/apps/4remj5i1jO/collections/locations/documents/').subscribe((data: any[]) => {
      for(let x = 0 ; x < data.length ; x++){
        this.addLocation(data[x].data.name, data[x].data.longitude, data[x].data.latitude);
      }
    });
  }
}
