import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFreeComponent } from './home-free.component';

describe('HomeFreeComponent', () => {
  let component: HomeFreeComponent;
  let fixture: ComponentFixture<HomeFreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
