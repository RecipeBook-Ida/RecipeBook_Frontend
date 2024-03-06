import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserProfile from "./pages/user/UserProfile";
import Navbar from "./components/common/Navbar";
import IngredientsPage from "./pages/IngredientsPage";
import RecipeListPage from "./pages/RecipeListPage";
import RecipePage from "./pages/RecipePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <div className=" px-6 flex flex-col h-screen w-full bg-green-400">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/profil" element={<UserProfile />} />
          <Route path="/ingredient" element={<IngredientsPage />} />
          <Route path="/oppskrifter" element={<RecipeListPage />} />
          <Route path="/oppskrifter/:id" element={<RecipePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
