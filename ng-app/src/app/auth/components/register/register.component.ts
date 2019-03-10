import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from '../../services/validator.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  constructor(
    private validatorService: ValidatorService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required, this.validatorService.noWhitespaceValidator])),
      passwords: new FormGroup({
        password: new FormControl('',  Validators.compose([
          Validators.required, 
          Validators.max(32), 
          this.validatorService.noForbiddenLetters,
          this.validatorService.noDoubleLetters,
          this.validatorService.shouldBeStraightLetters,
        ])),
        confirm: new FormControl('', Validators.required)
      }, this.validatorService.matchValidator)
    });
  }

  onSubmit() {
    this.authService.registration(
      this.registerForm.value.username,
      this.registerForm.value.passwords.password,
      this.registerForm.value.passwords.confirm,
    )
    .subscribe(response => {
      console.log(response);
      this.router.navigate(['/main']);
    }, error => console.error(error));
  }

  goToLogin() {
    this.router.navigate(['auth']);
  }

}
