import { useContext } from 'react';
import { BeerdleContext } from '../context/beerdleContext';

export const useBeerdle = () => {
    const context = useContext(BeerdleContext);
    if (!context) {
        throw new Error("useBeerdle must be used within a BeerdleContextProvider");
    }
    return context;
};
