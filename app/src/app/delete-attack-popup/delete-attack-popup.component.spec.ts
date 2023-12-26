import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAttackPopupComponent } from './delete-attack-popup.component';

describe('DeleteAttackPopupComponent', () => {
  let component: DeleteAttackPopupComponent;
  let fixture: ComponentFixture<DeleteAttackPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAttackPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteAttackPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
