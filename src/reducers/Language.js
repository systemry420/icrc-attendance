const strings = {
  EN: {
    download: "تنزيل",
  },
  AR: {
    download: "Download",
  },
};

export const languageState = {
  strings,
  current: "EN",
  direction: "ltr",
};

export const LanguageReducer = (state = { current: "EN" }, action) => {
    switch (action.type) {
    case "SWITCH_LANGUAGE":
        console.log(state, action);
        if (languageState.current === 'AR') {
            return { ...languageState, current: 'EN', direction: 'ltr' }
        } 
        return { ...languageState, current: 'AR', direction: 'rtl' }
    default:
      return state;
  }
};
