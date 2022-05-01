import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {LoginHttpService} from '../login-http.service';
import {ActivatedRoute, Router} from '@angular/router';
/**
 * 登录
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  validateForm!: FormGroup;
  isLoading = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private activateRoute: ActivatedRoute,
              private http: LoginHttpService) {
  }
  // 登录
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
      this.isLoading = true;
      this.http.login({
        user_name: this.validateForm!.get('userName')!.value,
        user_pwd: this.validateForm!.get('password')!.value
      }).subscribe((res: any) => {
        this.isLoading = false;
        if (res.code === 200) {
          // 跳转主页
          this.router.navigate(['../app'], {
            relativeTo: this.activateRoute
          });
        }
      });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [window.localStorage.getItem("3ou2io2p5uiddsf3"), [Validators.required]],
      password: [window.localStorage.getItem("34jgp5uidd345sf3"), [Validators.required]],
      remember: [window.localStorage.getItem("3ou2io2p5uiddsf3")]
    });
  }
}
