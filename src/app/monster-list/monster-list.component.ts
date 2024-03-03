import { Component, OnInit } from '@angular/core';
import { MonsterService } from '../monster.service';
import { MatDialog } from '@angular/material/dialog';
import { MonsterInfoComponent } from '../monster-info/monster-info.component';
import { MonsterClass } from '../monster-class.service';

@Component({
  selector: 'app-monster-list',
  templateUrl: './monster-list.component.html',
  styleUrls: ['./monster-list.component.css'],
})
export class MonsterListComponent implements OnInit{
  monster: MonsterClass[];
  constructor(private ms:MonsterService, public dialog: MatDialog) {
    this.monster = []
  }

  displayInfo(monster:MonsterClass): void{
    this.dialog.open(MonsterInfoComponent, {
      data: monster
    });
  }

  onMonsterDeleted(delete_monster: number): void {
    const password = window.prompt('Please enter your password:');

    this.ms.verifyPassword(password ?? "").then((valid) => {
      if (valid){
        this.monster = this.ms.delete(delete_monster);
      } else {
        window.alert('Incorrect password!');
      }
    })
  }

  onMonsterInfo(info_person: number): void {
    const monsterInfo = this.ms.info(info_person);
    if (monsterInfo) {
      this.displayInfo(monsterInfo);
    }
  }

  ngOnInit(): void {
    this.monster = this.ms.get();
  }

  onSortChange(evt: any): void {
    const value = evt.target.value;
    this.ms.sort(value);
  }
}
