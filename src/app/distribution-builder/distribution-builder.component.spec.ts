import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionBuilderComponent } from './distribution-builder.component';

describe('DistributionBuilderComponent', () => {
  let component: DistributionBuilderComponent;
  let fixture: ComponentFixture<DistributionBuilderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributionBuilderComponent]
    });
    fixture = TestBed.createComponent(DistributionBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
