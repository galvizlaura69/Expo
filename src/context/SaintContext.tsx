import { createContext, ReactNode, useContext, useState } from "react";

type SaintData = {
  id:string;
  name: string;           
  constellation: string;  
  armorType: string;      
  powerLevel: number;     
  guardianGod: string;
  imageUrl:string    
};

type SaintContextType = {
  saint: SaintData | null;
  setSaint: (saint: SaintData) => void;
  reset: () => void;
};

const SaintContext = createContext<SaintContextType | undefined>(undefined);

export function SaintProvider({ children }: { children: ReactNode }) {
  const [saint, setSaintState] = useState<SaintData | null>(null);

  const setSaint = (saintData: SaintData) => {
    setSaintState(saintData);
  };

  const reset = () => {
    setSaintState(null);
  };

  return (
    <SaintContext.Provider value={{ saint, setSaint, reset }}>
      {children}
    </SaintContext.Provider>
  );
}
export function useSaintContext() {
  const context = useContext(SaintContext);
  if (!context) {
    throw new Error("useSaintContext debe usarse dentro de un SaintProvider");
  }
  return context;
}
