import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {Observable, from} from 'rxjs';
import {DocumentService} from '../../document.service'
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  title="fileupload"
 images:File;
 img="";
 detail;
 image;
 username;
 user;
 result;
  constructor( private documentservice:DocumentService, private http:HttpClient) {
    this.documentservice.newdata().subscribe(data =>{
      this.detail =  data.result;
      this.image = data.result;
      var hui;
      data.result.image.slice(' http://localhost:4200')

    })
    this.documentservice.newProfileImage().subscribe(data=>{
      console.log(data)
      this.image=data;

    })
   }

  ngOnInit() {
    this.username=(JSON.parse(localStorage.test).data.result.email);
    this.documentservice.fetchdata(this.username)


  }
  changeImage(profileImage){
    var imgh = profileImage.target.files[0]
    // console.log(imgh)
    const formData = new FormData();
    formData.append('file',imgh)
    formData.append('file',this.username)
    this.http.post<any>('http://localhost:1993/file',formData).subscribe(
      (req)=> {console.log(req)
       console.log(req.path.slice(15))
       this.image=req.path.slice(15);
       console.log(this.image)
       this.documentservice.profileImage({username:this.username,image:this.image});
      },
      (error)=>console.log(error)

      )
  }
}
