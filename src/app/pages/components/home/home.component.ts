import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NoteModel } from 'src/app/shared/models/note.model';
import { NoteService } from 'src/app/shared/services/note.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import EditorJS from "@editorjs/editorjs";
import edjsParser from "@editorjs/editorjs";
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Marker from '@editorjs/marker';
import Table from '@editorjs/table';
import { AuthService } from 'src/app/core/guard/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  note_data: any = []
  current_note_data: NoteModel = new NoteModel()
  current_id: any
  last_update: any
  id = Number(this.activateRoute.snapshot.paramMap.get('id'));
  editor: any;
  current_user: any = []

  form = this.fb.group({
    id: [''],
    title: [''],
    description: [''],
    status: [''],
    user_id: ['']
  })

  constructor(
    public note_service: NoteService,
    public fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private auth_service: AuthService
  ) { }

  ngOnInit() {
    this.getAll()
    this.getById(this.id)
    this.editorJS()
    this.getCurrentUser()
  }

  getAll(){
    this.note_service.getAllNotes().subscribe({
      next: (res: any) => {
        this.note_data = res
      }, error: (err: any) => { debugger }
    })
  }

  getById(id: any){
    this.note_service.getNoteById(id).subscribe({
      next: (res: any) => {
        this.current_note_data = res
        this.router.navigate([`/note/${id}`])
        this.fillForm()
        this.fillEditorJS()
      }, error: (err: any) => { debugger }
    })
  }

  update(header: string, paragraph: string){
    this.form.controls['description'].setValue(paragraph)
    this.form.controls['title'].setValue(header)
    this.note_service.updateNote(this.current_id, this.form.value).subscribe({
      next: (res: any) => {
        this.last_update = moment().calendar();
        this.getAll()
      }, error: (err: any) => { debugger }
    })
  }

  fillEditorJS(){
    this.editor.isReady
    .then(() => {
        //draftBody = json.stringify()
        this.editor.render({
            "time" : 1550476186479,
            "blocks" : [
              {
              "type" : "header",
              "data" : {
                "text" : `${this.form.value.title}` 
              }
              },
              {
              "type" : "paragraph",
              "data" : {
                "text" : `${this.form.value.description}` 
                }
              }
            ],
            "version" : "2.18.0"
            })

        /** Do anything you need after editor initialization */
    })
    .catch((reason) => {
        console.log(`Editor.js initialization failed because of ${reason}`)
    }); 
  }

  editorJS(){
    this.editor = new EditorJS( {
      holder: 'editor-js',
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link']
        },
        list: {
          class: List,
          inlineToolbar: ['link', 'bold']
        },
        marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M'
        },
        table: Table,
      }
    });
  }

  onSave() {
    this.editor.save()
    .then((outputData) => {
      this.update(outputData.blocks[0].data.text, outputData.blocks[1].data.text)
      debugger
      }) .catch((error) => {
        console.log('Saving failed: ', error);
      }
    );
  }

  fillForm(){
    this.form.patchValue({title: this.current_note_data.title})
    this.form.patchValue({description: this.current_note_data.description})
    this.form.patchValue({status: this.current_note_data.status})
    this.form.patchValue({user_id: this.current_note_data.user_id})
    this.form.patchValue({id: this.current_note_data.id})
    this.current_id = this.form.value.id
  }

  createNote(){
    let new_note = {
      title: "",
      description: "",
      status: true,
      user_id: this.current_user.id
    }
    this.note_service.createNote(new_note).subscribe({
      next: (res: any) => {
        this.current_note_data = res
        this.router.navigate([`/note/${res.id}`])
        this.fillForm()
        debugger
      }, error: (err: any) => { debugger }
    })
  }

  async getCurrentUser(){
    this.current_user = await this.auth_service.getCurrentUser()
    debugger
  }

  logOut(){
    localStorage.clear()
    window.location.reload()
  }

}
