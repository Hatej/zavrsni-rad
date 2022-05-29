import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BACKEND_URL } from '../constants';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() endpoint = '';
  @Input() className = '';
  @Input()
  image!: ArrayBuffer;

  source = "";

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if(this.endpoint === ''){
      const base64 = btoa(
        new Uint8Array(this.image).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            '',
        ),
      );
      this.source = this.sanitizer.bypassSecurityTrustUrl("data:;base64," + base64) as string;
    } else {
      this.http.get(
        BACKEND_URL.concat(this.endpoint),
        { responseType: 'arraybuffer'}
        ).subscribe(res => {
          const base64 = btoa(
            new Uint8Array(res).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                '',
            ),
        );
        this.source = this.sanitizer.bypassSecurityTrustUrl("data:;base64," + base64) as string;
      })
    }
  }

}
