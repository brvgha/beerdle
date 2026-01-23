import type { BeerdleProps } from "../types/interfaces";

export const sortBeers = (beers: BeerdleProps[]) => {
    return [...beers].sort((a, b) => {
        const regionCompare = a.region.localeCompare(b.region);
        if (regionCompare !== 0) return regionCompare;
        return a.name.localeCompare(b.name);
    });
};

export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const toProperCase = (string: string) => {
    return capitalizeFirstLetter(string);
};

export const shorten = (string: string) => {
    if (string.length > 17) {
        return string.substring(0, 17) + "...";
    }
    return string;
};

export const checkSessionStorage = (loggedin: string | null) => {
    return loggedin === "true";
};

export const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const checkNameCloseness = (expected: string, actual: string) => {
    if (expected === actual) return true;
    if (expected.charAt(0).toLowerCase() === actual.charAt(0).toLowerCase()) return "close";
    return false;
};

export const checkSameOrigin = (expected: string, actual: string) => {
    return expected === actual;
};

export const checkSameRegions = (expected: string, actual: string) => {
    if (expected === actual) return true;
    return false;
};

export const checkSameType = (expected: string, actual: string) => {
    const normalizedExpected = expected.toLowerCase().trim();
    const normalizedActual = actual.toLowerCase().trim();

    if (normalizedExpected === normalizedActual) return true;

    const normalizedActualList = normalizedActual.split(" ");
    const normalizedExpectedList = normalizedExpected.split(" ");

    for (let i = 0; i < normalizedActualList.length; i++) {
        if (normalizedExpectedList.includes(normalizedActualList[i])) {
            return "close";
        }
    }
    return false;
};

export const checkSameAlcoholContent = (expected: string, actual: string) => {
    if (expected === actual) return true;
    const expVal = parseFloat(expected.replace("%", ""));
    const actVal = parseFloat(actual.replace("%", ""));
    if (!isNaN(expVal) && !isNaN(actVal) && Math.abs(expVal - actVal) <= 1) {
        return "close";
    }
    return false;
};

export const checkIsWin = () => {
    console.log('Checking if win');
    try {
        const isWin = localStorage.getItem('isWin')
        console.log(isWin, 'isWin');
        if (isWin == null) {
            console.log('isWin is null');
            localStorage.setItem('isWin', 'false');
            return false;
        }
        return isWin === 'true';
    }
    catch {
        return false;
    }

}
