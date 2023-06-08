import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';

import { Login, Category, AddExpenses, ManageExpenses, CategoryDetails, NoPage } from './pages';

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

     {!isLogin && <Header/>}
   <ToastContainer/>
     <Routes>
        <Route path='/' element={<Login />} />
        <Route path='category' element={<Category/>} />
        <Route path="category/:catId" element={<CategoryDetails />} />
        <Route path='addexpenses' element={<AddExpenses/>} />
        <Route path='expenses' element={<ManageExpenses/>} />
        <Route path='*' element={<NoPage/>} />
      </Routes>
    {!isLogin && <Footer/>}
</>
  );
}

export default App;
