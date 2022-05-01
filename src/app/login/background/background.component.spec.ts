import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BackgroudComponent } from './login.component';

describe('LoginComponent', () => {
  let component: BackgroudComponent;
  let fixture: ComponentFixture<BackgroudComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BackgroudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
