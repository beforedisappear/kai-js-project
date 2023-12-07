import "../styles/auxilaryStyles.scss";

import OrderPopup from "../components/orderPopup/OrderPopup";
import MetaData from "../components/metaData/MetaData";
import CardSection from "../components/cartSection/CartSection";
import Preloader from "../components/preloader/Preloader";

import { useGetCardsFromCartQuery } from "../api/cartApi";

export default function CartPage() {
  const { data, isLoading, isFetching, isError } = useGetCardsFromCartQuery();

  if (isLoading || isFetching)
    return (
      <div className="cards_in_cart">
        <div className="preloader_spacer">
          <Preloader />
        </div>
      </div>
    );
  else if (isError) {
    return <h1 style={{ color: "red" }}>Ошибка!</h1>;
  }

  return (
    <>
      <MetaData title={"Корзина"} />
      <div className="cart_info">
        <h1>Корзина</h1>
        <div className="cart_count">{data?.data?.length}</div>
      </div>
      <CardSection data={data?.data} totalCost={data?.totalCost} />
      <OrderPopup />
    </>
  );
}
