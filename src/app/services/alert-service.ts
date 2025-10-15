import { Injectable, inject } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
    private alertController: AlertController = inject(AlertController);

    /* async presentAlert() {
        const alert = await this.alertController.create({
            header: 'Nueva Tarea',
            subHeader: 'Tarea creada',
            message: 'Su tarea ha sido creada con exito.',
            buttons: ['Ok']
        })

        await alert.present();
    }
    */

    async showAlert(headerText: string, subHeaderText: string, messageText: string) {
        const alert = await this.alertController.create({
            header: headerText,
            subHeader: subHeaderText,
            message: messageText,
            buttons: ['OK']
        })
        await alert.present();
    }

    async showConfirmAlert(
        textHeader: string,
        textMessage: string,
        functionOk: Function,
        textOk: string,
        textCancel: string,
    ) {
        const alert = await this.alertController.create({
            header: textHeader,
            message: textMessage,
            buttons: [
                {
                    text: textOk,
                    handler: () => {
                        functionOk()
                    }
                },
                {
                    text: textCancel,
                    role: 'cancel',
                }
            ]
        })

        await alert.present();
    }
}
