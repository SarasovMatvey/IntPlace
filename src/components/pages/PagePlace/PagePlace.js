import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { Swiper } from "swiper/react";
import sygicAxios from "../../../api/sygic";
import NearPlaces from "../../organisms/NearPlaces";
import PlaceInfo from "../../organisms/PlaceInfo";
import BaseTemplate from "../../templates/BaseTemplate/BaseTemplate";
import "./PagePlace.sass";

function PagePlace() {
  const { id: placeId } = useParams();
  const [placeInfo, setPlaceInfo] = useState(null);
  const [inLocalStorage, setInLocalStorage] = useState(
    JSON.parse(localStorage.getItem("favPlaces"))?.includes(placeId) || false
  );

  useEffect(() => {
    sygicAxios(`/places/${placeId}`).then(({ data: { data } }) => {
      setPlaceInfo(data.place);
    });
  }, [placeId]);

  return (
    <BaseTemplate>
      <div className="page-place">
        <Container>
          {placeInfo ? (
            <>
              <Swiper onF></Swiper>
              <div className="" aria-atomic></div>
              <PlaceInfo
                className="page-place__place-info"
                placeName={placeInfo.name}
                mainImg={placeInfo.main_media?.media[0].url}
                description={placeInfo.description?.text}
                media={placeInfo.main_media?.media
                  .slice(1)
                  .map(mediaData => mediaData.url)}
                params={{
                  Address: placeInfo.address,
                  Rating: placeInfo.rating.toFixed(1),
                  Phone: placeInfo.phone,
                  Email: placeInfo.email,
                }}
                inLocalStorage={inLocalStorage}
                onFavBtnClick={onFavBtnClick}
              />
              <NearPlaces
                className="page-place__near-places"
                targetPlaceId={placeId}
                area={{
                  lat: placeInfo.location.lat,
                  lon: placeInfo.location.lng,
                  radius: 1000,
                }}
              />
            </>
          ) : null}
        </Container>
      </div>
    </BaseTemplate>
  );

  function onFavBtnClick() {
    const favs = JSON.parse(localStorage.getItem("favPlaces")) || [];
    const indexInLocalStorage = favs.indexOf(placeId);

    if (indexInLocalStorage === -1) {
      favs.push(placeId);
      localStorage.setItem("favPlaces", JSON.stringify(favs));
      setInLocalStorage(true);
    } else {
      favs.splice(indexInLocalStorage, 1);
      localStorage.setItem("favPlaces", JSON.stringify(favs));
      setInLocalStorage(false);
    }
  }
}

export default PagePlace;
