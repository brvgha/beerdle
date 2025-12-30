import React, { useEffect, useState } from "react";
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

    const checkSessionStorage = () => {
        if (sessionStorage.getItem("guesses")) {
            setGuesses(parseInt(sessionStorage.getItem("guesses") || "1"));
        } else {
            setGuesses(1);
        }
        if (sessionStorage.getItem("guessedBeers")) {
            try {
                const parsed = JSON.parse(sessionStorage.getItem("guessedBeers") || "[]");
                if (Array.isArray(parsed)) {
                    setGuessedBeers(new Map(parsed));
                } else {
                    setGuessedBeers(new Map());
                }
            } catch (e) {
                console.error("Error parsing guessedBeers from sessionStorage", e);
                setGuessedBeers(new Map());
            }
        } else {
            setGuessedBeers(new Map<string, BeerdleProps[]>());
        }
        if (sessionStorage.getItem("options")) {
            setOptions(JSON.parse(sessionStorage.getItem("options") || "[]"));
        } else {
            setOptions(data.beers);
        }
    };

    const incrementGuesses = (guess: number) => {
        setGuesses(guess + 1);
        sessionStorage.setItem("guesses", (guess + 1).toString());
    };

    const addToGuessedBeers = (beer: BeerdleProps) => {
        const key = "guess".concat(guesses.toString());
        const newGuessedBeers = new Map(guessedBeers);
        const currentGuessesForKey = newGuessedBeers.get(key) || [];
        newGuessedBeers.set(key, [...currentGuessesForKey, beer]);

        setGuessedBeers(newGuessedBeers);
        console.log("Guessed beers array for storage:", Array.from(newGuessedBeers.entries()));
        sessionStorage.setItem("guessedBeers", JSON.stringify(Array.from(newGuessedBeers.entries())));
        updateOptions();
    };

    const updateOptions = () => {
        console.log("Updating selectable options...")
        const allGuessed = Array.from(guessedBeers.values()).flat().map(b => b.name);
        setOptions(options.filter(b => !allGuessed.includes(b.name)));
        // sessionStorage.setItem("options", JSON.stringify(options));
    }

    const getRegions = () => {
        return Array.from(new Set(options.map(b => b.region)));
    }

    useEffect(() => {
        checkSessionStorage();
    }, []);

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