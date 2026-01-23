import { useState, useEffect, useCallback } from "react";
import type { BeerdleProps } from "../types/interfaces";
import { getAll, getBeerdle } from "../api/beerdle-api";
import { sortBeers } from "../utils/beerUtils";

export const useBeerdleGame = () => {

    const [guesses, setGuesses] = useState<number>(1);
    const [guessedBeers, setGuessedBeers] = useState<Map<string, BeerdleProps[]>>(new Map<string, BeerdleProps[]>());
    const [options, setOptions] = useState<BeerdleProps[]>([]);
    const [beerdle, setBeerdle] = useState<BeerdleProps | null>(null);

    const checkLocalStorage = useCallback(() => {
        const storedGuesses = localStorage.getItem("guesses");
        if (storedGuesses) {
            setGuesses(parseInt(storedGuesses));
        }

        const storedGuessedBeers = localStorage.getItem("guessedBeers");
        if (storedGuessedBeers) {
            try {
                const parsed = JSON.parse(storedGuessedBeers);
                if (Array.isArray(parsed)) {
                    setGuessedBeers(new Map(parsed));
                }
            } catch (e) {
                console.error("Error parsing guessedBeers", e);
            }
        }
    }, []);

    const updateOptions = useCallback((currentGuessedBeers: Map<string, BeerdleProps[]> = guessedBeers) => {
        const allGuessed = Array.from(currentGuessedBeers.values()).flat().map(b => b.name);
        const filteredOptions = options.filter(b => !allGuessed.includes(b.name));
        setOptions(filteredOptions);
        // sessionStorage.setItem("options", JSON.stringify(filteredOptions));
    }, [options, guessedBeers]);

    const getRegions = useCallback(() => {
        return Array.from(new Set(options.map(b => b.region)));
    }, [options]);

    const incrementGuesses = (guess: number) => {
        const nextGuess = guess + 1;
        setGuesses(nextGuess);
        localStorage.setItem("guesses", nextGuess.toString());
    };

    const addToGuessedBeers = (beer: BeerdleProps) => {
        const key = "guess".concat(guesses.toString());
        const newGuessedBeers = new Map(guessedBeers);
        const currentGuessesForKey = newGuessedBeers.get(key) || [];
        newGuessedBeers.set(key, [...currentGuessesForKey, beer]);

        setGuessedBeers(newGuessedBeers);
        localStorage.setItem("guessedBeers", JSON.stringify(Array.from(newGuessedBeers.entries())));
        updateOptions(newGuessedBeers);
    };

    const getBeerdleOfTheDay = useCallback(async () => {
        const beer = await getBeerdle();
        if (beer.statusCode != 200) {
            console.error("Error fetching beerdle");
            setBeerdle(null);
            return;
        }
        setBeerdle(beer.body);
    }, []);

    const getOptions = useCallback(async () => {
        const beers = await getAll();
        if (beers.statusCode != 200) {
            console.error("Error fetching beers");
            return [];
        }
        setOptions(sortBeers(beers.body))
    }, []);

    useEffect(() => {
        checkLocalStorage();
        getBeerdleOfTheDay();
        getOptions();
    }, [checkLocalStorage, getBeerdleOfTheDay, getOptions]);

    return {
        guesses,
        guessedBeers,
        options,
        incrementGuesses,
        addToGuessedBeers,
        updateOptions,
        getRegions,
        getBeerdleOfTheDay,
        beerdle
    };
};

export type UseBeerdleGameReturn = ReturnType<typeof useBeerdleGame>;
