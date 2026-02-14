import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PetroLedger from "./pages/PetroLedger";
import MarketERP from "./pages/MarketERP";
import SchoolERP from "./pages/SchoolERP";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/petroledger" element={<PetroLedger />} />
        <Route path="/market-erp" element={<MarketERP />} />
        <Route path="/school-erp" element={<SchoolERP />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
