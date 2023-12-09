import { useGetUserQuery } from "../api/userApi";

import { useSelector } from "react-redux";

import Preloader from "../components/preloader/Preloader";
import UserForm from "../components/userForm/UserForm";

export default function ProfilePage() {
  const token = useSelector((state) => state.auth.accessToken);
  const { data, isLoading, isError } = useGetUserQuery(token);

  if (isLoading)
    return (
      <div className="preloader_spacer">
        <Preloader />
      </div>
    );
  else if (isError || data?.length === 0)
    return <h1 style={{ color: "red" }}>Непредвиденная ошибка!</h1>;

  return <UserForm userData={data[0]} />;
}
