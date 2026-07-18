import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

export interface LoginFormConfig {
  showForgotPassword?: boolean;
  showSignUp?: boolean;
  showReCaptcha?: boolean;
  forgotPasswordLink?: string;
  signUpLink?: string;
  welcomeTitle?: string;
  subtitle?: string;
  buttonText?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
}

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  
  @Input() config: LoginFormConfig = {
    showForgotPassword: true,
    showSignUp: true,
    showReCaptcha: false,
    forgotPasswordLink: '/auth/forgot-password',
    signUpLink: '/auth/register',
    welcomeTitle: 'welcome_to_store',
    subtitle: 'log_in_your_account',
    buttonText: 'log_in',
    emailPlaceholder: 'email_address',
    passwordPlaceholder: 'password'
  };

  @Input() formGroup: FormGroup;
  @Input() reCaptcha: boolean = false;
  
  @Output() formSubmit = new EventEmitter<FormGroup>();
  @Output() formReady = new EventEmitter<FormGroup>();

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    if (this.formGroup) {
      this.form = this.formGroup;
    } else {
      this.form = this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        recaptcha: new FormControl(null, this.config.showReCaptcha ? Validators.required : null)
      });
    }
    this.formReady.emit(this.form);
  }

  onSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
    }
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.formSubmit.emit(this.form);
    }
  }

  get emailControl() {
    return this.form.get('email');
  }

  get passwordControl() {
    return this.form.get('password');
  }

  get recaptchaControl() {
    return this.form.get('recaptcha');
  }
}

