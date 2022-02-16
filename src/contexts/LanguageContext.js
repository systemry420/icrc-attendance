import React, { useState } from "react";
import App from "../App";

export const LanguageContext = React.createContext();

const LanguageContextProvider = (props) => {
  const [languageState, setLanguageState] = useState({
    language: "en",
    direction: "ltr",
  });

  const arabicStrings = {
    download: "تنزيل",
  };

  const englishStrings = {
    download: "Download",
  };

  return (
    <LanguageContext.Provider value={{ languageState }}>
      {/* <App /> */}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;
