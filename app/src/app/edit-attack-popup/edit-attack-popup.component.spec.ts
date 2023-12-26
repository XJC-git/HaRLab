import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAttackPopupComponent } from './edit-attack-popup.component';

describe('EditAttackPopupComponent', () => {
  let component: EditAttackPopupComponent;
  let fixture: ComponentFixture<EditAttackPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAttackPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAttackPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
