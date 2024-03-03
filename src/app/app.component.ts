import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MonsterService } from './monster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'maps';
  constructor(private http: HttpClient, private ms: MonsterService){}
  ngOnInit(): void {
    this.http.get<any[]>('https://272.selfip.net/apps/4remj5i1jO/collections/monsters/documents/').subscribe((data: any[]) => {
      for(let x = 0 ; x < data.length ; x++){
        this.ms.add(data[x].data, true);
      }
    });
  }

}
