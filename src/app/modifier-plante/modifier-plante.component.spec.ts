import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierPlanteComponent } from './modifier-plante.component';

describe('ModifierPlanteComponent', () => {
  let component: ModifierPlanteComponent;
  let fixture: ComponentFixture<ModifierPlanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierPlanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierPlanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
