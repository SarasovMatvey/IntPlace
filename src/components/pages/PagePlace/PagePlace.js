import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "semantic-ui-react";
import sygicAxios from "../../../api/sygic";
import PlaceInfo from "../../organisms/PlaceInfo";
import BaseTemplate from "../../templates/BaseTemplate/BaseTemplate";
import "./PagePlace.sass";

function PagePlace() {
  const { id: placeId } = useParams();
  const [placeInfo, setPlaceInfo] = useState(null);

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
            <PlaceInfo
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
            />
          ) : null}
        </Container>
      </div>
    </BaseTemplate>
  );
}

export default PagePlace;
