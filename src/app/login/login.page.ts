import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { AuthErrorCodes } from 'firebase/auth'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public formLogin!: FormGroup<any>;
  constructor(
    private formBuild: FormBuilder,
    private loading: LoadingController,
    private authService: AuthenticationService,
    private router: Router,
    private toast: ToastController
  ) { }

  ngOnInit() {
    this.formLogin = this.formBuild.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async login() {
    const loading = await this.showLoading();
  
    try {
      if (!this.formLogin.valid) {
        await this.showToast('Preencha os dados corretamente');
        return;
      }
  
      const user = await this.authService.loginUser(
        this.formLogin.value.email,
        this.formLogin.value.password
      );
  
      if (user) {
        this.router.navigate(['/home']);
      }
    } catch (error) {
      this.handleError(error);
    } finally {
      loading.dismiss();
    }
  }

  private async showLoading(): Promise<HTMLIonLoadingElement> {
    const loading = await this.loading.create();
    await loading.present();
    return loading;
  }

  private async showToast(message: string) {
    const toast = await this.toast.create({
      message,
      duration: 2000
    });
    await toast.present();
  }
  
  private async handleError(error: any) {
    console.log(error);
    if (error.message.includes(AuthErrorCodes.INVALID_LOGIN_CREDENTIALS)) {
      await this.showToast('Usuário ou senha incorreto.');
    } else {
      await this.showToast('Ocorreu um erro. Tente novamente.');
    }
  }

  get errorControl() {
    return this.formLogin.controls;
  }

}
