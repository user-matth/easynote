import { Component, OnInit } from '@angular/core';
import { NoteModel } from 'src/app/shared/models/note.model';
import { NoteService } from 'src/app/shared/services/note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  note_data: NoteModel = new NoteModel

  constructor(
    public note_service: NoteService
  ) { }

  ngOnInit() {
    this.getById(4)
  }

  getAll(){
    this.note_service.getAllNotes().subscribe({
      next: (res: any) => {
        this.note_data = res
        debugger
      }, error: (err: any) => { debugger }
    })
  }

  getById(id: any){
    this.note_service.getNoteById(id).subscribe({
      next: (res: any) => {
        this.note_data = res
        debugger
      }, error: (err: any) => { debugger }
    })
  }

}
