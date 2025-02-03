import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarRigthComponent } from './sidebar-rigth.component';

describe('SidebarRigthComponent', () => {
  let component: SidebarRigthComponent;
  let fixture: ComponentFixture<SidebarRigthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarRigthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarRigthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
