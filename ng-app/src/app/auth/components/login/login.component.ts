import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from '../../services/validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm;
  constructor(
    private validatorService: ValidatorService
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
    console.log(this.loginForm.value);
  }

}
