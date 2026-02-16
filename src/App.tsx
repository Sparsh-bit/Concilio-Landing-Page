import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PetroLedger from "./pages/PetroLedger";
import MarketERP from "./pages/MarketERP";
import SchoolERP from "./pages/SchoolERP";
import PetroProblemFormPage from "./pages/PetroProblemFormPage";
import MarketProblemFormPage from "./pages/MarketProblemFormPage";
import SchoolProblemFormPage from "./pages/SchoolProblemFormPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/petroledger" element={<PetroLedger />} />
        <Route path="/petro-problem" element={<PetroProblemFormPage />} />
        <Route path="/market-erp" element={<MarketERP />} />
        <Route path="/market-problem" element={<MarketProblemFormPage />} />
        <Route path="/school-erp" element={<SchoolERP />} />
        <Route path="/school-problem" element={<SchoolProblemFormPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
