/*
# Beerdle Frontend Tests

This project uses ** Vitest ** for unit and integration testing.

## Running Tests

To run the tests, use the following commands:

- `npm test`: Runs the tests in watch mode.
- `npm run test -- --run`: Runs the tests once(CI mode).
- `npm run test -- --ui`: Runs the Vitest UI for a better visual experience(if `@vitest/ui` is installed).

## Project Structure for Tests

    - `*.test.ts` or`*.test.tsx`: Test files located next to their source files or in a`tests` directory.
- `src/tests/setup.ts`: Global test setup(e.g., configuring`jest-dom`).
- `vite.config.ts`: Vitest configuration is integrated into the Vite config.

## Current Examples

1. ** Unit Test **: `src/utils/beerUtils.test.ts` - Tests pure logic(extracted from hooks).
2. ** Component Test **: `src/components/siteHeader/index.test.tsx` - Tests React components using React Testing Library. */
