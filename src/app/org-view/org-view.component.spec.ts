import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgViewComponent } from './org-view.component';

describe('OrgViewComponent', () => {
  let component: OrgViewComponent;
  let fixture: ComponentFixture<OrgViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
