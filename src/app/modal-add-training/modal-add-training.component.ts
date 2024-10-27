import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { TrainingsService } from '../services/trainings.service';

@Component({
  selector: 'app-modal-add-training',
  templateUrl: './modal-add-training.component.html',
  styleUrls: ['./modal-add-training.component.scss'],
})
export class ModalAddTrainingComponent  implements OnInit {
  name: string | undefined;
  image: string | undefined;

  constructor(
    private modalCtrl: ModalController, 
    private trainings: TrainingsService, 
    private toast: ToastController, 
  ) { }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  
  confirm() {
    this.addTraining();
  }

  addTraining() {
    this.trainings.addTraining({userId: "", title: this.name, imageUrl: this.image}).then(async () => {
      const toast = await this.toast.create({
        message: "Treino adicionado com sucesso!",
        duration: 2000
      })

      await toast.present();
      await this.modalCtrl.dismiss();
      window.location.reload();
    }).catch(async (error) => {
      const toast = await this.toast.create({
        message: error,
        duration: 2000
      })

      toast.present();
    })
  }
}
