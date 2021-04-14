import React from "react";
import { Container } from "semantic-ui-react";
import PlacesList from "../../organisms/PlacesList";

function PageHome() {
  return (
    <div className="page-home">
      <Container>
        <PlacesList />
      </Container>
    </div>
  );
}

export default PageHome;
