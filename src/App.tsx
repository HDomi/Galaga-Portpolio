import Loading from "@components/layout/Loading/Loading";
import Main from "@pages/main/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import Introduce from "@pages/introduce/Introduce";
import Skills from "@pages/skills/Skills";
import Portpolio from "@pages/portpolio/Portpolio";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Loading />
        <BrowserRouter>
          <Toaster position="top-center" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/introduce" element={<Introduce />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/portpolio" element={<Portpolio />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
