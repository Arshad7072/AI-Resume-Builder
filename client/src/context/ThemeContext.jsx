import { useEffect, useState, createContext, useContext } from "react";
import API from "../api/api";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from database
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const { data } = await API.get("/settings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDarkMode(data.settings.darkMode);
      } catch (err) {
        console.log(err);
      }
    };

    loadTheme();
  }, []);

  // Apply theme
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);