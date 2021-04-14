import { Route, Switch } from "react-router";
import PageHome from "./components/pages/PageHome";
import PagePlace from "./components/pages/PagePlace";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/place/:id" component={PagePlace} />
        <Route exact path="/" component={PageHome} />
      </Switch>
    </div>
  );
}

export default App;
