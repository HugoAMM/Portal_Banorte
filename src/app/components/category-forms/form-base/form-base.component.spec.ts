import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBaseComponent } from './form-base.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormBaseComponent', () => {
  let component: FormBaseComponent;
  let fixture: ComponentFixture<FormBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormBaseComponent],
      imports: [
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
