import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWifi,
  faBabyCarriage,
  faTv,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react';
import styles from './FlightDetails.module.scss';

function FligthDetailsComponent({ flight, openBookingModal }) {
  function formatTime(date) {
    return new Date(date).toLocaleDateString();
  }

  const flysAt = React.useMemo(() => formatTime(flight.flys_at), [
    flight.flys_at,
  ]);
  const landsAt = React.useMemo(() => formatTime(flight.lands_at), [
    flight.lands_at,
  ]);

  return (
    <div className={styles.details}>
      <h1>{flight.name}</h1>
      <div className={styles.info}>
        <div>
          <p>Company:</p>
          <p>{flight.company_name}</p>
        </div>
        <div>
          <p>Available seats:</p>
          <p>{flight.freeSeats}</p>
        </div>
        <div>
          <p>Departs at:</p>
          <p>{flysAt}</p>
        </div>
        <div>
          <p>Lands at:</p>
          <p>{landsAt}</p>
        </div>
        <div>
          <p>Base price:</p>
          <p>{flight.base_price}</p>
        </div>
        <div>
          <p>Current price:</p>
          <p>{flight.current_price}</p>
        </div>
      </div>
      <div className={styles.flightImg} />
      <div className={styles.flightFeatures}>
        <div className="feature">
          <FontAwesomeIcon
            icon={faWifi}
            color={Math.random() >= 0.5 ? 'blue' : ''}
          />
          <span className={Math.random() >= 0.5 ? 'enabled' : ''}>
            Wireless internet
          </span>
        </div>
        <div className="feature">
          <FontAwesomeIcon
            icon={faBabyCarriage}
            color={Math.random() >= 0.5 ? 'blue' : ''}
          />
          <span className={Math.random() >= 0.5 ? 'enabled' : ''}>
            Kids friendly
          </span>
        </div>
        <div className="feature">
          <FontAwesomeIcon
            icon={faTv}
            color={Math.random() >= 0.5 ? 'blue' : ''}
          />
          <span className={Math.random() >= 0.5 ? 'enabled' : ''}>
            TV available
          </span>
        </div>
        <div className="feature">
          <FontAwesomeIcon
            icon={faUtensils}
            color={Math.random() >= 0.5 ? 'blue' : ''}
          />
          <span className={Math.random() >= 0.5 ? 'enabled' : ''}>
            Meal included
          </span>
        </div>
      </div>
      <button disabled={flight.freeSeats === 0} onClick={openBookingModal}>
        {flight.freeSeats === 0 ? 'No free seats to book' : 'Book now'}
      </button>
    </div>
  );
}

export const FligthDetails = observer(FligthDetailsComponent);
