import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntViewComponent } from './ent-view.component';

describe('EntViewComponent', () => {
  let component: EntViewComponent;
  let fixture: ComponentFixture<EntViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
