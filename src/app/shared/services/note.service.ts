import { Injectable, Injector } from '@angular/core';
import { environment } from "src/environments/environment";
import { NoteModel } from '../models/note.model';
import { BaseResourceService } from './base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService extends BaseResourceService<NoteModel>{

  baseApiUrl = `${environment.api}/api/${environment.version}/notes`
  constructor(protected override injector: Injector) {
    super(`${environment.api}/api/${environment.version}/notes`, injector, NoteModel.fromJson)
  }

  getAllNotes() {
    return this.http.get<any[]>(`${this.baseApiUrl}`)
  }

  getNoteById(id: any) {
    return this.http.get<any[]>(`${this.baseApiUrl}/${id}`)
  }

  updateNote(id: any, body: any) {
    return this.http.patch(`${this.baseApiUrl}/${id}`, body)
  }

  createNote(body: any){
    return this.http.post(`${this.baseApiUrl}`, body)
  }

}
