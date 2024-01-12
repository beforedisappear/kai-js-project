import "../cardsList/cardsList.scss";
import "../../styles/auxilaryStyles.scss";

import Preloader from "../preloader/Preloader";

import { toast } from "react-toastify";
import { useEffect, useCallback } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../metaData/MetaData";
import Card from "../card/Card";

import { useGetCardsQuery, useAddToCartMutation } from "../../api/cardsApi";

import { onShowPopup, toastError, toastSuccess } from "../../utils";
import { setDataForCardPopup, showCardPopup } from "../../api/popupSlice";
import { increasePageCounter, setPageCounterValue } from "./cardsSlice";

const sectionTitles = {
  burgers: "Бургеры",
  snacks: "Снеки",
  hotdogs: "Хот-доги",
  donuts: "Пончики",
};

export default function CardsList() {
  const dispatch = useDispatch();
  const { section } = useParams();

  if (section && !["burgers", "hotdogs", "snacks", "donuts"].includes(section))
    return <Navigate to="/page-not-found" />;

  const page = useSelector((state) => state.cards.counts[section || "all"]);

  const [addToCart, { isLoading: isCardAdding }] = useAddToCartMutation();

  const onAddCardToCard = async (data) => {
    const isAdding = toast.loading("Отправка данных...");

    await addToCart(data)
      .unwrap()
      .then(() =>
        toastSuccess(
          isAdding,
          data?.inCart
            ? "Успешно добавлено в корзину"
            : "Успешно удалено из корзины"
        )
      )
      .catch((err) => toastError(isAdding, err));
  };

  //reset previous section page counter
  useEffect(() => {
    return () => {
      dispatch(
        setPageCounterValue({
          page: 1,
          section: section || "all",
        })
      );
    };
  }, [section]);

  const {
    originalArgs,
    data: cards,
    isLoading,
    isFetching,
    isError,
  } = useGetCardsQuery({ page, section });

  const onShowCardPopup = useCallback(
    (data) => {
      dispatch(setDataForCardPopup({ data, section: section || "all" }));
      onShowPopup(null, true, showCardPopup);
    },
    [section]
  );

  if (isLoading || (isFetching && originalArgs?.page === 1))
    return (
      <div className="cards_list">
        <div className="preloader_spacer grid">
          <Preloader isAbsolute={false} />
        </div>
      </div>
    );
  else if (isError)
    return (
      <div className="cards_list">
        <h1 style={{ color: "red" }}>Ошибка!</h1>
      </div>
    );

  const cardsLength = cards.data.ids.length;

  return (
    <>
      <MetaData title={sectionTitles?.[section]} />
      <div className="cards_list">
        {cardsLength > 0 ? (
          cards?.data?.ids?.map((id) => {
            const item = cards.data.entities[id];
            return (
              <Card
                {...item}
                key={id}
                section={section || "all"}
                onShowCardPopup={onShowCardPopup}
                onAddCardToCard={onAddCardToCard}
                isCardAdding={isCardAdding}
              />
            );
          })
        ) : (
          <div className="empty_search_result grid">
            <h1 style={{ fontSize: 30, color: "#ffab08" }}>
              Здесь пока пусто =(
            </h1>
          </div>
        )}
      </div>

      {cardsLength < cards.totalCount ? (
        <>
          {isFetching ? (
            <div style={{ height: 200 }}>
              <Preloader isAbsolute={false} />
            </div>
          ) : (
            <div className="load_btn_container">
              <button
                onClick={() => dispatch(increasePageCounter(section || "all"))}
                className="project_button"
              >
                <p>ПОКАЗАТЬ ЕЩЁ</p>
              </button>
            </div>
          )}
        </>
      ) : null}
    </>
  );
}
