import React, { useState, useCallback } from "react";
import type { BeerdleProps } from "../types/interfaces";
// import { BaseMovieProps, Review } from "../types/interfaces";

interface BeerdleContextInterface {
    // favourites: number[];
    // mustwatch: number[];
    guesses: number;
    guessedBeers?: Map<string, BeerdleProps[]>;
    incrementGuesses: (guess: number) => void;
    addToGuessedBeers?: (beer: BeerdleProps) => void;
}
const initialContextState: BeerdleContextInterface = {
    // favourites: [],
    // mustwatch: [],
    guesses: 0,
    guessedBeers: new Map<string, BeerdleProps[]>(),
    incrementGuesses: (guess: number) => { guess },
    addToGuessedBeers: (beer: BeerdleProps) => { return beer; },
};

export const BeerdleContext = React.createContext<BeerdleContextInterface>(initialContextState);

const BeerdleContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [guesses, setGuesses] = useState<number>(1);
    const [guessedBeers, setGuessedBeers] = useState<Map<string, BeerdleProps[]>>(new Map<string, BeerdleProps[]>());

    /*const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });
    }, []);

    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
    }, []);

    const addReview = (movie: BaseMovieProps, review: Review) => {
        setMyReviews({ ...myReviews, [movie.id]: review })
    };*/

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

    return (
        <BeerdleContext.Provider
            value={{
                guesses,
                guessedBeers,
                incrementGuesses,
                addToGuessedBeers,
            }}
        >
            {children}
        </BeerdleContext.Provider>
    );
};

export default BeerdleContextProvider;