import { Component } from '@angular/core';
import { HeroBannerComponent } from '../hero-banner/hero-banner.component';

@Component({
    selector: 'app-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.css',
    standalone: true,
    imports: [HeroBannerComponent]
})
export class LandingPageComponent {

}
