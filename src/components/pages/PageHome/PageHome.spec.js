import PageHome from "./PageHome";

const setUp = props => shallow(<PageHome {...props} />);

describe("PageHome", () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it("should renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
