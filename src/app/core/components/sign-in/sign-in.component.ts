import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NoteService } from 'src/app/shared/services/note.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form = this.fb.group({
    login: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  token;
  note_data: any = []

  constructor(
    public fb: FormBuilder,
    public auth_service: AuthService,
    public router: Router,
    public note_service: NoteService
  ) { }

  ngOnInit() {
  }

  signin(){
    let body = {
      login: this.form.value.login,
      password: this.form.value.password
    }
    this.auth_service.signIn(body).subscribe({
      next: (res: any) => {
        localStorage.setItem("token", res.token)
        this.getAll()
        this.router.navigate(['/note/2'])
      }, error: (err: any) => { debugger }
    })
  }

  navigate(url: string){
    this.router.navigate([`${url}`])
  }

  getAll(){
    this.note_service.getAllNotes().subscribe({
      next: (res: any) => {
        debugger
        this.note_data = res
      }, error: (err: any) => { debugger }
    })
  }

}
