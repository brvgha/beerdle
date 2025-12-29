import truncate from "lodash/truncate";

export const excerpt = (string: string) => {
    return truncate(string, {
        length: 400, // maximum 400 characters
        separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
    });
}

export const checkSessionStorage = (loggedin: string | null) => {
    if (loggedin === 'true') {
        return true;
    } else {
        return false;
    }
}

export const toProperCase = (word: string) => {
    const firstLetter = word[0].toUpperCase();
    return firstLetter.concat(word.substring(1, word.length))
}

export const forWikiSearch = (word: string) => {
    return word.replace(" ", "_");
}

export const delay = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
/* found a better way to make youtube video
export const createYoutubeVideoLink = (id: string) => {
    return `https://www.youtube.com/watch?v=${id}`
}
*/

export const capitalizeFirstLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const checkSameType = (actual: string, guessed: string) => {
    return actual === guessed;
}

export const checkSameOrigin = (actual: string, guessed: string) => {
    return actual === guessed;
}

export const checkSameAlcoholContent = (actual: string, guessed: string) => {
    const actualNum = parseFloat(actual.slice(0, actual.length - 2));
    const guessedNum = parseFloat(guessed.slice(0, guessed.length - 2));
    if (actualNum === guessedNum) {
        return true;
    } else if (Math.abs(actualNum - guessedNum) < 1) {
        return "close";
    } else {
        return false;
    }
}

export const checkSameName = (actual: string, guessed: string) => {
    return actual === guessed;
}
