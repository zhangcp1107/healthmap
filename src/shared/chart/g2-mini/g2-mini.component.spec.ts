import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { G2MiniComponent } from './g2-mini.component';

describe('G2MiniComponent', () => {
  let component: G2MiniComponent;
  let fixture: ComponentFixture<G2MiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ G2MiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(G2MiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
