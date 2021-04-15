import { useEffect, useRef, useState } from "react";
import Masonry from "react-responsive-masonry";
import { useHistory } from "react-router-dom";
import sygicAxios from "../../../api/sygic";
import useOffset from "../../../utils/hooks/useOffset";
import PlaceCard from "../../atoms/PlaceCard";
import { DEFALUT_CATEGORIES_VALUES } from "./PlacesFinder";

function PlacesFinderList({
  searchQuery,
  countryId,
  categories,
  placesInPage,
  loadNewOffset,
}) {
  const history = useHistory();
  const placesFinderRef = useRef(null);
  const [isContentLoading, setIsContentLoading] = useState(false);
  const [shownPagesCount, setShownPagesCount] = useState(1);
  const [places, setPlaces] = useState([]);

  useOffset(placesFinderRef, loadNewOffset, () => {
    if (!isContentLoading) {
      setShownPagesCount(pagesCount => pagesCount + 1);
    }
  });

  useEffect(() => {
    setShownPagesCount(1);

    const url = getUrl({
      searchQuery,
      countryId,
      categories,
      limit: placesInPage,
    });

    sygicAxios(url).then(({ data: { data } }) => setPlaces(data.places));
  }, [searchQuery, countryId, categories, placesInPage]);

  useEffect(() => {
    const url = getUrl({
      searchQuery,
      countryId,
      categories,
      offset: (shownPagesCount - 1) * placesInPage,
      limit: placesInPage,
    });

    setIsContentLoading(true);
    sygicAxios(url.replace(/\s/g, "")).then(({ data: { data } }) => {
      setPlaces(places => [...places, ...data.places]);
      setIsContentLoading(false);
    });
  }, [shownPagesCount, searchQuery, countryId, categories, placesInPage]);

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

  function getUrl({
    searchQuery,
    countryId,
    categories,
    levels,
    offset,
    limit,
  }) {
    const queryParamStr = searchQuery
      ? `query=${searchQuery.replace(/s/g, "%20")}`
      : "";
    const parentsParamStr = `parents=country:${countryId}`;
    const categoriesParamStr = categories
      ? `categories=${categories.join("%7C")}`
      : `categories=${DEFALUT_CATEGORIES_VALUES.join("%7C")}`;
    const levelsParamStr = levels ? `levels=${levels}` : `levels=poi`;
    const offsetParamStr = offset ? `offset=${offset}` : "";
    const limitParamStr = limit ? `limit=${limit}` : "";

    const url = `/places/list?
      ${queryParamStr}&
      ${parentsParamStr}&
      ${categoriesParamStr}&
      ${levelsParamStr}&
      ${offsetParamStr}&
      ${limitParamStr}
    `;

    return url;
  }
}

export default PlacesFinderList;
