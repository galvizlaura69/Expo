import { createContext, ReactNode, useContext, useState } from "react";

type UserData = {
  name?: string;
  lastname?: string;
  date?: string ;
};

type UserContextType = {
  user: UserData | null;
  setUser: (user: UserData) => void;
  reset: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<UserData | null>(null);

  const setUser = (userData: UserData) => {
    setUserState(userData);
  };

  const reset = () => {
    setUserState(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, reset }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext debe usarse dentro de un UserProvider");
  }
  return context;
}
