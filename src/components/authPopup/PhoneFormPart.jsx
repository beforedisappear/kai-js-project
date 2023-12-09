import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
//Controller is a wrapper component that can be used to wrap components
//and propagate react-hook-form attributes and behaviours down to the components

import { logFormValidationParams } from "../../config/index.jsx";
import { nextFormStep, setPhoneNumber } from "../../api/popupSlice.jsx";
import { useSendPhoneMutation } from "../../api/authApi.jsx";
import { errorDiv } from "../../utils/index.jsx";

import InputMask from "react-input-mask";

export default function PhoneFormPart() {
  //react hook form for form creation
  const {
    handleSubmit, // will receive the form data if form validation is successful
    formState: { errors, isValid: isFormValid }, // contains information about the entire form state
    control, // contains methods for registering components into React Hook Form.
    setError, //allows you to manually set one or more errors.
  } = useForm({ mode: "onSubmit", defaultValues: { phone: "" } });

  const [sendPhone, { isLoading: isPostFetching }] = useSendPhoneMutation();
  const dispath = useDispatch();

  //success form sumbit
  const onSubmit = async (data) => {
    const number = { phone: data.phone.replace(/[\s\()+-]/g, "") };
    console.log(number);
    await sendPhone(number)
      .unwrap()
      .then((response) => {
        if (response.length === 0)
          return setError("phone", {
            type: "custom",
            message: "Номер не найден",
          });
        dispath(setPhoneNumber(number.phone)); // saves phone number in authPopup state
        dispath(nextFormStep()); // opens code input form
      })
      .catch((error) => {
        console.log(error);
        const err = error?.data?.exceptionName || "Ошибка";
        setError("phone", { type: "custom", message: err });
      });
  };

  return (
    <>
      <div className="auth-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="phone"
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <InputMask
                className={
                  errors?.phone
                    ? "project_input_field invalid"
                    : "project_input_field"
                }
                mask="+7 (999) 999-99-99"
                alwaysShowMask
                maskChar={""}
                onChange={onChange}
                name={name}
                value={value}
                disabled={isPostFetching}
                type="tel"
              />
            )}
            rules={logFormValidationParams.phone}
          />
          {/* input error */}
          {errorDiv(errors?.phone, "182px")}
          <button
            disabled={!isFormValid || isPostFetching}
            type="submit"
            className="project_button"
          >
            получить код
          </button>
        </form>
      </div>
    </>
  );
}
