import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorService } from '../../services/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  constructor(
    private validatorService: ValidatorService,
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

}
