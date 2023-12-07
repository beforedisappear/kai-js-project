import "../orderPopup/orderPopup.scss";

import cross from "../../resources/icons/popup/cross.svg";

import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";

import { onShowPopup, toastError, toastSuccess } from "../../utils";
import { showOrderPopup } from "../../api/popupSlice";

export default function OrderPopup() {
  const orderPopupDisplay = useSelector(
    (state) => state.popup.orderPopupDisplay
  );

  return (
    <CSSTransition
      in={orderPopupDisplay}
      timeout={300}
      mountOnEnter
      unmountOnExit
      classNames="popup"
    >
      <div
        className="overlay"
        onClick={(e) => onShowPopup(e, false, showOrderPopup)}
      >
        <div className="popup-container" data-order>
          <img
            src={cross}
            alt="close appeal form"
            className="close-button"
            onClick={(e) => onShowPopup(e, false, showOrderPopup)}
          />
          <div></div>
        </div>
      </div>
    </CSSTransition>
  );
}
