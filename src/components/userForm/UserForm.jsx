import "../userForm/userForm.scss";
import "../orderPopup/orderPopup.scss";

import exitIcon from "../../resources/icons/exit.svg";

import { setAuthData, setAccessToken } from "../../api/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { userFormCfg } from "../../config";
import { errorDiv, toastError, toastSuccess } from "../../utils";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

import { useUpdateUserMutation } from "../../api/userApi";

export default function UserForm({ userData }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: { name: userData?.name, phone: userData?.phone },
  });

  const [updateData, { isLoading }] = useUpdateUserMutation();

  const onExit = () => {
    dispatch(setAccessToken(null));
    dispatch(setAuthData(null));
    return navigate("/");
  };

  const onSubmit = async (data) => {
    const isPending = toast.loading("Отправка данных...");

    await updateData({ id: userData?.id, data })
      .unwrap()
      .then(() => toastSuccess(isPending, "Данные обновлены"))
      .catch((err) => toastError(isPending, err));
  };

  return (
    <form className="user_form" onSubmit={handleSubmit(onSubmit)}>
      <div className="user_form_nav">
        <span className="user_form_nav_title">Пользователь</span>
        <img
          src={exitIcon}
          alt="exit icon"
          className="exit_button"
          onClick={onExit}
        />
      </div>

      <div className="form_field">
        <span className="form_field_title">Ваше имя</span>
        <input
          {...register("name", userFormCfg.name)}
          type="text"
          className={
            errors?.name ? "project_input_field invalid" : "project_input_field"
          }
        />
        {errorDiv(errors?.name, "100%")}
      </div>

      <div className="form_field">
        <span className="form_field_title">Ваш телефон</span>
        <input
          {...register("phone", userFormCfg.phone)}
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

      <button disabled={isLoading} className="project_button">
        отправить
      </button>
    </form>
  );
}
