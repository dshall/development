import { Component } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
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
  constructor(private fb: FormBuilder, private viewCtrl: ViewController, public navCtrl: NavController) {
        this.podForm = this.fb.group(
           {
            'signatureText': ['', Validators.required],
            'statusText': ['Successful', Validators.required]
            }
       );

  }

  savePOD() {
    this.viewCtrl.dismiss();
    console.log("Note Save")
  }

  dismiss() {
  
    this.viewCtrl.dismiss();
  }
  
}
