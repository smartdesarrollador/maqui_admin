import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccesorioComponent } from './edit-accesorio.component';

describe('EditAccesorioComponent', () => {
  let component: EditAccesorioComponent;
  let fixture: ComponentFixture<EditAccesorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAccesorioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAccesorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
