import { CommonModule }             from '@angular/common';
import { inject }                   from '@angular/core';
import { Component }                from '@angular/core';
import { HousingLocation }          from '../housing-location';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService }           from '../housing.service';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, HousingLocationComponent],
    template: `
        <section>
            <form>
                <input type="text" placeholder="Filter by city" #filter>
                <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
            </form>
        </section>
        <section class="results">
            <app-housing-location *ngFor="let housingLocation of filteredHousingLocationList"
                                  [housingLocation]="housingLocation"
            ></app-housing-location>
        </section>
    `,
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    housingLocationList: HousingLocation[] = [];
    housingService: HousingService = inject(HousingService);
    filteredHousingLocationList: HousingLocation[] = [];

    constructor() {
        this.housingService.getAllHousingLocation().then((housingLocationList: HousingLocation[]) => {
            this.housingLocationList = housingLocationList;
            this.filteredHousingLocationList = housingLocationList;
        });
    }

    public filterResults(text: string): void {
        if ( !text ) this.filteredHousingLocationList = this.housingLocationList;

        this.filteredHousingLocationList = this.housingLocationList.filter(
            (housingLocation: HousingLocation) => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
        );
    }
}
