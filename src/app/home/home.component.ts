import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent
  ],
  template: `
    <section>
      <form>
    <input type="text" placeholder="Filter by city" #cityFilter>
    <input type="text" placeholder="Filter by state" #stateFilter>
    <label>
      <input type="checkbox" #wifiFilter> Wifi
    </label>
    <label>
      <input type="checkbox" #laundryFilter> Laundry Service
    </label>
    <label>
      <input type="checkbox" #unitsFilter> Available
    </label>
    <button class="primary" type="button" (click)="filterResults(cityFilter.value, stateFilter.value, wifiFilter.checked, laundryFilter.checked, unitsFilter.checked)">Search</button>
  </form>
    </section>
    <section class="results">
      <app-housing-location
        *ngFor="let housingLocation of filteredLocationList"
        [housingLocation]="housingLocation">
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];

  constructor() {
      // Initialize filteredLocationList with all housing locations
      this.filteredLocationList = this.housingService.getAllHousingLocations();
  }

  filterResults(city: string, state: string, hasWifi: boolean, hasLaundry: boolean, hasUnits:boolean) {
    this.filteredLocationList = this.housingService.getAllHousingLocations().filter(housingLocation => {
        const cityMatch = !city || housingLocation?.city.toLowerCase().includes(city.toLowerCase());
        const stateMatch = !state || housingLocation?.state.toLowerCase().includes(state.toLowerCase());
        const wifiMatch = !hasWifi || housingLocation?.wifi === hasWifi;
        const laundryMatch = !hasLaundry || housingLocation?.laundry === hasLaundry;
        const availableMatch = !hasUnits || (housingLocation?.availableUnits > 0);
        return cityMatch && stateMatch && wifiMatch && laundryMatch && availableMatch;
    });
}
}

