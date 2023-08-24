import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFwsComponent } from './form-fws.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormFwsComponent', () => {
  let component: FormFwsComponent;
  let fixture: ComponentFixture<FormFwsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFwsComponent],
      imports: [
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFwsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
