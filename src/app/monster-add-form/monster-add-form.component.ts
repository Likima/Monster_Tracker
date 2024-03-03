import { Component } from '@angular/core';
import { MonsterService } from '../monster.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocationsService } from '../locations.service';
import { MonsterClass } from '../monster-class.service';

@Component({
  selector: 'app-monster-add-form',
  templateUrl: './monster-add-form.component.html',
  styleUrls: ['./monster-add-form.component.css']
})

export class MonsterAddFormComponent {
  resetForm() {
    this.form.reset(); 
    this.showForm = false; 
    this.showAddForm = false;
  }
  showForm = false;
  showAddForm = false;
  form: FormGroup;
  locations: any[];
  constructor(private ms: MonsterService, private LocationsService: LocationsService){
    this.locations = LocationsService.getLocations();
    let formControls = {
      name: new FormControl('', [
        Validators.required
      ]),
      location: new FormControl('', [
        Validators.required,
      ]),
      locName: new FormControl(),
      longitude: new FormControl(),
      latitude: new FormControl(),
      description: new FormControl(),
      image: new FormControl(),
      reportedBy: new FormControl(),
      phoneNumber: new FormControl(),
    }
    this.form = new FormGroup(formControls)
  }

  ngOnInit(): void{
    this.locations = this.LocationsService.getLocations();
    this.onChange();
  }

  onSubmit(newPerson: any){
    if(newPerson.location == "Add Location"){
      this.LocationsService.addLocation(newPerson.locName, newPerson.longitude, newPerson.latitude);
      newPerson = {
        name: newPerson.name,
        location: newPerson.locName,
        longitude: newPerson.longitude,
        latitude: newPerson.latitude,
        description: newPerson.description,
        image: newPerson.image,
        reportedBy: newPerson.reportedBy,
        phoneNumber: newPerson.phoneNumber
      }
    }

    this.ms.add(newPerson);
  }
  private onChange(): void{
    this.form.get('location')?.valueChanges.subscribe(val => {
      if(val == "Add Location"){
        this.form.get('locName')?.setValidators([Validators.required]);
        this.form.get('locName')?.updateValueAndValidity();
        this.form.get('longitude')?.setValidators([Validators.required]);
        this.form.get('longitude')?.updateValueAndValidity();
        this.form.get('latitude')?.setValidators([Validators.required]);
        this.form.get('latitude')?.updateValueAndValidity();
        this.showAddForm = true;
      }
      else{
        this.form.get('locName')?.clearValidators();
        this.form.get('locName')?.updateValueAndValidity();
        this.form.get('longitude')?.clearValidators();
        this.form.get('longitude')?.updateValueAndValidity();
        this.form.get('latitude')?.clearValidators();
        this.form.get('latitude')?.updateValueAndValidity();
        this.showAddForm = false;
      }
    });
  }
}
