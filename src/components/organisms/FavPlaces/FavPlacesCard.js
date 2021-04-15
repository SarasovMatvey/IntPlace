import { Button } from "semantic-ui-react";
import PlaceCard from "../../atoms/PlaceCard";

function FavPlacesCard({
  description,
  onClick,
  placeId,
  poster,
  title,
  onDeleteBtnClick,
}) {
  return (
    <div className="fav-places__card">
      <PlaceCard
        className="fav-places__card-inner"
        fluid
        description={description}
        onClick={onClick}
        placeId={placeId}
        poster={poster}
        title={title}
      >
        <Button
          className="fav-places__card-delete-btn"
          circular
          icon="close"
          onClick={onDeleteBtnClick}
        />
      </PlaceCard>
    </div>
  );
}

export default FavPlacesCard;
