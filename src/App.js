import { Route, Switch } from "react-router";
import PageHome from "./components/pages/PageHome";
import PagePlace from "./components/pages/PagePlace";
import PageFavs from "./components/pages/PageFavs";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/place/:id" component={PagePlace} />
        <Route path="/favorites" component={PageFavs} />
        <Route exact path="/" component={PageHome} />
      </Switch>
    </div>
  );
}

export default App;
