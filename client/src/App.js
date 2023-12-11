
import { RecoilRoot } from 'recoil';
import './App.css';
import InitUser from './components/InitUser';
import { Route, Routes } from "react-router-dom";
import Layout from './components/Layout';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/register"} element={<Register />} />
        </Route>
      </Routes>
    </RecoilRoot>
  );
}

export default App;
