import { Accordion, Dropdown, Segment } from "semantic-ui-react";

function PlacesFinderRequestSettings({
  isOpen,
  countries,
  categories,
  defalutCountryValue,
  defalutCategoriesValues,
  onCountryChange,
  onCategoriesChange,
}) {
  return (
    <div className="places-finder__request-settings">
      <Accordion>
        <Accordion.Content active={isOpen}>
          <Segment className="places-finder__request-settings-types" padded>
            <Dropdown
              placeholder="Country"
              search
              selection
              options={countries}
              defaultValue={defalutCountryValue}
              onChange={onCountryChange}
            />
            <Dropdown
              placeholder="Categories"
              fluid
              multiple
              selection
              options={categories}
              defaultValue={defalutCategoriesValues}
              onChange={onCategoriesChange}
            />
          </Segment>
        </Accordion.Content>
      </Accordion>
    </div>
  );
}

export default PlacesFinderRequestSettings;
