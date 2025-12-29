import React, { useState } from "react";
import type { BeerdleProps } from "../types/interfaces";
import data from "../../data/beers.json";

interface BeerdleContextInterface {
    guesses: number;
    guessedBeers?: Map<string, BeerdleProps[]>;
    incrementGuesses: (guess: number) => void;
    addToGuessedBeers?: (beer: BeerdleProps) => void;
    updateOptions: () => void;
    options: BeerdleProps[];
}
const initialContextState: BeerdleContextInterface = {
    guesses: 0,
    guessedBeers: new Map<string, BeerdleProps[]>(),
    incrementGuesses: (guess: number) => { guess },
    addToGuessedBeers: (beer: BeerdleProps) => { return beer; },
    updateOptions: () => { return data.beers },
    options: [],
};

export const BeerdleContext = React.createContext<BeerdleContextInterface>(initialContextState);

const BeerdleContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [guesses, setGuesses] = useState<number>(1);
    const [guessedBeers, setGuessedBeers] = useState<Map<string, BeerdleProps[]>>(new Map<string, BeerdleProps[]>());
    const [options, setOptions] = useState<BeerdleProps[]>(data.beers);

    const incrementGuesses = (guess: number) => {
        setGuesses(guess + 1);
    };

    const addToGuessedBeers = (beer: BeerdleProps) => {
        setGuessedBeers((prevGuessedBeers) => {
            const updatedGuessedBeers = new Map<string, BeerdleProps[]>(prevGuessedBeers);
            updatedGuessedBeers.set("guess".concat(guesses.toString()), [...(updatedGuessedBeers.get("guess".concat(guesses.toString())) || []), beer]);
            return updatedGuessedBeers;
        });
    };

    const updateOptions = () => {
        const allGuessed = Array.from(guessedBeers.values()).flat();
        const guessedNames = new Set(allGuessed.map(b => b.name));
        setOptions(data.beers.filter((option) => !guessedNames.has(option.name)));
    }

    return (
        <BeerdleContext.Provider
            value={{
                guesses,
                guessedBeers,
                incrementGuesses,
                addToGuessedBeers,
                updateOptions,
                options
            }}
        >
            {children}
        </BeerdleContext.Provider>
    );
};

export default BeerdleContextProvider;