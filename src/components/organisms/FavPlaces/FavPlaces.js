import Masonry from "react-responsive-masonry";
import FavPlacesCard from "./FavPlacesCard";
import sygicAxios from "../../../api/sygic";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import "./FavPlaces.sass";

function FavPlaces() {
  const history = useHistory();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const favPlacesIds = JSON.parse(localStorage.getItem("favPlaces"));
    sygicAxios(
      `/places?ids=${favPlacesIds.join("%7C")}`
    ).then(({ data: { data } }) => setPlaces(data.places));
  }, []);

  return (
    <div className="fav-places">
      <Masonry gutter="2rem" columnsCount={4}>
        {places.map(placeInfo => (
          <FavPlacesCard
            key={placeInfo.id}
            title={placeInfo.name}
            poster={placeInfo.thumbnail_url}
            description={placeInfo.perex}
            placeId={placeInfo.id}
            onClick={e => goToPlaceInfoPage(e.currentTarget.dataset.id)}
            onDeleteBtnClick={e => {
              e.stopPropagation();
              deleteFavPlace(e.currentTarget.dataset.id);
            }}
          />
        ))}
      </Masonry>
    </div>
  );

  function deleteFavPlace(placeId) {
    const favPlaces = JSON.parse(localStorage.getItem("favPlaces"));
    const deletedPlaceIndex = favPlaces.indexOf(placeId);
    favPlaces.splice(deletedPlaceIndex, 1);
    setPlaces(places => {
      const newPlaces = places.splice(deletedPlaceIndex, 1);
      return newPlaces;
    });

    localStorage.setItem("favPlaces", JSON.stringify(favPlaces));
  }

  function goToPlaceInfoPage(placeId) {
    history.push(`place/${placeId}`);
  }
}

export default FavPlaces;
