import Header from "../../organisms/Header";

function BaseTemplate({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default BaseTemplate;
