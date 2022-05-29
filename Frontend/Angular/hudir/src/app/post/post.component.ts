import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BACKEND_URL } from '../constants';
import { TokenStorageService } from '../_services/token-storage.service';

class User {
  username: string = "";
  id: number = 0;
}

class Comment {
  id: number = 0;
  content: string = "";
  user: User = new User();
}

class Post  {
  name: string = "";
  description: string = "";
  likes: number = 0;
  user: User = new User();
};

type CommentResponse = {
  comments: Comment[];
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostComponent implements OnInit {

  form: any = {
    newComment: ""
  }
  postId: string = "";
  loading: boolean = true;
  post: Post = new Post();
  comments: Comment[] = [];
  currentUser: User = new User();
  number: number = 9;
  isLoggedIn = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorage.getUser();
      console.log(this.tokenStorage.getUser());
    }
    this.postId = this.route.snapshot.paramMap.get('postId') || "";

    const postRequest = this.http.get<Post>(BACKEND_URL.concat("/post/getPost/").concat(this.postId),);
    const commentRequest = this.http.get<CommentResponse>(BACKEND_URL.concat("/comment/getCommentsForPost/").concat(this.postId),);

    forkJoin([postRequest, commentRequest]).subscribe({
      next: (res) => {
        this.post = res[0];
        this.comments = res[1].comments;
        console.log(res[1]);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  submit(): void{
    const data = {
        content: this.form.newComment,
        userId: this.currentUser.id,
        postId: this.postId
    };
    console.log(data);
    this.http.post(BACKEND_URL.concat('/comment/postComment/'), data)
      .subscribe({
        next: () => {
          window.location.reload();
        },
        error: (err) => {
          console.log(err);
        } 
      })
  }


  auto_grow(e: { target: { style: { height: string; }; scrollHeight: any; }; }): void{
    e.target.style.height = "5px";
    e.target.style.height = (e.target.scrollHeight)+"px";
  }

}
