import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickRequestComponent } from './pickrequest.component';

describe('PickrequestComponent', () => {
  let component: PickRequestComponent;
  let fixture: ComponentFixture<PickRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
