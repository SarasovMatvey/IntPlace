import { useRef, useState } from "react";
import "./PlacesFinder.sass";
import { Input } from "semantic-ui-react";
import PlacesFinderList from "./PlacesFinderList";

const COUNTRY_ID = 43;
const PLACES_IN_PAGE = 20;
const LOADING_NEW_PAGE_OFFSET = 100;

function PlacesFinder() {
  const placesFinderRef = useRef(null);
  const [searchBarValue, setSearchBarValue] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  return (
    <div className="places-finder" ref={placesFinderRef}>
      <Input
        className="places-finder__search-bar"
        size="huge"
        icon={{
          name: "search",
          circular: true,
          link: true,
          onClick: () => setSearchQuery(searchBarValue),
        }}
        placeholder="Find Place..."
        onChange={e => setSearchBarValue(e.currentTarget.value)}
      />
      <PlacesFinderList
        countryId={COUNTRY_ID}
        loadNewOffset={LOADING_NEW_PAGE_OFFSET}
        placesInPage={PLACES_IN_PAGE}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default PlacesFinder;
