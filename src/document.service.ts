import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  user:String;
  fileString:any= "";
  views:Array<{user:String, message:String}>=[]
  constructor(private socket: Socket,) {
    console.log(this.views)
   }
  

 
  users(data){
    this.socket.emit("users",data)
  }
  allusers(){
    let observable = new Observable<{users}>(observer=>{
      this.socket.on('all users',(data)=>{
        observer.next(data);
      })
      return ()=>{this.socket.disconnect()}
    })
    return observable;
  }

 register(data){
     this.socket.emit('signup',data);
    }

  profileImage(data){
    this.socket.emit('profileImage',data)
  }
  newProfileImage(){
      let observable = new Observable<{result}>(observer=>{
        this.socket.on('new profileImage',(data)=>{
          observer.next(data);
        })
        return ()=>{this.socket.disconnect()}
    
      })
      return observable;
  }
  fetchdata(data){
    this.socket.emit('fetchdata',data)
  }
  newdata(){
      let observable = new Observable<{result}>(observer=>{
        this.socket.on('new data',(data)=>{
          observer.next(data);
        })
        return ()=>{this.socket.disconnect()}
    
      })
      return observable;
  }
  login(data){
    this.socket.emit('login',data)
  }
  newlogin(){
      let observable = new Observable<{Object }>(observer=>{
        this.socket.on('new login',(data)=>{
          observer.next(data);
        })
        return ()=>{this.socket.disconnect()}
    
      })
      return observable;
  }

}
