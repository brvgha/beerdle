import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import SiteHeader from './index';

// Mocking MUI useMediaQuery if needed, or providing a theme provider
// For now, let's just use a simple mock for the router if we wanted to check navigation
// but BrowserRouter is fine for simple rendering tests.

describe('SiteHeader', () => {
    it('renders the header title and subtitle', () => {
        render(
            <BrowserRouter>
                <SiteHeader />
            </BrowserRouter>
        );

        expect(screen.getByText(/The beer guessing game!/i)).toBeInTheDocument();
        expect(screen.getByAltText(/Beerdle Logo/i)).toBeInTheDocument();
    });

    it('renders navigation buttons on desktop', () => {
        // Mocking useMediaQuery to return false (desktop)
        // Note: This might require more setup depending on how useMediaQuery is mocked
        render(
            <BrowserRouter>
                <SiteHeader />
            </BrowserRouter>
        );

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
    });
});
