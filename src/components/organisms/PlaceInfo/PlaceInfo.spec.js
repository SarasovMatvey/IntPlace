import PlaceInfo from "./PlaceInfo";

const setUp = props => shallow(<PlaceInfo {...props} />);

describe("PlaceInfo", () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it("should renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
