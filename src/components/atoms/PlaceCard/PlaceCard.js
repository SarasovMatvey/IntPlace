import { Card } from "semantic-ui-react";
import noImage from "./img/no-image.png";

function PlaceCard({ poster, title, description, className, fluid }) {
  return (
    <Card
      className={className || ""}
      fluid={fluid}
      header={title}
      image={poster || noImage}
      description={description}
    />
  );
}

export default PlaceCard;
