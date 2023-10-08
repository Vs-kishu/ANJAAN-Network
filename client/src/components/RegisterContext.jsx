import { createContext, useContext } from "react";

const registerContext = createContext(false);

export const RegisterProvider = (children) => {
  const isLognin = useContext(registerContext);
  return (
    <>
      <registerContext.Provider value={isLognin}>
        {children}
      </registerContext.Provider>
    </>
  );
};
