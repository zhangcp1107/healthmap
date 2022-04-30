import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  active: string = 'environment';
  popEnvironmentModal = false

  constructor() { }

  ngOnInit(): void {
  }

}
