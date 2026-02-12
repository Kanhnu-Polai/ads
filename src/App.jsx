import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
  const [ads, setAds] = useState([]);
  const [useGoogleAds, setUseGoogleAds] = useState(false);

  const addAd = (newAd) => {
    setAds((prevAds) => [...prevAds, newAd]);
  };

  return (
    <>
      <Navbar />
      <Routes>
        {/* Changed path to "/" to match standard home behavior */}
        <Route
          path="/"
          element={<Home ads={ads} useGoogleAds={useGoogleAds} />}
        />
        <Route
          path="/admin"
          element={
            <Admin
              addAd={addAd}
              useGoogleAds={useGoogleAds}
              setUseGoogleAds={setUseGoogleAds}
            />
          }
        />
      </Routes>
    </>
  );
}
export default App;
