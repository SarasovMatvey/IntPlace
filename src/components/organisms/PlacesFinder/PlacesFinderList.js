import { useEffect, useRef, useState } from "react";
import Masonry from "react-responsive-masonry";
import { useHistory } from "react-router-dom";
import sygicAxios from "../../../api/sygic";
import useOffset from "../../../utils/hooks/useOffset";
import PlaceCard from "../../atoms/PlaceCard";

function PlacesFinderList({
  searchQuery,
  loadNewOffset,
  countryId,
  placesInPage,
}) {
  const history = useHistory();
  const placesFinderRef = useRef(null);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [shownPagesCount, setShownPagesCount] = useState(1);
  const [places, setPlaces] = useState([]);

  useOffset(placesFinderRef, loadNewOffset, () => {
    if (!isContentLoading) {
      console.log(123);

      setShownPagesCount(pagesCount => pagesCount + 1);
    }
  });

  useEffect(() => {
    if (!searchQuery) return;

    setShownPagesCount(1);

    const url = `/places/list?
      query=${searchQuery.replace(/\s/g, "%20")}&
      parents=country:${countryId}
      &categories=eating%7Ctraveling%7Cshopping

    `;
    sygicAxios(url).then(({ data: { data } }) => setPlaces(data.places));
  }, [searchQuery]);

  useEffect(() => {
    const url = searchQuery
      ? `
      /places/list?
      query=${searchQuery.replace(/\s/g, "%20")}&
      parents=country:${countryId}
      &offset=${(shownPagesCount - 1) * placesInPage}
      &levels=poi
      &limit=${placesInPage}
      `
      : `
      /places/list?
        parents=country:${countryId}
        &offset=${(shownPagesCount - 1) * placesInPage}
        &levels=poi
        &limit=${placesInPage}
        &categories=eating%7Ctraveling%7Cshopping
      `;

    setIsContentLoading(true);
    sygicAxios(url.replace(/\s/g, "")).then(({ data: { data } }) => {
      setPlaces(places => [...places, ...data.places]);
      setIsContentLoading(false);
    });
  }, [shownPagesCount, searchQuery]);

  return (
    <div className="places-finder__list" ref={placesFinderRef}>
      <Masonry gutter="2rem" columnsCount={4}>
        {places.map(placeInfo => (
          <PlaceCard
            className="places-finder__card"
            key={placeInfo.id}
            fluid
            title={placeInfo.name}
            poster={placeInfo.thumbnail_url}
            description={placeInfo.perex}
            placeId={placeInfo.id}
            onClick={e => goToPlaceInfoPage(e.currentTarget.dataset.id)}
          />
        ))}
      </Masonry>
    </div>
  );

  function goToPlaceInfoPage(placeId) {
    history.push(`place/${placeId}`);
  }
}

export default PlacesFinderList;
