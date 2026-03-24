import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransferDataPage } from './transfer-data.page';

describe('TransferDataPage', () => {
  let component: TransferDataPage;
  let fixture: ComponentFixture<TransferDataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
