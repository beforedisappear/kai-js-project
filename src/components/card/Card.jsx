import "../card/card.scss";

export default function Card(props) {
  const { onShowCardPopup, onAddCardToCard, ...data } = props;
  return (
    <div className="cards_list_card">
      <div
        className="card_image_container"
        onClick={() => onShowCardPopup(data)}
      >
        <img src={data.imgSrc} width={502} height={400} alt="some_alt" />
      </div>
      <div className="card_content" onClick={() => onShowCardPopup(data)}>
        <div className="card_content_title">{data.title}</div>
        <div className="card_content_price">{data.price}₽</div>
      </div>

      <button
        id="card_button"
        className="button-form-light"
        onClick={() => onAddCardToCard(data.id)}
      >
        ДОБАВИТЬ
      </button>
    </div>
  );
}
