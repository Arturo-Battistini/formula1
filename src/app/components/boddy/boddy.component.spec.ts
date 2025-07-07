import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BoddyComponent } from './boddy.component';

describe('BoddyComponent', () => {
  let component: BoddyComponent;
  let fixture: ComponentFixture<BoddyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoddyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoddyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
