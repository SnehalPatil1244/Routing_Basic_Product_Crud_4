import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Iuser } from '../../model/user';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class USerDashboardComponent implements OnInit {
userArr : Iuser[] = []
  constructor(private userserive : UserService) { }

  ngOnInit(): void {
    this.getusers()
  }

  getusers(){
    this.userserive.fetchusers()
    .subscribe({
      next : data =>{
        this.userArr = data
      },
      error : err =>{
        console.log(err);
        
      }
    })
  }

}
