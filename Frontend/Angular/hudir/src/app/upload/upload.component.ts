import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { BACKEND_URL } from '../constants';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

class User {
  username: string = "";
  id: number = 0;
}

type Post = {
  id: string;
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UploadComponent implements OnInit {

  postForm: any = {
    postName: "",
    descirption: ""
  };
  image!: File;
  preview: string = "";
  message: string = "";
  objectUrl: string = "";
  currentUser: User = new User();
  isLoggedIn = false;

  constructor(
    private http: HttpClient, 
    private tokenStorage: TokenStorageService, 
    private _router: Router, 
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorage.getUser();
      console.log(this.tokenStorage.getUser());
    }
  }

  ngOnDestroy(): void {
    URL.revokeObjectURL(this.objectUrl);
  }

  onSubmit(): void{
    this.message = "";
    const formData = new FormData();
    formData.append('name', this.postForm.postName);
    formData.append('description', this.postForm.description);
    formData.append('userId', this.currentUser.id.toString());
    formData.append('image', this.image);

    this.http
        .post<Post>(BACKEND_URL.concat('/post/upload'), formData)
        .subscribe({
          next: response => {
            console.log(response);
            this._router.navigateByUrl('/post/'.concat(response.id))
              .then(() => {
                window.location.reload();
              });
        },
        error: err => {
            console.log(err);
        }});
  };

  newImage(e: Event): void{
    const target = e.target as HTMLInputElement;
    if(target.files !== null){
      this.image = target.files[0];
      this.objectUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.image)) as string;
      console.log(this.objectUrl);
      this.preview = this.objectUrl;
    }
  }

  showPreview() {
    return this.preview !== "";
  }
}
