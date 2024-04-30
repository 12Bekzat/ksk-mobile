import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../../scss/style.scss';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Login from '../../pages/Login';
import Menu from '../menu/Menu';
import Home from '../../pages/Home';
import AuthProvider from '../../providers/AuthProvider';
import Profile from '../../pages/Profile';
import UserEdit from '../../pages/UserEdit';
import Payments from '../../pages/Payments';
import { LoaderProvider } from '../../providers/LoaderProvider';
import Pay from '../../pages/Pay';

function App() {
  return (
    <Router>
      <AuthProvider>
        <LoaderProvider>
          <Menu />
          <Header />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/payments' element={<Payments />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/user/edit/:id' element={<UserEdit />} />
            <Route path='/pay' element={<Pay/>} />
          </Routes>

          <Footer />

        </LoaderProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
