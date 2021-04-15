import { Card, Image } from "semantic-ui-react";
import noImage from "./img/no-image.png";

function PlaceCard({
  poster,
  title,
  description,
  className,
  fluid,
  onClick,
  placeId,
  children,
}) {
  return (
    <Card
      data-id={placeId}
      className={className || ""}
      fluid={fluid}
      onClick={onClick}
    >
      <Image src={poster || noImage} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>{description}</Card.Description>
        {children}
      </Card.Content>
    </Card>
  );
}

export default PlaceCard;
