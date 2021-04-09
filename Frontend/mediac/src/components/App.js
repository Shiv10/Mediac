import React, { useState } from "react";
import Signup from "./Signup";
import Navbar from "./Navbar";
import Home from "./Home";
import Faq from "./Faq";
import DocProfile from "./DocProfile";
import BlogList from "./BlogList";
import BlogListItem from "./BlogListItem";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import DoctorDashboard from "./DoctorDashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./Profile/UpdateProfile";
import UpdateDoctorProfile from "./Profile/updateDoctorProfile";
import AdminLogin from "./AdminLogin";
import AddDoc from "./AddDoc";
import Loading from "./Loading";
import ChangePassword from "./Profile/changePassword";
import Chat from "./Chat";
import VerificationSent from "./VerificationSent";
import ConsultancyForm from "./ConsultationForm";
import Choice from "./Choice";
import OtherPersonDetails from "./OtherPersonDetails";
import DoctorLogin from "./DoctorLogin";
import AddVideo from "../components/videos/addVideos";
import ViewVideos from "../components/videos/viewVideos";
import Video from "../components/blog/singleVideoPage";

<<<<<<< HEAD
import Header from "./Header";
import FormEditors from "../components/blog/addBlog";
import bgimg from "./img/image1.png";
import pimplesAcnePage from "./blog/Conditions/pimplesAcne";
import viewBlogs from "./blog/blog";
import singleBlog from "./blog/blogSingle";
=======
import VerificationSent from './VerificationSent'
import ConsultancyForm from './ConsultationForm'
import Choice from './Choice'
import OtherPersonDetails from './OtherPersonDetails'
import DoctorLogin from './DoctorLogin'
import AddVideo from "../components/videos/addVideos"
import ViewVideos from "../components/videos/viewVideos"
import Video from "../components/blog/singleVideoPage"
import page404 from "../components/utility/page_404"

import Header from './Header'
import FormEditors from "../components/blog/addBlog"
import bgimg from './img/image1.png';
import pimplesAcnePage from './blog/Conditions/pimplesAcne';
import viewBlogs from './blog/blog';
import singleBlog from './blog/blogSingle';
>>>>>>> 80c0394e7e26776bd76ed538d9482b287b216263

export const DataContext = React.createContext();
export const DocMailContext = React.createContext();
export const TokenContext = React.createContext();

function App() {
  const [consultationData, setConsultationData] = useState("");
  const [docMail, setDocMail] = useState("");
  const [token, setToken] = useState("");
  return (
    <Router>
      <AuthProvider>
        <DataContext.Provider value={[consultationData, setConsultationData]}>
          {/* <div className="Navb"><Navbar /></div> */}

          <div className="everything">
            <Switch>
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute
                path="/change-password"
                component={ChangePassword}
              />
              <PrivateRoute
                path="/verification-sent"
                component={VerificationSent}
              />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute
                path="/ConsultationForm"
                component={ConsultancyForm}
              />
              <PrivateRoute path="/Choice" component={Choice} />
              <PrivateRoute
                path="/OtherPersonDetails"
                component={OtherPersonDetails}
              />
              <PrivateRoute path="/add-blog" component={FormEditors} />
              <PrivateRoute path="/add-video" component={AddVideo} />
              <PrivateRoute
                path="/update-doctor"
                component={UpdateDoctorProfile}
              />
              <PrivateRoute path="/loading" component={Loading} />
              <PrivateRoute path="/chat" component={Chat} />

              <Route exact path="/" component={Home} />
              <Route exact path="/blogs" component={viewBlogs} />
              <Route exact path="/blog" component={singleBlog} />
              <Route path="/login" component={Login} />
              <Route exact path="/faq" component={Faq} />
              <Route path="/signup" component={Signup} />
              <Route path="/videos" component={ViewVideos} />
              <Route path="/video" component={Video} />
<<<<<<< HEAD
=======
              <Route path="/404" component={page404} />

>>>>>>> 80c0394e7e26776bd76ed538d9482b287b216263
              <Route exact path="/pimples-acne" component={pimplesAcnePage} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route exact path="/home#faqhead" component={Home} />

              <Route path="/doctor" component={DocProfile} />
              <PrivateRoute
                path="/doctordashboard"
                component={DoctorDashboard}
              />

              <TokenContext.Provider value={[token, setToken]}>
                <Route exact path="/adminlogin" component={AdminLogin} />
                <Route exact path="/AddDoc" component={AddDoc} />
              </TokenContext.Provider>
            </Switch>
          </div>
        </DataContext.Provider>
      </AuthProvider>
    </Router>
  );
}

export default App;
