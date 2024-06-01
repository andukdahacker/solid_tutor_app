/* @refresh reload */
import { render } from "solid-js/web";

import { Route, Router } from "@solidjs/router";
import Root from "./Root";
import { RoutesPath } from "./common/constants";
import "./index.css";
import ExplorePage from "./pages/ExplorePage";
import LandingPage from "./pages/LandingPage";
import LearnerDashboard from "./pages/LearnerDashboard";
import ProfilePage from "./pages/ProfilePage";
import TutorDashboard from "./pages/TutorDashboard";
import JobDetailPage from "./pages/JobDetailPage";
import CreateJobButton from "./features/Job/CreateJobButton";
import CreateJobPage from "./pages/CreateJobPage";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

render(
  () => (
    <Router root={Root}>
      <Route path={RoutesPath.landingPage} component={LandingPage} />
      <Route path={RoutesPath.explorePage} component={ExplorePage} />
      <Route
        path={RoutesPath.learnerDashboardPage}
        component={LearnerDashboard}
      />
      <Route path={RoutesPath.tutorDashboardPage} component={TutorDashboard} />
      <Route path={RoutesPath.profilePage} component={ProfilePage} />
      <Route path={RoutesPath.jobDetail} component={JobDetailPage} />
      <Route path={RoutesPath.createJob} component={CreateJobPage} />
    </Router>
  ),
  root!,
);
