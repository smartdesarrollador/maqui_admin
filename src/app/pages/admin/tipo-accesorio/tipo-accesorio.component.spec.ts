import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAccesorioComponent } from './tipo-accesorio.component';

describe('TipoAccesorioComponent', () => {
  let component: TipoAccesorioComponent;
  let fixture: ComponentFixture<TipoAccesorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoAccesorioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoAccesorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
