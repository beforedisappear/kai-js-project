import "../cardsList/cardsList.scss";
import "../../styles/auxilaryStyles.scss";

import Preloader from "../preloader/Preloader";

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MetaData from "../metaData/MetaData";
import Card from "../card/Card";

import { useGetCardsQuery } from "../../api/cardsApi";

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

  const page = useSelector((state) => state.cards.counts[section || "all"]);

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

  if (isLoading || (isFetching && originalArgs?.page === 1))
    return (
      <div className="cards_list">
        <div className="preloader_spacer grid">
          <Preloader isAbsolute={false} />
        </div>
      </div>
    );
  else if (isError) return <h1 style={{ color: red }}>Ошибка!</h1>;

  return (
    <>
      <MetaData title={sectionTitles?.[section]} />
      <div className="cards_list">
        {cards?.data?.ids?.map((id) => {
          const item = cards.data.entities[id];
          return <Card {...item} key={id} />;
        })}
      </div>

      {cards?.data?.ids?.length < cards.totalCount ? (
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
