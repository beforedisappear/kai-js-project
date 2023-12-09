import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";

import { logFormValidationParams } from "../../config";
import { errorDiv } from "../../utils";
import { prevFormStep } from "../../api/popupSlice";
import { setAccessToken, setAuthData } from "../../api/authSlice";
import { useSendCodeMutation, useSendPhoneMutation } from "../../api/authApi";
import { onShowPopup } from "../../utils";
import { showAuthPopup } from "../../api/popupSlice";

export default function CodeFormPart({ phoneNumber }) {
  //react hook form for form creation
  const {
    register,
    handleSubmit,
    formState: { errors, isValid: isFormValid },
    setError,
  } = useForm({ mode: "onSubmit", defaultValues: { code: "" } });

  const [sendCode, { isLoading: isPostFetching }] = useSendCodeMutation();
  const [sendCodeAgain] = useSendPhoneMutation();
  const dispatch = useDispatch();

  //success form sumbit
  const onSubmit = async (data) => {
    const authCode = {
      code: data.code,
      phone: phoneNumber.replace(/[\s\()+-]/g, ""),
    };

    await sendCode(authCode)
      .unwrap()
      .then((response) => {
        if (response?.length === 0)
          return setError("code", { type: "custom", message: "неверный код" });
        onShowPopup(null, false, showAuthPopup);
        dispatch(setAccessToken(response[0]?.token));
        dispatch(setAuthData(response[0]));
        dispatch(prevFormStep());
      })
      .catch((error) => {
        console.error(error);
        const err = error?.data?.exceptionName || "Ошибка";
        setError("code", { type: "custom", message: err });
      });
  };

  const sendAgain = useCallback(async () => {
    const number = {
      phone: phoneNumber,
    };

    await sendCodeAgain(number)
      .unwrap()
      .then(() => {})
      .catch((error) => {
        console.log(error);
        const err = error?.data?.exceptionName || "Ошибка";
        //transfer error to popup notification
        setError("code", { type: "custom", message: err });
      });
  }, []);

  return (
    <>
      <div className="auth-form">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <input
            {...register("code", logFormValidationParams.code)}
            minLength={logFormValidationParams.code.minLength.value}
            maxLength={logFormValidationParams.code.maxLength.value}
            className={
              errors?.code
                ? "project_input_field code invalid"
                : "project_input_field code "
            }
          />
          {errorDiv(errors?.code, "182px")}
          <button
            disabled={!isFormValid || isPostFetching}
            type="submit"
            className="project_button"
          >
            отправить код
          </button>
        </form>
      </div>
      {/* send sms again functional */}
      <CountDown sendAgain={sendAgain} />
    </>
  );
}

//component with countdown for render optimization
const CountDown = ({ sendAgain }) => {
  const [countDown, setCountDown] = useState(180);

  useEffect(() => {
    if (countDown <= 0) return;

    const timeout = setTimeout(() => {
      setCountDown(countDown - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [countDown]);

  return (
    <>
      {countDown > 0 ? (
        <div className="send-again wait">отправить снова через {countDown}</div>
      ) : (
        <div className="send-again active">
          <span
            onClick={() => {
              sendAgain(), setCountDown(180);
            }}
          ></span>
        </div>
      )}
    </>
  );
};
