import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";
import About from "./pages/about";
import Work from "./pages/work";
import Project from "./pages/project";
import Chatbot from "./components/chatbot";
import Contact from "./pages/contact";
import CursorGlow from "./components/cursorGlow";

/* SCROLL HANDLER */
function ScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#skills") {
      setTimeout(() => {
        document
          .getElementById("skills")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [location]);

  return null;
}

/* ROUTES WITH ANIMATION */
function AnimatedRoutes({ setShowNavbar, isFirstLoad }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <Home
              setShowNavbar={setShowNavbar}
              isFirstLoad={isFirstLoad}
            />
          }
        />
        <Route path="/about" element={<About setShowNavbar={setShowNavbar} />} />
        <Route path="/work" element={<Work setShowNavbar={setShowNavbar} />} />
        <Route path="/projects/:id" element={<Project />} />
      </Routes>
    </AnimatePresence>
  );
}

/* MAIN  */ 
function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showContact, setShowContact] = useState(false);

  /* THIS is the key fix */
  const hasLoadedOnce = useRef(false);

  return (
    <BrowserRouter>
      <ScrollHandler />

      <CursorGlow />

      {showNavbar && <Navbar setShowContact={setShowContact} />}

      <AnimatedRoutes
        setShowNavbar={setShowNavbar}
        isFirstLoad={!hasLoadedOnce.current}
      />

      {/* Mark as loaded AFTER first render */}
      <FirstLoadSetter hasLoadedOnce={hasLoadedOnce} />

      <Footer />
      <Chatbot setShowContact={setShowContact} />

      {showContact && (
        <Contact onClose={() => setShowContact(false)} />
      )}
    </BrowserRouter>
  );
}

/*  Separate component to safely update ref after mount */
function FirstLoadSetter({ hasLoadedOnce }) {
  useEffect(() => {
    hasLoadedOnce.current = true;
  }, []);

  return null;
}

export default App;