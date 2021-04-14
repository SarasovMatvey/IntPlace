import { Container } from "semantic-ui-react";
import PlacesList from "../../organisms/PlacesList";
import BaseTemplate from "../../templates/BaseTemplate/BaseTemplate";

function PageHome() {
  return (
    <BaseTemplate>
      <div className="page-home">
        <Container>
          <PlacesList />
        </Container>
      </div>
    </BaseTemplate>
  );
}

export default PageHome;
