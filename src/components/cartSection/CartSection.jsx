import "../cartSection/cartSection.scss";

import backet from "../../resources/icons/cart/bucket.svg";

import { toast } from "react-toastify";
import { ReactSVG } from "react-svg";

import { toastSuccess, toastError } from "../../utils";
import { useRemoveCardFromCartMutation } from "../../api/cartApi";

import { showOrderPopup } from "../../api/popupSlice";
import { onShowPopup } from "../../utils";

export default function CardSection({ data, totalCost }) {
  const [removeCard] = useRemoveCardFromCartMutation();

  const onRemoveCardFromCart = async (id) => {
    const isRemoving = toast.loading("Отправка данных...");

    removeCard({ id })
      .unwrap()
      .then(() => toastSuccess(isRemoving, "Успешно удалено"))
      .catch((err) => toastError(isRemoving, err));
  };

  return (
    <>
      <div className="cards_in_cart">
        {data.map((el) => {
          return (
            <div className="card_in_cart" key={el.id}>
              <div className="card_in_cart_image">
                <img src={el?.imgSrc} alt="image_alt" />
              </div>
              <div className="card_in_cart_info">
                <div className="card_in_cart_title">{el?.title}</div>
                <div className="card_in_cart_weight">{el?.weight}г</div>
                <div className="card_in_cart_price">{el?.price}₽</div>
              </div>

              <div
                className="remove_from_cart"
                onClick={() => onRemoveCardFromCart(el.id)}
              >
                <ReactSVG src={backet} />
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart_result">
        <div className="cart_result_cost">
          <span className="title">ИТОГО:</span>
          <span className="total">{totalCost}₽</span>
        </div>
        <button
          disabled={totalCost === 0}
          className="project_button"
          onClick={() => onShowPopup(null, true, showOrderPopup)}
        >
          ОФОРМИТЬ ЗАКАЗ
        </button>
      </div>
    </>
  );
}
