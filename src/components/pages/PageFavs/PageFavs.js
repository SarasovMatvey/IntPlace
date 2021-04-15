import { Container } from "semantic-ui-react";
import FavPlaces from "../../organisms/FavPlaces";
import BaseTemplate from "../../templates/BaseTemplate";

function PageFavs() {
  return (
    <BaseTemplate>
      <Container>
        <FavPlaces />
      </Container>
    </BaseTemplate>
  );
}

export default PageFavs;
