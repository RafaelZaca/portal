import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewWaveComponent } from './overview-wave.component';

describe('OverviewWaveComponent', () => {
  let component: OverviewWaveComponent;
  let fixture: ComponentFixture<OverviewWaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewWaveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverviewWaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
