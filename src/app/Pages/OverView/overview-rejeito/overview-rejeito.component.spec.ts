import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewRejeitoComponent } from './overview-rejeito.component';

describe('OverviewRejeitoComponent', () => {
  let component: OverviewRejeitoComponent;
  let fixture: ComponentFixture<OverviewRejeitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewRejeitoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewRejeitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
