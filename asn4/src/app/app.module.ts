import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MonsterComponent } from './monster/monster.component';
import { MonsterListComponent } from './monster-list/monster-list.component';
import { MonsterAddFormComponent } from './monster-add-form/monster-add-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonsterInfoComponent } from './monster-info/monster-info.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MonsterComponent,
    MonsterAddFormComponent,
    MonsterListComponent,
    MonsterInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
