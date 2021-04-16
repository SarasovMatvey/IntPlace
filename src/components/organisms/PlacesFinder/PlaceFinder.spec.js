import PlacesFinder from "./PlacesFinder";

const setUp = props => shallow(<PlacesFinder {...props} />);

describe("PlacesFinder", () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it("should renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
