import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from '../../services/validator.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public showAlert = null;
  constructor(
    private validatorService: ValidatorService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.compose([Validators.required, this.validatorService.noWhitespaceValidator])),
      password: new FormControl('', Validators.compose([
        Validators.required, 
        Validators.max(32), 
        this.validatorService.noForbiddenLetters,
        this.validatorService.noDoubleLetters,
        this.validatorService.shouldBeStraightLetters,
      ])),
    });
  }

  onSubmit() {
    this.showAlert = null;
    this.authService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    )
    .subscribe(response => {
      this.router.navigate(['/main']);
    }, error => {
      console.error(error);
      this.showAlert = "Wrong username or password";
    });
  }

  goToRegister() {
    this.router.navigate(['auth/register']);
  }
}
