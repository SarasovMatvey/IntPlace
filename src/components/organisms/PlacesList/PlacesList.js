import { useCallback, useEffect, useRef, useState } from "react";
import PlaceCard from "../../atoms/PlaceCard";
import Masonry from "react-responsive-masonry";
import sygicAxios from "../../../api/sygic";
import "./PlacesList.sass";

const COUNTRY_ID = 43;
const LOADING_NEW_PAGE_OFFSET = 100;
const PLACES_IN_PAGE = 20;

function PlacesList() {
  const placesListRef = useRef(null);
  const [shownPagesCount, setShownPagesCount] = useState(1);
  const [places, setPlaces] = useState([]);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const url = `
      /places/list?
        parents=country:${COUNTRY_ID}
        &offset=${(shownPagesCount - 1) * PLACES_IN_PAGE}
        &levels=poi&limit=${PLACES_IN_PAGE}
        &categories=eating%7Ctraveling%7Cshopping
    `;

    setIsContentLoading(true);
    sygicAxios(url.replace(/\s/g, "")).then(({ data: { data } }) => {
      setPlaces(places => [...places, ...data.places]);
      setIsContentLoading(false);
    });
  }, [shownPagesCount]);

  const onScroll = useCallback(() => {
    const windowPos = window.scrollY;
    const placesListBottomPos =
      placesListRef.current.getBoundingClientRect().bottom + windowPos;
    const windowBottomPos = windowPos + window.innerHeight;
    const offset = placesListBottomPos - windowBottomPos;

    if (offset < LOADING_NEW_PAGE_OFFSET) {
      if (!isContentLoading && !scrolled) {
        setScrolled(true);
        setShownPagesCount(pagesCount => pagesCount + 1);
        setScrolled(false);
      }
    }
  }, [isContentLoading, scrolled]);

  useEffect(() => {
    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  return (
    <div className="places-list" ref={placesListRef}>
      <Masonry gutter="2rem" columnsCount={4}>
        {places.map((placeInfo, index) => (
          <PlaceCard
            key={index}
            fluid
            title={placeInfo.name}
            poster={placeInfo.thumbnail_url}
            description={placeInfo.perex}
          />
        ))}
      </Masonry>
    </div>
  );
}

export default PlacesList;
