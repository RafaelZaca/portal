import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiberacaoComponent } from './liberacao.component';

describe('LiberacaoComponent', () => {
  let component: LiberacaoComponent;
  let fixture: ComponentFixture<LiberacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiberacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiberacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
