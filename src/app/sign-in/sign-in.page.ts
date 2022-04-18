import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from 'src/auth-constants';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  postDate = {
    phoneNum : '',
    password : ''
  };

  constructor(
    private authService : AuthService,
    private storageService : StorageService,
    private router : Router,
    private toastService : ToastService

  ) { }

  ngOnInit() { }

  validateInputs(){
    let phoneNum = this.postDate.phoneNum.trim();
    let password = this.postDate.password.trim();

    return(
      this.postDate.phoneNum && this.postDate.password && phoneNum.length > 0 && password.length > 0
    )
  }
  
  loginAction(){
    if(this.validateInputs()){
      this.authService.login(this.postDate).subscribe(
        (res : any) => {
          if(res.userData){
            this.storageService.store(AuthConstants.AUTH, res.userData);
            this.router.navigate(['home/feed']);
          }else{
           this.toastService.presentToast('Incorrect username and password')
          }
        },(error: any) => {
          this.toastService.presentToast('network Issue')
        }
      )
    } else {
      this.toastService.presentToast('Please enter username or password')
    }
  }
}
