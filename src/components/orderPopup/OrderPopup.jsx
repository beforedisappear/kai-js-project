import "../orderPopup/orderPopup.scss";

import cross from "../../resources/icons/popup/cross.svg";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { CSSTransition } from "react-transition-group";
import { useSelector, useStore } from "react-redux";

import { useCreateOrderMutation } from "../../api/cartApi";
import { orderFormCfg } from "../../config";
import { errorDiv, onShowPopup, toastError, toastSuccess } from "../../utils";
import { showOrderPopup } from "../../api/popupSlice";
import { toast } from "react-toastify";
import { nanoid } from "@reduxjs/toolkit";

export default function OrderPopup() {
  const { getState } = useStore();
  const orderPopupDisplay = useSelector(
    (state) => state.popup.orderPopupDisplay
  );

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const authData = getState().auth.authData;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    resetField,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      deliveryType: "DELIVERY",
      name: authData?.name,
      phone: authData?.phone,
    },
  });

  const watchRadio = watch("deliveryType");

  useEffect(() => {
    if (watchRadio === "PICKUP") {
      resetField("address");
      resetField("floor");
      resetField("comment");
    }
  }, [watchRadio]);

  const onSubmit = async (data) => {
    const isCreating = toast.loading("Отправка данных...");

    await createOrder({ id: nanoid(), ...data })
      .unwrap()
      .then(() => {
        toastSuccess(isCreating, "Заказ успешно создан. Ожидайте звонка");

        reset();
        onShowPopup(null, false, showOrderPopup);
      })
      .catch((err) => toastError(isCreating, err));
  };

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
          <form className="order_form" onSubmit={handleSubmit(onSubmit)}>
            <span className="order_form_title">Доставка</span>
            {/*  */}
            <div className="form_field">
              <span className="form_field_title">Ваше имя</span>
              <input
                {...register("name", orderFormCfg.name)}
                type="text"
                className={
                  errors?.name
                    ? "project_input_field invalid"
                    : "project_input_field"
                }
              />
              {errorDiv(errors?.name, "100%")}
            </div>

            <div className="form_field">
              <span className="form_field_title">Ваш телефон</span>
              <input
                {...register("phone", orderFormCfg.phone)}
                type="text"
                className={
                  errors?.phone
                    ? "project_input_field invalid"
                    : "project_input_field"
                }
                placeholder="+7/7/8..."
              />
              {errorDiv(errors?.phone, "100%")}
            </div>

            <div className="form_field">
              <div className="radio_field">
                <input
                  type="radio"
                  id="naturalPersonRadio"
                  className="radio-form"
                  value="PICKUP"
                  {...register("deliveryType", orderFormCfg.required)}
                />
                <label htmlFor="naturalPersonRadio">Самовывоз</label>
              </div>
              <div className="radio_field">
                <input
                  type="radio"
                  id="juridicalPersonRadio"
                  className="radio-form"
                  value="DELIVERY"
                  {...register("deliveryType", orderFormCfg.required)}
                />
                <label htmlFor="juridicalPersonRadio">Доставка до двери</label>
              </div>
            </div>

            {watchRadio === "DELIVERY" && (
              <>
                <div className="form_field">
                  <span className="form_field_title">Ваш адрес</span>
                  <input
                    {...register("address", orderFormCfg.address)}
                    type="text"
                    className={
                      errors?.address
                        ? "project_input_field invalid"
                        : "project_input_field"
                    }
                    placeholder="Улица, дом, квартира"
                  />
                  {errorDiv(errors?.address, "100%")}
                </div>

                <div className="form_field">
                  <span className="form_field_title">Ваш этаж</span>
                  <input
                    {...register("floor", orderFormCfg.floor)}
                    type="text"
                    className={
                      errors?.floor
                        ? "project_input_field invalid"
                        : "project_input_field"
                    }
                  />
                  {errorDiv(errors?.floor, "100%")}
                </div>

                <div className="form_field">
                  <span className="form_field_title">
                    Комментарий для курьера
                  </span>
                  <input
                    {...register("comment", orderFormCfg.comment)}
                    type="text"
                    className={
                      errors?.comment
                        ? "project_input_field invalid"
                        : "project_input_field"
                    }
                  />
                  {errorDiv(errors?.comment, "100%")}
                </div>
              </>
            )}

            <button disabled={isLoading} className="project_button">
              отправить
            </button>
          </form>
        </div>
      </div>
    </CSSTransition>
  );
}
