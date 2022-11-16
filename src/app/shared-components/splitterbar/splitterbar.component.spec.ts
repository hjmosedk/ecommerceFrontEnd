import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitterbarComponent } from './splitterbar.component';

describe('SplitterbarComponent', () => {
  let component: SplitterbarComponent;
  let fixture: ComponentFixture<SplitterbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitterbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SplitterbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
