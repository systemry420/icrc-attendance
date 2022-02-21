const strings = {
  EN: {
    download: "تنزيل",
    save: 'حفظ',
  },
  AR: {
    download: "Download",
    save: 'Save'
  },
};

export const languageState = {
  strings,
  current: "EN",
  direction: "ltr",
};

export const LanguageReducer = (state, action) => {
    switch (action.type) {
    case "SWITCH_LANGUAGE":
        if (state.current === 'AR') {
            return { strings: strings['EN'], current: 'EN', direction: 'ltr' }
        } 
        else if (state.current === 'EN') {
          return { strings: strings['AR'], current: 'AR', direction: 'rtl' }
        }
        break;
    default:
      return state;
  }
};
