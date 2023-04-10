import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  
  form = this.fb.group({
    login: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required]
  })

  token;

  constructor(
    public fb: FormBuilder,
    public auth_service: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  signin(){
    let body = {
      login: this.form.value.login,
      password: this.form.value.password,
      name: this.form.value.name,
      surname: this.form.value.surname
    }
    this.auth_service.signUp(body).subscribe({
      next: (res: any) => {
        localStorage.setItem("token", res.token)
        this.router.navigate(['/sign-in'])
      }, error: (err: any) => { debugger }
    })
  }

}
