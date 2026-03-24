import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentsPreviewPage } from './components-preview.page';

describe('ComponentsPreviewPage', () => {
  let component: ComponentsPreviewPage;
  let fixture: ComponentFixture<ComponentsPreviewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsPreviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
