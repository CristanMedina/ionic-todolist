import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonLabel,
    IonList,
    IonItemSliding,
    IonItemOption,
    IonItemOptions,
    IonReorderGroup,
    IonReorder } from '@ionic/angular/standalone';
import { AlertService } from 'src/app/services/alert-service';
import { ReorderEndCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonReorder, IonReorderGroup,
        IonItemOptions,
        IonItemOption,
        IonItemSliding,
        IonList,
        IonLabel,
        IonIcon,
        IonButton,
        IonInput,
        IonItem,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        FormsModule
    ],
})
export class HomePage {
    task: string = '';
    tasks: string[] = [];

    public alertService: AlertService = inject(AlertService);

    constructor() {
        addIcons({
            pencilOutline,
            trashOutline
        });
    }

    addTask(){
        console.log("La tarea es: " + this.task);

        if(this.task.trim() === this.tasks.find(t => t === this.task.trim())){
            this.alertService.showAlert('Error', 'Tarea duplicada', `La tarea ${this.task} ya existe.`);
        } else {
            this.tasks.push(this.task);
            this.alertService.showAlert('Tarea creada', 'La siguiente tarea fue creada con exito:', this.task);
        }

        this.task = '';
        console.log(this.tasks);
    }

    confirmDelete(task: string){
        this.alertService.showConfirmAlert(
            "Eliminar Tarea",
            "¿Estas seguro que deseas eliminar la tarea?",
            () => this.deleteTask(task),
            "Eliminar",
            "Cancelar"
        );
    }

    deleteTask(task: string){
        console.log(`Eliminando la tarea: ${task}`);
        let index = this.tasks.findIndex(t => t === task);
        this.tasks.splice(index,1);
        this.alertService.showAlert('Tarea eliminada', 'La siguiente tarea fue eliminada con exito', task);
    }

    updatePosition(event: ReorderEndCustomEvent) {
        console.log(event);
        this.tasks = event.detail.complete(this.tasks);
        console.log(this.tasks);
    }

}
