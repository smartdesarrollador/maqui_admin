import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutDosComponent } from './layout-dos.component';

describe('LayoutDosComponent', () => {
  let component: LayoutDosComponent;
  let fixture: ComponentFixture<LayoutDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutDosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
