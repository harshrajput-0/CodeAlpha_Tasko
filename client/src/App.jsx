// import { Button } from "./components/ui/button";
// import { SearchBar } from "./components/smaill-items/SearchBar";
// import { CreateButton } from "./components/smaill-items/Create";
// import { Header } from "./components/layout/Header";

// import { AppSidebar } from "./components/layout/AppSidebar";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './components/page/HomePage';
import { Register } from './components/page/auth/RegisterPage';
import { Login } from './components/page/auth/LoginPage';
import { ChangePassword } from './components/page/auth/ChangePassword';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <div className="min-h-screen h-500">

<Header />
{/* <AppSidebar /> */}
      {/* <h1>sldfdsfksjl</h1>
 <Button>lrkfslkdf</Button>
 <SearchBar></SearchBar>
 <CreateButton />
 </div>  */}
    </>
  );
}

export default App;
