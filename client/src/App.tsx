import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
import CaseStudy from "@/pages/CaseStudy";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/case-study/:id" component={CaseStudy} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;
