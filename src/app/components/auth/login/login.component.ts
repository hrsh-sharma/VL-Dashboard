import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Login } from '../../../shared/action/auth.action';
import { SettingState } from '../../../shared/state/setting.state';
import { Values } from '../../../shared/interface/setting.interface';
import { LoginFormConfig } from '../../../shared/components/ui/login-form/login-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  public form: FormGroup;
  public reCaptcha: boolean = true;
  public loginFormConfig: LoginFormConfig = {
    showForgotPassword: true,
    showSignUp: true,
    showReCaptcha: true,
    forgotPasswordLink: '/auth/forgot-password',
    signUpLink: '/auth/register',
    welcomeTitle: 'welcome_to_store',
    subtitle: 'log_in_your_account',
    buttonText: 'log_in',
    emailPlaceholder: 'email_address',
    passwordPlaceholder: 'password'
  };

  @Select(SettingState.setting) setting$: Observable<Values>;

  constructor(
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // Initialize form - will be replaced by login-form component
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      recaptcha: new FormControl(null, Validators.required),
    });
    
    // Subscribe to settings to update reCaptcha configuration
    this.setting$.subscribe(setting => {
      if((setting?.google_reCaptcha && !setting?.google_reCaptcha?.status) || !setting?.google_reCaptcha) {
        this.reCaptcha = false;
        this.loginFormConfig.showReCaptcha = false;
        if (this.form && this.form.get('recaptcha')) {
          this.form.removeControl('recaptcha');
        }
      } else {
        this.reCaptcha = true;
        this.loginFormConfig.showReCaptcha = true;
        if (this.form && !this.form.get('recaptcha')) {
          this.form.addControl('recaptcha', new FormControl(null, Validators.required));
        }
      }
    });
  }

  onFormReady(form: FormGroup) {
    this.form = form;
    // Update reCaptcha control based on current settings
    this.setting$.subscribe(setting => {
      if((setting?.google_reCaptcha && !setting?.google_reCaptcha?.status) || !setting?.google_reCaptcha) {
        if (this.form.get('recaptcha')) {
          this.form.removeControl('recaptcha');
        }
        this.reCaptcha = false;
        this.loginFormConfig.showReCaptcha = false;
      } else {
        if (!this.form.get('recaptcha')) {
          this.form.addControl('recaptcha', new FormControl(null, Validators.required));
        }
        this.reCaptcha = true;
        this.loginFormConfig.showReCaptcha = true;
      }
    });
  }

  submit(form?: FormGroup) {
    const formToSubmit = form || this.form;
    if (formToSubmit) {
      formToSubmit.markAllAsTouched();
      if(formToSubmit.valid) {
        this.store.dispatch(new Login(formToSubmit.value)).subscribe({
            complete: () => { 
              this.router.navigateByUrl('/dashboard'); 
            }     
          }
        );
      }
    }
  }
  
}
