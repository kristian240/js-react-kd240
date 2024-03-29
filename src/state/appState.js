import { observable, decorate, computed } from 'mobx';

class AppState {
  // Session
  remember = false;
  sessionToken = '';
  firstName = '';
  userId='';
  user = '';

  // Flights & filter
  flights = [];
  filteredFlights = [];
  flight = { id: null};
  flightFilter = {
    date: '',
    city: '',
    freeSeats: '',
  }
  
  get applyFilter() {
    return this.flights
      .filter((flight) => {
        let filterResult = true;
        if (this.flightFilter.date && filterResult) {
          filterResult = (new Date(flight.flys_at)).toLocaleDateString() === (new Date(this.flightFilter.date)).toLocaleDateString();
        }
        if (this.flightFilter.city && filterResult) {
          filterResult = flight.name.toLowerCase().includes(this.flightFilter.city.toLowerCase());
        }
        if (this.flightFilter.freeSeats && filterResult) {
          filterResult = (Number(this.flightFilter.freeSeats) <= (flight.no_of_seats - flight.no_of_booked_seats));
        }
        return filterResult;
      });
  }
}

decorate(AppState, {
  sessionToken: observable,
  remember: observable,
  firstName: observable,
  flights: observable,
  flight: observable,
  filteredFlights: observable,
  flightFilter: observable,
  applyFilter: computed,
  user: observable,
  userId: observable,
});

export const appState = new AppState();
