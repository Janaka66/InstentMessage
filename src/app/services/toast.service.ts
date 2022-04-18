import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public tostController : ToastController) { }

  async presentToast(infoMessage : string){

    const toast = await this.tostController.create({
      message : infoMessage,
      duration : 2000
    });

    toast.present();
  }
}
