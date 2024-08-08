import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePageSortComponent } from './table-page-sort.component';

describe('TablePageSortComponent', () => {
  let component: TablePageSortComponent;
  let fixture: ComponentFixture<TablePageSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePageSortComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePageSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
