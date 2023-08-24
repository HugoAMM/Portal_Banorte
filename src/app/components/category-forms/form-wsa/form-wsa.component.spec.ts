import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormWsaComponent } from './form-wsa.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormWsaComponent', () => {
  let component: FormWsaComponent;
  let fixture: ComponentFixture<FormWsaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormWsaComponent],
      imports: [
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormWsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
