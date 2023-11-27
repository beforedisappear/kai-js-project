import "../card/card.scss";

export default function Card(props) {
  return (
    <div className="cards_list_card">
      <div className="card_image_container">
        <img src={props.imgSrc} width={502} height={400} alt="some_alt" />
      </div>
      <div className="card_content">
        <div className="card_content_title">{props.title}</div>
        <div className="card_content_price">{props.price}₽</div>
      </div>

      <button id="card_button" className="button-form-light">
        ДОБАВИТЬ
      </button>
    </div>
  );
}
