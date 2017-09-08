import { Component } from '@angular/core';
import { ToastController, ViewController, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from '@ionic-native/toast';

import { HomePage } from '../home/home';
import { ApiService } from '../shared/services/api.service';
@Component({
  selector: 'page-pod',
  templateUrl: 'pod.html'
})
export class PodPage {
  podForm: FormGroup;
  statusOptions: string[] = [ 
      'Onboard',
      'Successful',
      'Attempted Delivery',
      '2nd Attempt',
      'Scanned at Pickup Point',
      'At DDs Site',
      'At DDS Depot',
      'Dispache Connection',
      'No Pickup Connection',
      'Paperwork Completed',
      'Received Pending',
      'Semi Completed'
      ];
  
  constructor(private fb: FormBuilder, private viewCtrl: ViewController, public navCtrl: NavController, private navparam: NavParams, 
    private apiService: ApiService, private toastController: ToastController ) {
        let podTickets: string[] = this.navparam.get('param');
      
        console.log(navparam.get('param'));
        this.podForm = this.fb.group(
           {
            'ticketNo': [ `${podTickets}`, Validators.required],
            'signatureName': ['Sign by', Validators.required],
            'signatureScript': ['Successful', Validators.required],
            'statusText': ['Successful', Validators.required]
            }
       );

  }

  savePOD() {
   let  podValues = this.podForm.value;
    this.apiService.sendPOD('deluxe-pod.json', podValues)
    .subscribe(
      (data) => { 
        data.json; 
       let toast =  this.toastController.create({
           message: `POD successfully Completed`, 
           duration: 3500,
           position: 'bottom'
        });
        toast.present();
        console.log("Data Successfully sent"); 
        this.podForm.reset();
        this.navparam.get('state')
      },
      (error) => {console.log("Error sending pod" +error); }
    )
  }

  dismiss() {
  
    this.viewCtrl.dismiss();
  }
  
}
