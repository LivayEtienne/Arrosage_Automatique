import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPlanteComponent } from './ajout-plante.component';

describe('AjoutPlanteComponent', () => {
  let component: AjoutPlanteComponent;
  let fixture: ComponentFixture<AjoutPlanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutPlanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutPlanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
