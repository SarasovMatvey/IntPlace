import PlaceCard from "./PlaceCard";

const setUp = props => shallow(<PlaceCard {...props} />);

describe("PlaceCard", () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it("should renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
