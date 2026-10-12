import Navbar from "./components/layout/NavBar";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
