import { Component, OnInit, Input } from '@angular/core';
import { Move } from 'src/app/modals/move.interface';

@Component({
  selector: 'move-list',
  templateUrl: './move-list.html',
  styleUrls: ['./move-list.component.scss']
})
export class MoveListComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

  @Input() moves: Move[]
  @Input() showOnly: number

  get slicedMoves() {
    return this.showOnly ? this.moves.slice(0, this.showOnly) : this.moves
  }

  dateToString(date) {
    date = new Date(date)
    return date.toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })
  }

}


