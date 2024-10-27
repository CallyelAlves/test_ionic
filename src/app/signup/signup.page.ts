import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  public form!: FormGroup;
  constructor(
    private formBuild: FormBuilder,
    private loading: LoadingController,
    private authService: AuthenticationService,
    private router: Router,
    private toastController: ToastController,
  ) { }

  ngOnInit() {
    this.form = this.formBuild.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async signup() {
    const loading = await this.loading.create();
    await loading.present();

    if (this.form.valid) {
      const user = await this.authService.saveUser(this.form.value.email, this.form.value.password).catch(error => {
        console.log(error);
        loading.dismiss();
      })

      if (user) {
        await this.authService.updateProfile(user, this.form.value.name);
        loading.dismiss();
        this.router.navigate(['/home']);
      }
    } else {
      loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Preencha todos os campos corretamente.',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }

  get errorControl() {
    return this.form.controls;
  }

}
