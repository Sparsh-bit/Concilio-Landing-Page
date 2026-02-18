import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LenisProvider } from "./hooks/useLenis";
import Home from "./pages/Home";
import PetroLedger from "./pages/PetroLedger";
import MarketERP from "./pages/MarketERP";
import SchoolERP from "./pages/SchoolERP";
import PetroProblemFormPage from "./pages/PetroProblemFormPage";
import MarketProblemFormPage from "./pages/MarketProblemFormPage";
import SchoolProblemFormPage from "./pages/SchoolProblemFormPage";
import BusinessProblemPage from "./pages/BusinessProblemPage";
import LegalPage from "./pages/LegalPage";

function App() {
  return (
    <BrowserRouter>
      <LenisProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/petroledger" element={<PetroLedger />} />
          <Route path="/petro-problem" element={<PetroProblemFormPage />} />
          <Route path="/market-erp" element={<MarketERP />} />
          <Route path="/market-problem" element={<MarketProblemFormPage />} />
          <Route path="/school-erp" element={<SchoolERP />} />
          <Route path="/school-problem" element={<SchoolProblemFormPage />} />
          <Route path="/describe-problem" element={<BusinessProblemPage />} />
          <Route path="/privacy" element={<LegalPage />} />
          <Route path="/terms" element={<LegalPage />} />
          <Route path="/cookies" element={<LegalPage />} />
        </Routes>
      </LenisProvider>
    </BrowserRouter>
  );
}

export default App;
