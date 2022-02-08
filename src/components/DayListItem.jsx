import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  const dayClass = classNames('day-list__item',
    {
      'day-list__item--selected': selected,
      'day-list__item--full': spots === 0
    }
  )

  const formatSport = (spots) => {
    
    if (spots === 0) {
      return <h3 className="text--light">no spots remaining</h3>
    }
    if (spots === 1) {
      return <h3 className="text--light">{`${spots} spot remaining`}</h3>
    }

    return <h3 className="text--light">{spots} spots remaining</h3>;
  }

  return(
    <li onClick={setDay} className={dayClass} data-testid='day' selected={selected}>
      <h2 className="text--regular">{name}</h2>
      {formatSport(spots)}
    </li>
  );
}