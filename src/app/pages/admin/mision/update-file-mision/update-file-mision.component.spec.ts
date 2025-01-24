import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFileMisionComponent } from './update-file-mision.component';

describe('UpdateFileMisionComponent', () => {
  let component: UpdateFileMisionComponent;
  let fixture: ComponentFixture<UpdateFileMisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateFileMisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateFileMisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
