import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import LandingDoctor from './components/LandingPage/LandingDoctor';
import YourPatients from './components/YourPatients/YourPatients';
import RegistrationPage from './components/Register/RegisterScreen';
import ProfileEditForm from './components/Profile/Profile';
import AddNewPat from './components/AddNewPat/AddNewPat';
import AddApp from './components/AddApp/AddApp';
import ChangePassword from './components/Profile/ChangePassword';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Routes, Route, Redirect } from 'react-router-dom';
import PastOrdersItems from './components/PastOrdersItems/PastOrderItems';
import Patient from './components/Patient/Patient';
import Landing from './components/LandingPage/Landing';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        {/* <Route exact path="/newpatient" element={<AddNewPat/>} /> */}
        <Route path="/newpatient" element={ <Layout><AddNewPat/></Layout>} />
        <Route path="/profile" element={ <Layout><ProfileEditForm/></Layout>} />
        {/* <Route exact path="/profile" element={<ProfileEditForm/>} /> */}
          <Route path="/home" element={<Layout><LandingDoctor /></Layout>} />
          <Route path="/yourpatients" element={ <Layout><YourPatients /></Layout>} />
          <Route path="/change" element={<ChangePassword />} />
          <Route path='/PastOrderItems/:patientID' element={<PastOrdersItems/>}/>
          <Route path='/AddApp/:patientID' element={ <Layout><AddApp/></Layout>}/>
          <Route path="/patient/:patientID" element={ <Layout><Patient /></Layout>} />
          <Route path="/" element={<Layout><Landing /></Layout>} />

        </Routes>
        <ToastContainer toastclassName="custom-toast-container" />
      </div>
    </BrowserRouter>
  );
}

export default App;
