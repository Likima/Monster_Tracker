import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MonsterClass } from '../monster-class.service';
import { MonsterService } from '../monster.service';

@Component({
  selector: 'app-monster',
  templateUrl: './monster.component.html',
  styleUrls: ['./monster.component.css']
})

export class MonsterComponent {
  @Input() monster!: MonsterClass; // Add the '!' non-null assertion operator

  @Output() delete = new EventEmitter();
  @Output() info = new EventEmitter();

  constructor(private ms: MonsterService) { }

  onDeleted(per_to_be_deleted:number) {
    this.delete.emit(per_to_be_deleted);
  }

  onInfo(per_to_be_infoed:number){
    this.info.emit(per_to_be_infoed);
  }
}
