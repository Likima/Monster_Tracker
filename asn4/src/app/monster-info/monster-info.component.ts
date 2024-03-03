import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MonsterService } from '../monster.service';
import { MonsterClass } from '../monster-class.service';

@Component({
  selector: 'app-monster-info',
  templateUrl: './monster-info.component.html',
  styleUrls: ['./monster-info.component.css']
})
export class MonsterInfoComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public monster: MonsterClass, private ms: MonsterService) { }
    
    closeMonster(evt: any, monsterID: number){
      const password = window.prompt('Please enter your password:');
      this.ms.verifyPassword(password ?? "").then((valid) => {
        if (valid) {
          this.ms.closeMonster(monsterID);
        } else {
          window.alert('Incorrect password!');
        }
      })
    }
    
    ngOnInit(): void {}
}
