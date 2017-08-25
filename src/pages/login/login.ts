import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourierService } from "../shared/services/courier.service";

import { HomePage } from "../home/home";




@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  authForm: FormGroup;
  responseId: any;
  responsePassword: any;
  responseData: any;
  errorMessage: string;
  authCrendentials = { "id": "", "password": "" };
  constructor(public navCtrl: NavController, private fb: FormBuilder, private courierService: CourierService) {
    this.authForm = this.fb.group({
      'jobId': ['', Validators.required],
      'password': ['', Validators.required],
    }
    );
  }

  authenticate() {
    // `${credentials.jobId}/` + `${credentials.password}`
    const credentials = this.authForm.value;
    console.log("credentials:" + JSON.stringify(credentials));
    // console/log("Username:" + credentials.jobId);
    if (credentials != null) {    // check if credentials were entered in the form

      this.courierService.attemptAuth(`${credentials.jobId}`, `${credentials.password}`)
        .subscribe(
        data => {
          this.responseData = data;
          if (credentials.jobId == this.responseData.Id && credentials.password == this.responseData.Password) {  //  we can now check credentials against database

            this.goToHome(); //navigate to the home page iff credentials match
          }
        }
        );
    }
  }


  goToHome() {
    this.navCtrl.push(HomePage, this.responseData.Id );
    this.navCtrl.popToRoot;
  }

  ngOnInit() {
    // this.courierService.populate(this.responseData.Id);
  }
}
