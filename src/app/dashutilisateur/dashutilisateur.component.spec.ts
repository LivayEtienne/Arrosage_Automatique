import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashutilisateurComponent } from './dashutilisateur.component';

describe('DashutilisateurComponent', () => {
  let component: DashutilisateurComponent;
  let fixture: ComponentFixture<DashutilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashutilisateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashutilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
