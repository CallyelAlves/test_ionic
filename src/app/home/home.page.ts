import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { IonicSlides, ModalController } from '@ionic/angular';
import { ModalAddTrainingComponent } from '../modal-add-training/modal-add-training.component';
import { TrainingsService } from '../services/trainings.service';

register();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public programs: Array<any> = [];
  public trainings: Array<any> = [];
  public swiperModules = [IonicSlides];
  public title: string = '';
  public imageUrl: string = '';
  public userName: string = '';

  constructor(
    private authService: AuthenticationService, 
    private router: Router,
    private modalCtrl: ModalController,
    private trainingsService: TrainingsService,
  ) {
    this.getUser().then(async () => {
      await this.getTrainings();
    });

    this.programs = [
      {
        id: 1,
        title: 'Levantamento de peso',
        imageUrl: '../../assets/images/levantamento.jpg',
        started: true
      },
      {
        id: 2,
        title: 'Yoga experimental',
        imageUrl: '../../assets/images/yoga.jpg',
        started: false
      },
      {
        id: 3,
        title: 'Boxe',
        imageUrl: '../../assets/images/boxe.jpg',
        started: true
      },
      {
        id: 4,
        title: 'Zumba',
        imageUrl: '../../assets/images/Zumba.jpg',
        started: false
      }
    ]

    this.trainings = [
      {
        id: 1,
        title: 'Yoga experimental',
        imageUrl: '../../assets/images/yoga.jpg',
      },
      {
        id: 2,
        title: 'Boxe',
        imageUrl: '../../assets/images/boxe.jpg',
      },
    ]
  }

  async getUser() {
    const user = await this.authService.getUser();
    this.userName = user?.providerData[0]?.displayName as string;
  }

  async getTrainings() {
    (await this.trainingsService.getTrainings()).forEach(doc => {
      this.trainings.push(doc.data());
    })
  }

  async logout() {
    await this.authService.signOut();
    this.router.navigate(['/login']);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  async addTraining() {
    const modal = await this.modalCtrl.create({
      component: ModalAddTrainingComponent,
    });
    modal.present();
  }

}
