import FavPlaces from "./FavPlaces";

const setUp = props => shallow(<FavPlaces {...props} />);

describe("FavPlaces", () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it("should renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
