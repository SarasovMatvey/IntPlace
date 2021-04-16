import NearPlaces from "./NearPlaces";

const setUp = props => shallow(<NearPlaces {...props} />);

describe("NearPlaces", () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it("should renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
