import { describe, it, expect } from 'vitest';
import { capitalizeFirstLetter, checkNameCloseness, checkSameAlcoholContent, checkSameOrigin, checkSameRegions, checkSameType, checkSessionStorage, delay, shorten, sortBeers, toProperCase } from './beerUtils.ts';
import type { BeerdleProps } from '../types/interfaces';

describe('sortBeers', () => {
    it('should sort beers by region and then by name', () => {
        const beers: BeerdleProps[] = [
            { name: 'B beer', region: 'Z region', alias: '', type: '', alcohol_content: '', origin: '', description: '' },
            { name: 'A beer', region: 'Z region', alias: '', type: '', alcohol_content: '', origin: '', description: '' },
            { name: 'C beer', region: 'A region', alias: '', type: '', alcohol_content: '', origin: '', description: '' },
        ] as BeerdleProps[];

        const sorted = sortBeers(beers);

        expect(sorted[0].name).toBe('C beer'); // Region A
        expect(sorted[1].name).toBe('A beer'); // Region Z (A before B)
        expect(sorted[2].name).toBe('B beer'); // Region Z
    });

    it('should not mutate the original array', () => {
        const beers: BeerdleProps[] = [
            { name: 'B', region: 'B', alias: '', type: '', alcohol_content: '', origin: '', description: '' },
            { name: 'A', region: 'A', alias: '', type: '', alcohol_content: '', origin: '', description: '' },
        ] as BeerdleProps[];

        const original = [...beers];
        sortBeers(beers);

        expect(beers).toEqual(original);
    });
});

describe('shorten', () => {
    it('should truncate a string to a maximum of 12 characters', () => {
        const longString = 'This is a very long string that needs to be truncated';
        const truncatedString = shorten(longString);
        expect(truncatedString).toBe('This is a very lo...');
    });
});

describe('capitalizeFirstLetter', () => {
    it('should capitalize the first letter of a string', () => {
        const string = 'hello';
        const capitalizedString = capitalizeFirstLetter(string);
        expect(capitalizedString).toBe('Hello');
    });
});

describe('checkSessionStorage', () => {
    it('should return true if the loggedin value is true', () => {
        const loggedin = 'true';
        const result = checkSessionStorage(loggedin);
        expect(result).toBe(true);
    });

    it('should return false if the loggedin value is false', () => {
        const loggedin = 'false';
        const result = checkSessionStorage(loggedin);
        expect(result).toBe(false);
    });
});

describe('toProperCase', () => {
    it('should capitalize the first letter of a string', () => {
        const string = 'hello';
        const capitalizedString = toProperCase(string);
        expect(capitalizedString).toBe('Hello');
    });
});

describe('delay', () => {
    it('should delay for the specified amount of milliseconds', async () => {
        const start = Date.now();
        await delay(100);
        const end = Date.now();
        expect(end - start).toBeGreaterThanOrEqual(100);
    });
});

describe('check exact details', () => {
    it('should return true if exact name match', () => {
        const expectedName = 'Heineken';
        const actualName = 'Heineken';
        const result = checkNameCloseness(expectedName, actualName);
        expect(result).toBe(true);
    });

    it('should return false if name does not match', () => {
        const expectedName = 'Heineken';
        const actualName = 'Amstel';
        const result = checkNameCloseness(expectedName, actualName);
        expect(result).toBe(false);
    });

    it('should return close if name is close', () => {
        const expectedName = 'Heineken';
        const actualName = 'Amstel';
        const result = checkNameCloseness(expectedName, actualName);
        expect(result).toBe(false);
    });

    it('should return close if name is close', () => {
        const expectedName = 'Tyskie';
        const actualName = 'Tuborg';
        const result = checkNameCloseness(expectedName, actualName);
        expect(result).toBe('close');
    });

    it('should return true if exact origin match', () => {
        const expectedOrigin = 'Netherlands';
        const actualOrigin = 'Netherlands';
        const result = checkSameOrigin(expectedOrigin, actualOrigin);
        expect(result).toBe(true);
    });

    it('should return false if origin does not match', () => {
        const expectedOrigin = 'Netherlands';
        const actualOrigin = 'Belgium';
        const result = checkSameOrigin(expectedOrigin, actualOrigin);
        expect(result).toBe(false);
    });

    it('should return true if origin is close (same region)', () => {
        const expectedOrigin = { origin: 'Netherlands', region: 'Europe' };
        const actualOrigin = { origin: 'Belgium', region: 'Europe' };
        const result = checkSameRegions(expectedOrigin.region, actualOrigin.region);
        expect(result).toBe(true);
    });

    it('should return true if exact type match', () => {
        const expectedType = 'Lager';
        const actualType = 'Lager';
        const result = checkSameType(expectedType, actualType);
        expect(result).toBe(true);
    });

    it('should return false if type does not match', () => {
        const expectedType = 'Lager';
        const actualType = 'Ale';
        const result = checkSameType(expectedType, actualType);
        expect(result).toBe(false);
    });

    it('should return close if type is close', () => {
        const expectedType = 'Lager';
        const actualType = 'Light Lager';
        const result = checkSameType(expectedType, actualType);
        expect(result).toBe('close');
    });

    it('should return true if exact alcohol content match', () => {
        const expectedAlcoholContent = '5%';
        const actualAlcoholContent = '5%';
        const result = checkSameAlcoholContent(expectedAlcoholContent, actualAlcoholContent);
        expect(result).toBe(true);
    });

    it('should return false if alcohol content does not match', () => {
        const expectedAlcoholContent = '5%';
        const actualAlcoholContent = '8%';
        const result = checkSameAlcoholContent(expectedAlcoholContent, actualAlcoholContent);
        expect(result).toBe(false);
    });

    it('should return close if alcohol content is close', () => {
        const expectedAlcoholContent = '5%';
        const actualAlcoholContent = '6%';
        const result = checkSameAlcoholContent(expectedAlcoholContent, actualAlcoholContent);
        expect(result).toBe('close');
    });

    it('should return true if exact region match', () => {
        const expectedRegion = 'Europe';
        const actualRegion = 'Europe';
        const result = checkSameRegions(expectedRegion, actualRegion);
        expect(result).toBe(true);
    });

    it('should return false if region does not match', () => {
        const expectedRegion = 'Europe';
        const actualRegion = 'Asia';
        const result = checkSameRegions(expectedRegion, actualRegion);
        expect(result).toBe(false);
    });

});

