import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "./style/main.scss";
import ProtectedRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/home/HomePage";
import AdminPage from "./pages/admin/AdminPage";
import ContactPage from "./pages/contact/ContactPage";
import EstablishmentsPage from "./pages/establishments/EstablishmentList";
import EstablishmentDetails from "./pages/establishments/EstablishmentDetailsPage";
import Navigationbar from "./components/layout/Navbar";
import EnquiryPage from "./pages/enquiry/EnquiryPage";
import LoginPage from "./pages/admin/Login";
import Footer from "./components/layout/Footer";
import Confirmation from "./components/common/Confirmation";
import Establishment from "./pages/admin/establishments/EstablishmentsPage";
import ContactMessages from "./pages/admin/contacts/ContactMessagesPage";
import CheckEnquiries from "./pages/admin/enquiries/EnquiriesPage";

function App() {
  return (
      <div className="page-container">
      <AuthProvider>
        <Router>
          <Navigationbar/>
            <div className="app-content-container">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/establishments" component={EstablishmentsPage}/>
                <Route path="/details/:id" component={EstablishmentDetails}/>
                <Route path="/login" component={LoginPage}/>
                <Route path="/booking" component={EnquiryPage}/>
                <Route path="/contact" component={ContactPage}/>
                <Route path="/confirmation" component={Confirmation}/>
                <ProtectedRoute path="/admin"  component={AdminPage} exact /> 
                <ProtectedRoute path="/admin/createestablishment" component={Establishment} />
                <ProtectedRoute path="/admin/contactmessages" component={ContactMessages} />
                <ProtectedRoute path="/admin/checkenquiries" component={CheckEnquiries} />
              </Switch>
            </div>
          <Footer/>
        </Router>
      </AuthProvider>
      </div>
  );
}

export default App;
