import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Job} from "../models/jobs.model";
import {Observable} from "rxjs/Observable";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {ApiService} from "./api.service";
import {JwtService} from "./jwt.service";



@Injectable()
export class CourierService {
  credentials: Job[];
  errorMessage: string;
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  private currentCourierSubject = new BehaviorSubject(Job);
  public currentCourier = this.currentCourierSubject.asObservable().distinctUntilChanged();
  public currentJobs:any = {};
  public courierJobData = {};

  constructor(public http: Http, public apiService: ApiService,  private jwtService: JwtService) {}

  attemptAuth(id, password): Observable<any> {
    return this.apiService.get(id , password)
      .map(
        (data: Response) => {
          this.setAuth(data)
          return data;
        } ,
        (error) => { this.errorMessage = error }
      )
  }

  getCurrentCourier(): any {
    return this.currentCourierSubject.value;
  }

//  listCourierJobs(courierId) {
//     return this.apiService.getById(courierId)
//       .map(
//         (data:Response) => {
//           return data;
//       },
//         (error) => {this.errorMessage = error }
//       )
//  }

listCourierJobs(courierId, forceRefresh: boolean = false): Observable<any> {

  if (!forceRefresh && this.courierJobData[courierId]) {
     this.currentJobs = this.courierJobData[courierId];
     console.log("No Need to make HTTP call to return the data" +  this.courierJobData[courierId]);
     return Observable.of(this.currentJobs);
  }
  console.log("**about to make HTTp Call for new jobs");
  return this.apiService.getById(courierId)
    .map(
      (response:Response) => {
        this.courierJobData[courierId] = response;
        this.currentJobs = this.courierJobData[courierId]; 
        return this.currentJobs;
    },
      (error) => {this.errorMessage = error }
    )
}
 refreshAllJob() {
   return this.listCourierJobs(this.currentJobs.CourierId, true);
 }
  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate(id) {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.apiService.getById(id)
        .subscribe(
          (data) => this.setAuth(data),
          (error) => this.purgeAuth()
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }
  setAuth(courier: any) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(courier.token);
    // Set current courier data into observable
    this.currentCourierSubject.next(courier);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }
  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentCourierSubject.next(Job);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentCourier');
  }

}
