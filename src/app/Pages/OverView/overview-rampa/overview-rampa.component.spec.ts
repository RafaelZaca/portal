import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewRampaComponent } from './overview-rampa.component';

describe('OverviewRampaComponent', () => {
  let component: OverviewRampaComponent;
  let fixture: ComponentFixture<OverviewRampaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewRampaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewRampaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
