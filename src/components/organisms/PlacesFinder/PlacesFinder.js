import { useRef, useState } from "react";
import { Button, Input } from "semantic-ui-react";
import PlacesFinderList from "./PlacesFinderList";
import PlacesFinderRequestSettings from "./PlacesFinderRequestSettings";
import "./PlacesFinder.sass";
import _ from "lodash";

const PLACES_IN_PAGE = 20;
const LOADING_NEW_PAGE_OFFSET = 100;
const CATEGORIES = ["eating", "traveling", "shopping"];
const COUNTRIES = {
  Russia: 37,
  USA: 43,
  Japan: 75,
};
const DEFALUT_COUNTRY_VALUE = 43;
export const DEFALUT_CATEGORIES_VALUES = ["eating", "traveling", "shopping"];

function PlacesFinder() {
  const placesFinderRef = useRef(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [preData, setPreData] = useState({
    searchQuery: null,
    countryId: DEFALUT_COUNTRY_VALUE,
    categories: DEFALUT_CATEGORIES_VALUES,
  });
  const [realData, setRealData] = useState({
    searchQuery: null,
    countryId: DEFALUT_COUNTRY_VALUE,
    categories: DEFALUT_CATEGORIES_VALUES,
  });

  return (
    <div className="places-finder" ref={placesFinderRef}>
      <Input
        className="places-finder__search-bar"
        size="huge"
        icon={{
          name: "search",
          circular: true,
          link: true,
          onClick: () => setRealData(_.cloneDeep(preData)),
        }}
        placeholder="Find Place..."
        onChange={e => {
          const value = e.currentTarget.value;
          setPreData(preData => ({
            ...preData,
            searchQuery: value,
          }));
        }}
      />
      <Button
        className="places-finder__settings-btn"
        circular
        icon="settings"
        onClick={() => setIsSettingsOpen(isSettingsOpen => !isSettingsOpen)}
      />
      <PlacesFinderRequestSettings
        isOpen={isSettingsOpen}
        countries={_.map(COUNTRIES, (countryId, countryName) => ({
          text: countryName,
          value: countryId,
        }))}
        defalutCountryValue={DEFALUT_COUNTRY_VALUE}
        onCountryChange={(_, { value }) =>
          setPreData(preData => ({ ...preData, countryId: value }))
        }
        categories={CATEGORIES.map(category => ({
          text: category,
          value: category,
        }))}
        defalutCategoriesValues={DEFALUT_CATEGORIES_VALUES}
        onCategoriesChange={(_, { value }) =>
          setPreData(preData => ({
            ...preData,
            categories: value,
          }))
        }
      />
      <PlacesFinderList
        countryId={realData.countryId}
        loadNewOffset={LOADING_NEW_PAGE_OFFSET}
        placesInPage={PLACES_IN_PAGE}
        searchQuery={realData.searchQuery}
        categories={realData.categories}
      />
    </div>
  );
}

export default PlacesFinder;
