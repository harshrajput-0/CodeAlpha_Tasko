// import { Button } from "./components/ui/button";
// import { SearchBar } from "./components/smaill-items/SearchBar";
// import { CreateButton } from "./components/smaill-items/Create";
// import { Header } from "./components/layout/Header";

// import { AppSidebar } from "./components/layout/AppSidebar";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './components/page/HomePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
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
