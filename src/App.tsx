import "./App.css";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";

import Calulator from "./Product/Calculation/Calulator.component";
import Mangment from "./Product/Mangment/Mangment.component";
import Categories from "./categories/Categories";
import Customers from "./customers/Customers";
import Invoices from "./Invoices/Invoices";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Home />} />
            <Route
              path="calculate"
              element={
                <>
                  {/* {error && <p className="text-danger">{error}</p>} */}
                  {/* {isLoading && <div className="spinner-border"></div>} */}
                  <Calulator />
                </>
              }
            />
            <Route
              path="mangment"
              element={
                <>
                  {/* {error && <p className="text-danger">{error}</p>} */}
                  <Mangment />
                </>
              }
            />

            <Route
              path="categories"
              element={
                <>
                  {/* {error && <p className="text-danger">{error}</p>} */}
                  <Categories />
                </>
              }
            />
            <Route
              path="customers"
              element={
                <>
                  {/* //{error && <p className="text-danger">{error}</p>} */}
                  <Customers />
                </>
              }
            />
            <Route
              path="invoices"
              element={
                <>
                  {/* //{error && <p className="text-danger">{error}</p>} */}
                  <Invoices />
                </>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
