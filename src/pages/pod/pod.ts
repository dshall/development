import { Component } from '@angular/core';
import { ToastController, ViewController, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as SignaturePad from 'signature_pad';

// import { Toast } from '@ionic-native/toast';

import { ApiService } from '../shared/services/api.service';
@Component({
  selector: 'page-pod',
  templateUrl: 'pod.html'
})
export class PodPage {
  podForm: FormGroup;
  isNoteDisabled = false;
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
      checkTicketState: string[] ;
      podTickets: string[];
      currentTicketNo: string[];

  constructor(private fb: FormBuilder, private viewCtrl: ViewController, public navCtrl: NavController, private navparam: NavParams, 
    private apiService: ApiService, private toastController: ToastController ) {
         this.podTickets = this.navparam.get('param');
         this.checkTicketState = this.navparam.get('state');
        //  this.currentTicketNo = this.navparam.get('ticketNo');
        //  this.podTickets = this.currentTicketNo;
        console.log(navparam.get('param'));
        this.podForm = this.fb.group(
           {
            'ticketNo':[ `${this.podTickets}` , Validators.required] ,
            'signatureName': ['', Validators.required],
            'signatureScript': ['', Validators.required],
            'statusText': ['Successful', Validators.required],
            'note': ['', Validators.minLength(10)],
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
      },
      (error) => {console.log("Error sending pod" +error); }
    )
  }

  dismiss() {
  
    this.viewCtrl.dismiss();
  }
  
  writeNote() {
    this.isNoteDisabled = true;
    this.podForm.addControl('note', new FormControl());
  }
  ionViewLoaded() {

  }
}
