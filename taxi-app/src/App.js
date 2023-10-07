import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FirstPage from "./routes/FirstPage";
import SingUpPage from "./routes/SingUpPage";
import Login from "./routes/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/singUp">
          <SingUpPage />
        </Route>
        <Route path="/">
          <FirstPage />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
