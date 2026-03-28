import { Navigate, Route, Routes } from "react-router-dom";
import { StudentPage } from "./pages/StudentPage";
import { ClubAdminPage } from "./pages/ClubAdminPage";
import { AdminPage } from "./pages/AdminPage";
import { PlanPage } from "./pages/PlanPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PlanPage />} />
      <Route path="/student" element={<StudentPage />} />
      <Route path="/club" element={<ClubAdminPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/plan" element={<Navigate to="/" replace />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
