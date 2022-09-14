import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { first } from 'rxjs/operators';
import {ReactiveFormsModule}from '@angular/forms'
import { User } from 'src/app/interfaces/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loading = false;
  submitted = false;
  returnUrl!: string;
  signInForm: FormGroup

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      public userService: UsersService,
      private router: Router,
     
  ) { 
    this.signInForm= this.formBuilder.group({
        email: ['', [Validators.required, Validators.minLength(3)]],
        password: ['', [Validators.required, Validators.maxLength(10)]]
      });
  }

  ngOnInit() {
     
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get email() {
    return this.signInForm.get("email");
  }

  get password() {
    return this.signInForm.get("password");
  }



  onSubmit() {
      this.submitted = true;
      let userInfo:User={
        email:this.email?.value,
        password:this.password?.value
      };
      
      // stop here if form is invalid
      if (this.signInForm.valid) {
          this.userService.login(userInfo).subscribe({
            next:(val)=>{
              
              localStorage.setItem("accessToken", val.accessToken)
            },
            error:(e)=>{
              console.log(e.error)
            },
            complete:()=>{
              console.log('complete')
              this.router.navigate(['/news'])
            }
          })
       
          
      }

    
   
        
  }
}
