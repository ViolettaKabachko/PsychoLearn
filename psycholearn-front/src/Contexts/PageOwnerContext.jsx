import React, { useState } from "react";

export const PageOwnerContext = React.createContext(null);

const PageOwnerProvider = ({ children }) => {
  const [isPageOwner, setIsPageOwner] = useState();

  return (
    <PageOwnerContext.Provider value={{ isPageOwner, setIsPageOwner }}>
      {children}
    </PageOwnerContext.Provider>
  );
};

export default PageOwnerProvider;
