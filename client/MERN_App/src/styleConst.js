const deepFreeze = (object) => {
    Object.freeze(object);
  
    Object.getOwnPropertyNames(object).forEach((prop) => {
      const value = object[prop];
  
      if (
        value !== null &&
        (typeof value === "object" || typeof value === "function") &&
        !Object.isFrozen(value)
      ) {
        deepFreeze(value);
      }
    });
  
    return object;
  };
  
  export const inputStyle = deepFreeze({
    InputLabelProps: {
      style: {
        color: "#3DE", // Label color
      },
    },
    InputProps: {
      style: {
        color: "white", // Placeholder color
        fontSize: "14px",
      },
      classes: {
        underline: "MuiInput-underline",
        root: "MuiInputBase-root",
        focused: "Mui-focused",
      },
    },
    sx: {
      "& .MuiInput-underline": {
        "&:before": {
          borderBottomColor: "lightgray", // Default border color
        },
        "&:after": {
          borderBottomColor: "white", // Border color on focus
        },
        "&:hover:before": {
          borderBottomColor: "lightgray", // Border color on hover
        },
      },
      
    },
  });
  