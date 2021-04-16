import { useEffect, useState } from "react";
import { Button, Segment } from "semantic-ui-react";
import Masonry from "react-responsive-masonry";
import sygicAxios from "../../../api/sygic";
import PlaceCard from "../../atoms/PlaceCard";
import { useHistory } from "react-router";
import "./NearPlaces.sass";

function NearPlaces({ className = "", targetPlaceId, area = {} }) {
  const { lat, lon, radius } = area;

  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    sygicAxios(`/places/list?area=${lat},${lon},${radius}`).then(
      ({ data: { data } }) => {
        const placesWithoutSimilar = data.places.filter(
          placeInfo => !(placeInfo.id === targetPlaceId)
        );

        setPlaces(placesWithoutSimilar);
      }
    );
  }, [lat, lon, radius, targetPlaceId]);

  return (
    <div className={`near-places ${className}`}>
      <Button onClick={() => setIsOpen(isOpen => !isOpen)}>
        {isOpen ? "Hide" : "Show"} nearest places
      </Button>
      {isOpen ? (
        <Segment>
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
        </Segment>
      ) : null}
    </div>
  );

  function goToPlaceInfoPage(placeId) {
    history.replace(`/place/${placeId}`);
  }
}

export default NearPlaces;
