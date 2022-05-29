import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { forkJoin } from 'rxjs';
import { BACKEND_URL } from '../constants';

type Posts = {
  posts: Post[];
};

type Post = {
  id: string;
  name: string;
  description: string;
  path: string;
  likes: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit {

  @Input() from = '';
  @Input() currentPost = '';
  @Input() username = '';
  @Input() number = -1;

  posts: Post[] = [];
  images: ArrayBuffer[] = [];
  loading =  true;
  userPostSquare = 'user-post-square';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    var endpoint = BACKEND_URL.concat("/post/");
    if(this.from === "user"){
      endpoint = endpoint.concat("getPostsFromUser/").concat(this.username);
    }
    if(this.from === "all"){
      endpoint = endpoint.concat("allPosts/");
    }
    this.http.get<Posts>(endpoint)
      .subscribe(res => {
        console.log(res.posts);
        let filterPosts: Post[] = [];
        let requests = [];
        for(var i = 0; i < res.posts.length; i++){
          if(res.posts[i].id === this.currentPost) continue;
          if(i === this.number) break;
          filterPosts.push(res.posts[i]);
          requests.push(
            this.http.get(
                BACKEND_URL.concat("/post/getPostPicture/").concat(res.posts[i].id),
                { responseType: 'arraybuffer'},
            ) 
          );
        }
        this.posts = filterPosts;
        forkJoin(requests).subscribe({
          next: (responses) =>{
            for(var i = 0; i < responses.length; i++){
              this.images.push(responses[i]);
            }
          }, 
          error: (err) => {
            console.log(err);
          }, 
          complete: () => {
            this.loading = false;
          }});
      })
  }

}
