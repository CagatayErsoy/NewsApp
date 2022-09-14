import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import {User} from '../../interfaces/user'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  currentUsers:any
  register!: FormGroup;
  emailExists: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService
  ) {
    
   }

  ngOnInit(): void {
    this.register= this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
     
    });

  }
  get email() {
    return this.register.get("email");
  }

  get password() {
    return this.register.get("password");
  }

  get repeatPassword() {
    return this.register.get("repeatPassword");
  }
  onRegister(){
    if(this.password?.value==this.repeatPassword?.value){
     
      let userInfo:User={
        username: this.email?.value.substring(0, this.email?.value.indexOf("@")),
        email: this.email?.value,
        password:  this.password?.value,
        role:"USER"
        
      }
      this.userService.register(userInfo).subscribe(console.log)
     
    }
    else {console.log("password doesn't match")}
  }
}
