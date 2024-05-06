import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // Changement de la logique pour setIndex (array.length => array.length -1)
  // Changement du timeOut de 5000ms à 10000ms 
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length -1 ? index + 1 : 0),
      10000
    );
  };

  useEffect(() => {
    nextCard();
  });
  
  // Possible changement de la pagination au clic des boutons radio => changement nécessaire dans le code

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.id} // changement de la clé (event.title) pour avoir une clé unique à chaque événement
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={event.id}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // changement de l'index de référence (idx === radioIdx)
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
