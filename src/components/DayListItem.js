import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const { setDay, name, selected, spots } = props

  const formatSpots = function(spots) {
    if (spots === 0) {
      return `no spots remaining`;
    } else if (spots === 1) {
      return `1 spot remaining`;
    } else {
      return `${spots} spots remaining`;
    }
  };

  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  })

  return (
    <li onClick={() => setDay(name)} className={dayClass}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}