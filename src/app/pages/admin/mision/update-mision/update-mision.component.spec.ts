import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMisionComponent } from './update-mision.component';

describe('UpdateMisionComponent', () => {
  let component: UpdateMisionComponent;
  let fixture: ComponentFixture<UpdateMisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMisionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateMisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
