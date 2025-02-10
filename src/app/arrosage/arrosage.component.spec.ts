import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrosageComponent } from './arrosage.component';

describe('ArrosageComponent', () => {
  let component: ArrosageComponent;
  let fixture: ComponentFixture<ArrosageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrosageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrosageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
