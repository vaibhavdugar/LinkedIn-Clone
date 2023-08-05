import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Header from "./components/Header";
import Home from "./components/Home";

// App.js is the main file of the application. It is the parent component of all the other components. It is the entry point of the UI of our application

// Route component is used to define individual routes, Routes component is used to render first matching route and Router is used to change the url in the browser without reloading the entire page
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* This is the Login page for which Login component will be rendered */}
          <Route exact path="/" element={<Login />}></Route>
          <Route
            exact
            path="/home"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
