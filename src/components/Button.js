import React from "react";
import "components/Button.scss";
import classNames from "classnames";

export default function Button(props) {
  const { onClick, disabled, children, confirm, danger } = props;

  let buttonClass = classNames("button", {
    "button--confirm": confirm,
    "button--danger": danger,
  });

  return (
    <button onClick={onClick} className={buttonClass} disabled={disabled}>
      {children}
    </button>
  );
}
