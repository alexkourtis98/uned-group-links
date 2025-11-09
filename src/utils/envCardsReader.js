/**
 * Environment Cards Reader Utility
 *
 * Reads card data from environment variables (when deployed) or falls back to default categories
 */

import { Categories } from '../assets/categories';

/**
 * Get cards data from environment variable or default categories
 * @returns {Array} Array of card objects
 */
export const getCardsFromEnv = () => {
    try {
        // Try to read from environment variable (set in Vercel)
        const cardsData = process.env.REACT_APP_CARDS_DATA;

        if (cardsData) {
            // Parse the JSON string from environment variable
            const parsedCards = JSON.parse(cardsData);

            if (Array.isArray(parsedCards) && parsedCards.length > 0) {
                return parsedCards;
            }
        }
    } catch (error) {
        console.error('Error parsing cards from environment variable:', error);
    }

    // Fall back to default categories if env variable is not set or invalid
    return Categories;
};

/**
 * Check if cards are loaded from environment variable
 * @returns {boolean} True if cards are from env, false if using defaults
 */
export const isUsingEnvCards = () => {
    try {
        const cardsData = process.env.REACT_APP_CARDS_DATA;
        return !!(cardsData && JSON.parse(cardsData));
    } catch {
        return false;
    }
};

/**
 * Get admin credentials from environment variables or use defaults
 * @returns {Object} Object with email and password
 */
export const getAdminCredentials = () => {
    return {
        email: process.env.REACT_APP_ADMIN_EMAIL || "akourtisdev@gmail.com",
        password: process.env.REACT_APP_ADMIN_PASSWORD || "snickerS11?.?"
    };
};

/**
 * Get admin secret for API authentication
 * @returns {string} Admin secret token
 */
export const getAdminSecret = () => {
    return process.env.REACT_APP_ADMIN_SECRET || "default-secret-change-me";
};
