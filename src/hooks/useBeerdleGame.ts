import { useState, useEffect, useCallback } from "react";
import type { BeerdleProps } from "../types/interfaces";
import data from "../../data/beers.json";
import { getBeerdle } from "../api/beerdle-api";

export const useBeerdleGame = () => {
    const sortBeers = (beers: BeerdleProps[]) => {
        return [...beers].sort((a, b) => {
            const regionCompare = a.region.localeCompare(b.region);
            if (regionCompare !== 0) return regionCompare;
            return a.name.localeCompare(b.name);
        });
    };

    const orderedData = sortBeers(data.beers);
    const [guesses, setGuesses] = useState<number>(1);
    const [guessedBeers, setGuessedBeers] = useState<Map<string, BeerdleProps[]>>(new Map<string, BeerdleProps[]>());
    const [options, setOptions] = useState<BeerdleProps[]>(orderedData);
    const [beerdle, setBeerdle] = useState<BeerdleProps | null>(null);

    const checkSessionStorage = useCallback(() => {
        const storedGuesses = sessionStorage.getItem("guesses");
        if (storedGuesses) {
            setGuesses(parseInt(storedGuesses));
        }

        const storedGuessedBeers = sessionStorage.getItem("guessedBeers");
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
        const filteredOptions = orderedData.filter(b => !allGuessed.includes(b.name));
        setOptions(filteredOptions);
        // sessionStorage.setItem("options", JSON.stringify(filteredOptions));
    }, [orderedData, guessedBeers]);

    const getRegions = useCallback(() => {
        return Array.from(new Set(options.map(b => b.region)));
    }, [options]);

    const incrementGuesses = (guess: number) => {
        const nextGuess = guess + 1;
        setGuesses(nextGuess);
        sessionStorage.setItem("guesses", nextGuess.toString());
    };

    const addToGuessedBeers = (beer: BeerdleProps) => {
        const key = "guess".concat(guesses.toString());
        const newGuessedBeers = new Map(guessedBeers);
        const currentGuessesForKey = newGuessedBeers.get(key) || [];
        newGuessedBeers.set(key, [...currentGuessesForKey, beer]);

        setGuessedBeers(newGuessedBeers);
        sessionStorage.setItem("guessedBeers", JSON.stringify(Array.from(newGuessedBeers.entries())));
        updateOptions(newGuessedBeers);
    };

    const getBeerdleOfTheDay = useCallback(async () => {
        const beer = await getBeerdle();
        if (beer.statusCode != 200) {
            console.error("Error fetching beerdle");
            setBeerdle(null);
            return;
        }
        console.log(beer.body);
        setBeerdle(beer.body);
    }, []);

    useEffect(() => {
        checkSessionStorage();
        getBeerdleOfTheDay();
    }, [checkSessionStorage, getBeerdleOfTheDay]);

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
