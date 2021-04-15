import { Container } from "semantic-ui-react";
import NearPlaces from "../../organisms/NearPlaces";
import PlacesFinder from "../../organisms/PlacesFinder";
import BaseTemplate from "../../templates/BaseTemplate";

function PageHome() {
  return (
    <BaseTemplate>
      <div className="page-home">
        <Container>
          <PlacesFinder />
        </Container>
      </div>
    </BaseTemplate>
  );
}

export default PageHome;
