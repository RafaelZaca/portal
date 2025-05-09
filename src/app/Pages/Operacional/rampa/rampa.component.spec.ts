import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RampaComponent } from './rampa.component';

describe('RampaComponent', () => {
  let component: RampaComponent;
  let fixture: ComponentFixture<RampaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RampaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RampaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
