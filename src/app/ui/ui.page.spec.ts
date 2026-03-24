import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UIPage } from './ui.page';

describe('UIPage', () => {
  let component: UIPage;
  let fixture: ComponentFixture<UIPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UIPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
