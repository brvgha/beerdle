import React from "react";
import { useBeerdleGame } from "../hooks/useBeerdleGame";
import type { UseBeerdleGameReturn } from "../hooks/useBeerdleGame";

export const BeerdleContext = React.createContext<UseBeerdleGameReturn | null>(null);

const BeerdleContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const game = useBeerdleGame();

    return (
        <BeerdleContext.Provider value={game}>
            {children}
        </BeerdleContext.Provider>
    );
};

export default BeerdleContextProvider;