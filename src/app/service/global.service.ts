import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  login = !!localStorage.getItem('token')

  constructor() { }
}
