import React from "react";
import AddHistory from "./History/AddHistory";
import HistoryList from "./History/HistoryList";
import EditHistory from "./History/EditHistory";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Layout from "./Layout/Layout";
function App() {
  return (
    <Router>
      <Layout/>
    </Router>

    // <Router>
    //   <div className="container">
    //     <nav className="navbar navbar-expand-lg navheader">
    //       <div className=" navbar-collapse">
    //         <ul className="navbar-nav mr-auto">
    //           <li className="nav-item">
    //             <Link to={"/AddHistory"} className="nav-link">
    //               Add History
    //             </Link>
    //           </li>
    //           <li className="nav-item">
    //             <Link to={"/HistoryList"} className="nav-link">
    //               History List
    //             </Link>
    //           </li>
    //         </ul>
    //       </div>
    //     </nav>{" "}
    //     <br />
    //     {/* <Switch>
    //       <Route exact path="/AddHistory" component={AddHistory} />
    //       <Route path="/edit/:id" component={EditHistory} />
    //       <Route path="/HistoryList" component={HistoryList} />
    //     </Switch> */}

    //     <AddHistory/>
    //     <HistoryList/>
    //   </div>
    // </Router>
  );
}

export default App;
 