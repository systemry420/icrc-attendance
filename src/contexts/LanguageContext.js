import React, { useState } from "react";
import App from "../App";

export const LanguageContext = React.createContext({
  strings: {},
  switch: () => {}
});

const LanguageProvider = (props) => {


  const switchLanguage = () => {
    
  }

  const languageContext = {
    strings: {
      EN: {
        download: "تنزيل",
        save: 'حفظ',
      },
      AR: {
        download: "Download",
        save: 'Save'
      }
    },
    switch: switchLanguage
  }

  return (
    <LanguageContext.Provider value={{ languageContext }}>
      {/* <App /> */}
      {props.children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
