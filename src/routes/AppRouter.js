import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import NotAuthorizedPage from "../pages/NotAuthorizedPage";
import NotFound from "../pages/NotFoundPage";
import AuthGuard from "../auth/AuthGuard";
import {AuthProvider} from "../auth/AuthContext";
import AdminPage from "../pages/AdminPage";
import UserPage from "../pages/UserPage";
import ProfilePage from "../pages/ProfilePage";
import CompanyPage from "../pages/CompanyPage";
import EmployeePage from "../pages/EmployeePage";
import TypeOfEmployeePage from "../pages/TypeOfEmployeePage";
import EmploymentPage from "../pages/EmploymentPage";
import AreaPage from "../pages/AreaPage";
import WelcomePage from "../pages/WelcomePage"
import DocumentPage from "../pages/DocumentPage";
import FarmPage from "../pages/FarmPage";
import AddInformationPage from "../pages/AddInformationPage";
import ActivityPage from "../pages/ActivityPage";
import AdvanceUnitPage from "../pages/AdvanceUnitPage";
import AdminBudgetPage from "../pages/AdminBudgetPage";

const AppRouter = () => {
  return (  
    <Router basename="/"> 
      <Routes>
            <Route exact path="/" element={
                                            <AuthProvider>
                                                <LoginPage/>
                                            </AuthProvider>
                                          }/>
            <Route path="/admin" 
              element={
                <AuthProvider>
                  <AuthGuard>
                    <AdminPage />
                  </AuthGuard>
                </AuthProvider>
              }
            >
              <Route index element={<WelcomePage />} />
              <Route path="users" element={<UserPage />} />
              <Route path="profiles" element={<ProfilePage />} />
              <Route path="companies" element={<CompanyPage />} />
              <Route path="employees" element={<EmployeePage />} />
              <Route path="documents" element={<DocumentPage />} />
              <Route path="farms" element={<FarmPage />} />
              <Route path="type-employees" element={<TypeOfEmployeePage />} />
              <Route path="employments" element={<EmploymentPage />} />
              <Route path="area" element={<AreaPage />} />
              <Route path="add-information" element={<AddInformationPage/>} />
              <Route path="activity" element={<ActivityPage/>} />
              <Route path="advance-unit" element={<AdvanceUnitPage/>} />
              <Route path="budget" element={<AdminBudgetPage/>} />
            </Route>
            <Route exact path="/notauthorized" element={<NotAuthorizedPage/>}/>
            <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
