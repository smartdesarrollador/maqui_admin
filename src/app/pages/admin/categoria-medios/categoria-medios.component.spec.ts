import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaMediosComponent } from './categoria-medios.component';

describe('CategoriaMediosComponent', () => {
  let component: CategoriaMediosComponent;
  let fixture: ComponentFixture<CategoriaMediosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriaMediosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriaMediosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
