import Header from "./Header";

const setUp = props => shallow(<Header {...props} />);

describe("Header", () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it("should renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
