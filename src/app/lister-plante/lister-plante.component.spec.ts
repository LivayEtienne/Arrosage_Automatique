import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerPlanteComponent } from './lister-plante.component';

describe('ListerPlanteComponent', () => {
  let component: ListerPlanteComponent;
  let fixture: ComponentFixture<ListerPlanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListerPlanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListerPlanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
