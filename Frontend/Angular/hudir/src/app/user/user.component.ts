import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { BACKEND_URL } from '../constants';

class User {
  username: string = "";
  id: number = 0;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  name: string = "";
  currentUser: User = new User();
  userChange: User = new User();
  isLoggedIn = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorage.getUser();
    }
    this.name = this.route.snapshot.paramMap.get('name') || "";

    this.http
      .get(
        BACKEND_URL.concat("/user/background/").concat(this.name),
        { responseType: 'arraybuffer'},
      )
      .subscribe(response => {
        const base64 = btoa(
          new Uint8Array(response).reduce(
            (data, byte) => data + String.fromCharCode(byte),'',),
          );
          let background = document.getElementById('background');
          if(background !== null){
            background.style.backgroundImage = 'linear-gradient(0deg, rgba(0,0,0,0.7931373232886905) 0%, rgba(42,43,46,0.13767513841474088) 50%, rgba(121,9,9,0) 70%), url(data:;base64,' + base64 + '), linear-gradient(0deg, rgba(0,0,0,0.7931373232886905) 0%, rgba(42,43,46,0.13767513841474088) 39%, rgba(121,9,9,0) 55%)';
          }
      });

    this.http 
      .get<User>(BACKEND_URL.concat("/user/getInfo/").concat(this.name))
      .subscribe(response => {
          this.userChange = response;
      })
  }

  upload(e: Event){
    const formData = new FormData();
    const target = e.target as HTMLInputElement;

    if(target.files !== null){
      const file = target.files[0];
      formData.append('username', this.currentUser.username);
      formData.append('image', file);
    
      const endPoint = '/user/'.concat(target.id === "fileToUpload" ? "setBackground" : "setPfp");

      this.http
        .post(BACKEND_URL.concat(endPoint), formData)
        .subscribe({
          next: () => {
            window.location.reload();
          },
          error: (err) => {
            console.log(err);
          }
        });
    }    
  }

  checkUser(){
    return this.currentUser !== undefined && this.currentUser.username === this.name;
  }

}
