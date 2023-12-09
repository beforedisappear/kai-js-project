import { CSSTransition } from "react-transition-group";

import PhoneFormPart from "./PhoneFormPart";
import CodeFormPart from "./CodeFormPart";
import { prevFormStep } from "../../api/popupSlice";
import { showAuthPopup } from "../../api/popupSlice";
import { onShowPopup } from "../../utils";

import { useSelector, useDispatch } from "react-redux";

import "./authPopup.scss";
import cross from "../../resources/icons/popup/cross.svg";
import backButton from "../../resources/icons/popup/backbutton.svg";

export default function AuthPopup() {
  const phoneNumber = useSelector((state) => state.popup.phoneNumber);
  const newFormStep = useSelector((state) => state.popup.newFormStep);
  const dispatch = useDispatch();

  const authPopupDisplay = useSelector((state) => state.popup.authPopupDisplay);

  return (
    <CSSTransition
      in={authPopupDisplay}
      timeout={300}
      mountOnEnter
      unmountOnExit
      classNames="popup"
    >
      <div
        className="overlay"
        onClick={(e) => onShowPopup(e, false, showAuthPopup)}
      >
        <div className="popup-container" data-auth>
          {newFormStep && (
            <img
              onClick={() => dispatch(prevFormStep())}
              className="back-button"
              src={backButton}
              alt="back-button"
            />
          )}
          <img
            onClick={() => onShowPopup(null, false, showAuthPopup)}
            className="close-button"
            src={cross}
            alt="close-cross"
          />

          <div className="instruction-text">
            {/* conditional popup interface */}
            {newFormStep ? "Введите код" : "Введите номер телефона"}
            <div className="instruction-text-subtitle">
              {newFormStep
                ? `Мы отправили код \n на номер \n${phoneNumber}`
                : "И мы отправим вам \n СМС с кодом подтверждения"}
            </div>
          </div>
          {/* form step */}
          {newFormStep ? (
            <CodeFormPart phoneNumber={phoneNumber} />
          ) : (
            <PhoneFormPart />
          )}
        </div>
      </div>
    </CSSTransition>
  );
}
