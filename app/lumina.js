import { useRef, useState, useEffect, createContext } from "react";

import { spawnNode } from "lumina-node";

export const LuminaContext = createContext(null);

export function LuminaContextProvider({ children }) {
  const [lumina, setLumina] = useState(null);
  const initialized = useRef(false);

  useEffect(() => {
    const init = async () => {
      const node = await spawnNode();
      setLumina(node);
    };
    if (!initialized.current) {
      initialized.current = true;
      init();
    }
  }, []);

  return (
    <LuminaContext.Provider value={lumina}>{children}</LuminaContext.Provider>
  );
}
