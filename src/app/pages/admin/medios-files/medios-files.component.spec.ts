import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediosFilesComponent } from './medios-files.component';

describe('MediosFilesComponent', () => {
  let component: MediosFilesComponent;
  let fixture: ComponentFixture<MediosFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediosFilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MediosFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
