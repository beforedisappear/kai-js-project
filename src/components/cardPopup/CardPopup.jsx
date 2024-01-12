import "../cardPopup/cardPopup.scss";
import "../card/card.scss";

import { toast } from "react-toastify";
import cross from "../../resources/icons/popup/cross.svg";

import { CSSTransition } from "react-transition-group";
import { useSelector } from "react-redux";

import { useAddToCartMutation } from "../../api/cardsApi";
import { onShowPopup, toastError, toastSuccess } from "../../utils";
import { showCardPopup } from "../../api/popupSlice";

export default function CardPopup() {
  const cardPopupDisplay = useSelector((state) => state.popup.cardPopupDisplay);
  const cardPopupData = useSelector((state) => state.popup.dataForCardPopup);

  const [addToCart, { isLoading: isCardAdding }] = useAddToCartMutation();

  const onAddCardToCard = async (data) => {
    const isAdding = toast.loading("Отправка данных...");
    addToCart(data)
      .unwrap()
      .then(() => {
        toastSuccess(
          isAdding,
          data?.inCart
            ? "Успешно добавлено в корзину"
            : "Успешно удалено из корзины"
        );

        onShowPopup(null, false, showCardPopup);
      })
      .catch((err) => toastError(isAdding, err));
  };
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
            <div className="card_popup_title">{cardPopupData?.data?.title}</div>
            <div className="card_popup_info">
              <div className="card_popup_info_photo">
                <img src={cardPopupData?.data?.imgSrc} alt="alt" />
              </div>
              <div className="card_popup_info_text">
                <div className="card_popup_info_text_description">
                  {cardPopupData?.data?.description || "Описание отсутствует"}
                </div>
                <div className="card_popup_info_text_components">Состав</div>
                <ul className="components_list">
                  {cardPopupData?.data?.components.map((el, i) => (
                    <li key={i}>{el}</li>
                  ))}
                </ul>
                <div className="card_popup_info_text_params">
                  <div className="weight_param">
                    {cardPopupData?.data?.weight}г
                  </div>
                  <div className="kcal_param">
                    {cardPopupData?.data?.kcal}ккал
                  </div>
                </div>
              </div>
            </div>
            <div className="card_popup_buttons">
              <button
                id="card_button"
                disabled={isCardAdding}
                className={cardPopupData?.data?.inCart ? "incart" : ""}
                onClick={() =>
                  onAddCardToCard({
                    id: cardPopupData?.data?.id,
                    inCart: !cardPopupData?.data?.inCart,
                    section: cardPopupData?.section,
                  })
                }
              >
                {cardPopupData?.data?.inCart ? "ДОБАВЛЕНО" : "ДОБАВИТЬ"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
