import React from 'react';
import { useToggle } from 'react-use';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import { Rating } from './Rating';

import styles from './FlightCard.module.scss';
import useWishlist from '../hooks/useWishlist';

export function FlightCardComponent({
  id,
  freeSeats,
  price,
  company,
  time,
  rating,
}) {
  const [optionState, optionToggle] = useToggle(false);
  const [wishlistState, toggleWishlist] = useWishlist(id);

  return (
    <div className={styles.result}>
      <div className={styles.options}>
        <span onClick={optionToggle} role="presentation">
          &#10247;
        </span>
        {optionState && (
          <div>
            <ul onClick={optionToggle}>
              <li>
                <Link to={`/flight/${id}`}>Book</Link>
              </li>
              <li onClick={toggleWishlist}>{wishlistState ? 'Remove from wishlist' : 'Add to wishlist'}</li> {/* eslint-disable-line */}
            </ul>
          </div>
        )}
      </div>
      <Link to={`/flight/${id}`}>
        <div className={styles.image} />
        <div className={styles.info}>
          <p className="departs">
            Departs at <span className="departs-time">{time}</span>
          </p>
          <p className="company">{company}</p>
          <span>
            <Rating rating={rating} />
            <span className="divider"> | </span>
            <span className="tickets">{freeSeats} tickets available</span>
          </span>
          <p className="price">
            Price: <span className="price-value">{price}$</span>
          </p>
        </div>
      </Link>
    </div>
  );
}

export const FlightCard = observer(FlightCardComponent);
