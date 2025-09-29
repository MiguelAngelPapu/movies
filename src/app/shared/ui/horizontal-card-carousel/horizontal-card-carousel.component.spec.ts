import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalCardCarouselComponent } from './horizontal-card-carousel.component';

describe('HorizontalCardCarouselComponent', () => {
  let component: HorizontalCardCarouselComponent;
  let fixture: ComponentFixture<HorizontalCardCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalCardCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalCardCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
