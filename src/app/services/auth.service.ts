import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthConstants } from 'src/auth-constants';
import { HttpService } from './http.service';
// import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService : HttpService,
    // private storageService : StorageService,
    private router: Router
    ) { }

  //Auth service is a controller to connect the APIs
  login(postData : any): Observable<any> {
    return this.httpService.post('login', postData);
  }

  signUp(postData : any): Observable<any>{
    return this.httpService.post('signUp', postData);
  }

  // logOut(){
  //   this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
  //     this.router.navigate(['/sign-in'])
  //   })
  // }
}
