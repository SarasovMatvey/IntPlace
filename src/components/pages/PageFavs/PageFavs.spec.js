import PageFavs from "./PageFavs";

jest.mock("../../../api/sygic.js", () => ({}));

const setUp = props => shallow(<PageFavs {...props} />);

describe("PageFavs", () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it("should renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
