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
import Employees from "./employee/Employee";
import MySidebar from "./Navbar/sidebar";
import Dashboard from "./Navbar/Dashboard";
import Sidebar from "./Navbar/sidebar_copy";
import Jobs from "./jobs/Jobs";
import MainPage from "./MainPage/MainPage";
import Login from "./Login";
import { ReactNode } from "react";

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row-reverse",
//             maxWidth: "100vw",
//             // height: "100vh",
//             // flexBasis: "200px"
//           }}
//         >

//           <MySidebar />

//           <Routes>
//           <Route
//             path="Login"
//             element={
//               <>
//                 {/* {error && <p className="text-danger">{error}</p>} */}
//                 {/* {isLoading && <div className="spinner-border"></div>} */}
//                 <Login />
//               </>
//             }
//           />
//             <Route path="/" element={<MainPage />} />
//             <Route
//               path="calculate"
//               element={
//                 <>
//                   {/* {error && <p className="text-danger">{error}</p>} */}
//                   {/* {isLoading && <div className="spinner-border"></div>} */}
//                   <Calulator />
//                 </>
//               }
//             />

//             <Route
//               path="jobs"
//               element={
//                 <>
//                   {/* {error && <p className="text-danger">{error}</p>} */}
//                   {/* {isLoading && <div className="spinner-border"></div>} */}
//                   <Jobs />
//                 </>
//               }
//             />
//             <Route
//               path="mangment"
//               element={
//                 <>
//                   {/* {error && <p className="text-danger">{error}</p>} */}
//                   <Mangment />
//                 </>
//               }
//             />

//             <Route
//               path="categories"
//               element={
//                 <>
//                   {/* {error && <p className="text-danger">{error}</p>} */}
//                   <Categories />
//                 </>
//               }
//             />
//             <Route
//               path="customers"
//               element={
//                 <>
//                   {/* //{error && <p className="text-danger">{error}</p>} */}
//                   <Customers />
//                 </>
//               }
//             />
//             <Route
//               path="employees"
//               element={
//                 <>
//                   {/* //{error && <p className="text-danger">{error}</p>} */}
//                   <Employees />
//                 </>
//               }
//             />
//             <Route
//               path="invoices"
//               element={
//                 <>
//                   {/* //{error && <p className="text-danger">{error}</p>} */}
//                   <Invoices />
//                 </>
//               }
//             />

//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </>
//     // <Dashboard />
//   );
// }

function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: "Cairo, sans-serif" }}>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="Login" element={<Login />} />

          <Route
            path="*"
            element={
              <DashboardLayout>
                <Routes>
                  
                  <Route path="/MainPage" element={<MainPage />} />
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
                    path="jobs"
                    element={
                      <>
                        {/* {error && <p className="text-danger">{error}</p>} */}
                        {/* {isLoading && <div className="spinner-border"></div>} */}
                        <Jobs />
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
                    path="employees"
                    element={
                      <>
                        {/* //{error && <p className="text-danger">{error}</p>} */}
                        <Employees />
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
                </Routes>
              </DashboardLayout>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        maxWidth: "100vw",
      }}
    >
      <MySidebar />
      {children}
    </div>
  );
}

export default App;
