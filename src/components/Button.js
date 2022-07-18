import React from "react";

import "components/Button.scss";

export default function Button(props) {
   const { onClick, disabled, children } = props

   let buttonClass = "button";
   if (props.confirm) {
      buttonClass += " button--confirm";
    }

    if (props.danger) {
      buttonClass += " button--danger";
    }


   return(
   <button onClick={onClick} className={buttonClass} disabled={disabled}>
      {children}
   </button>
   );
}
