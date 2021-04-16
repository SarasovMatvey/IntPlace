import PagePlace from "./PagePlace";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "poi:201",
  }),
}));

const setUp = props => shallow(<PagePlace {...props} />);

describe("PagePlace", () => {
  let component;

  beforeEach(() => {
    component = setUp();
  });

  it("should renders properly", () => {
    expect(component).toMatchSnapshot();
  });
});
