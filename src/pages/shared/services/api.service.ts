import { Injectable} from '@angular/core';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Http, Response, Headers} from '@angular/http';

import { JwtService } from '../services/jwt.service';


@Injectable()
export class ApiService {
  api_url = 'http://ws2.deluxedelivery.com/api/couriers/';
  pod_api_url = 'https://deluxe-pod.firebaseio.com/';
  urlParam: string = '';
  // private currentUserSubject = new BehaviorSubject<Job>(new Job());
  constructor(private http: Http, private jwtService: JwtService) {}

  private setHeaders(): Headers {
    const headersConfig = {
      'Content-Type': 'application/json; charset=UTF-8, authorization',
      'Access-Control-Request-Method': 'GET, POST, PUT, DELETE, OPTIONS',
      'Accept': 'application/json'
    };


    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Token ${this.jwtService.getToken()}`;
    }
    return new Headers(headersConfig);
  }
  
  sendPOD(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${this.pod_api_url}${path}/`,  JSON.stringify(body))
    .catch(this.handleError)
    .map( (response: Response) => response.json() );
  }
  get(id: string, password: string): Observable<any> {
    return this.http.get(`${this.api_url}${this.urlParam='getlogin'}/` +  id  +'/' +  password )
      .map((response: Response) => response.json())
      .do((data) => console.log(data))
      .catch(this.handleError);
  }


  getById(courierId:string): Observable<any> {
    return this.http.get(`${this.api_url}${this.urlParam= 'OutstandingJobs'}/${courierId}` )
      .map((response: Response) => response.json())
      .do((data) => console.log(data))
      .catch(this.handleError);
  }

 post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${this.api_url}${path}/`,  JSON.stringify(body),  { headers: this.setHeaders() })
      .catch(this.handleError)
      .map( (response: Response) => response.json() );

  }
  private handleError(error:any) {

    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
