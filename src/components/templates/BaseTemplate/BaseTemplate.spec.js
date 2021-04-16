import BaseTemplate from "./BaseTemplate";

const setUp = props => shallow(<BaseTemplate {...props} />);

describe("BaseTemplate", () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it("should renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
