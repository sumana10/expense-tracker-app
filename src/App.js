import logo from './logo.svg';
import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Login from './pages/Login';
import Category from './pages/Category';
import AddExpenses from './pages/AddExpenses';
import ManageExpenses from './pages/ManageExpenses';
import CategoryDetails from './pages/CategoryDetails';
import NoPage from './pages/NoPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App =() => {

    let { pathname } = useLocation();
  const isLogin = pathname === '/'
  return (
<>

     {!isLogin && <Header></Header>}
   <ToastContainer/>
     <Routes>
        <Route path='/' element={<Login />} />
        <Route path='category' element={<Category/>} />
        <Route path="category/:catId" element={<CategoryDetails />} />
        <Route path='addexpenses' element={<AddExpenses/>} />
        <Route path='expenses' element={<ManageExpenses/>} />
        <Route path='*' element={<NoPage/>} />
      </Routes>
    {!isLogin && <Footer></Footer>}
</>
  );
}

export default App;
