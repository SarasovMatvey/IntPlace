import { Card } from "semantic-ui-react";
import noImage from "./img/no-image.png";

function PlaceCard({
  poster,
  title,
  description,
  className,
  fluid,
  onClick,
  placeId,
}) {
  return (
    <Card
      data-id={placeId}
      className={className || ""}
      fluid={fluid}
      header={title}
      image={poster || noImage}
      description={description}
      onClick={onClick}
    />
  );
}

export default PlaceCard;
