import "../cardPopup/cardPopup.scss";
import cross from "../../resources/icons/popup/cross.svg";

import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";

import { onShowPopup } from "../../utils";
import { showCardPopup } from "../../api/popupSlice";

export default function CardPopup() {
  const cardPopupDisplay = useSelector((state) => state.popup.cardPopupDisplay);
  const cardPopupData = useSelector((state) => state.popup.dataForCardPopup);

  console.log(cardPopupData);

  return (
    <CSSTransition
      in={cardPopupDisplay}
      timeout={300}
      mountOnEnter
      unmountOnExit
      classNames="popup"
    >
      <div
        className="overlay"
        onClick={(e) => onShowPopup(e, false, showCardPopup)}
      >
        <div className="popup-container" data-card>
          <img
            src={cross}
            alt="close appeal form"
            className="close-button"
            onClick={(e) => onShowPopup(e, false, showCardPopup)}
          />
          <div className="card_popup_data">
            <div className="card_popup_title">{cardPopupData?.title}</div>
            <div className="card_popup_info">
              <div className="card_popup_info_photo">
                <img src={cardPopupData?.imgSrc} alt="alt" />
              </div>
              <div className="card_popup_info_text">
                <div className="card_popup_info_text_description">
                  {cardPopupData?.description || "Описание отсутствует"}
                </div>
                <div className="card_popup_info_text_components">Состав</div>
                <ul className="components_list">
                  {cardPopupData?.components.map((el) => (
                    <li>{el}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
