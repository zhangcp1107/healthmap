import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  active = 'environment';
  activeb = '';
  popEnvironmentModal = false;
  popAlertModal = false;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  addAlert(e: any) {
    // this.active='add'
    this.router.navigate(['../login'], {
      relativeTo: this.activateRoute
    });
  }
}
