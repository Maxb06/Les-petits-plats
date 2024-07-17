import { filterRecipes } from '../utils/tags.js';
import { displayRecipes, updateTotalRecipes, noResultsMessage } from '../pages/main.js';
import { updateDropdowns } from '../utils/tags.js';
import { searchRecipes } from './searchBar.js';


/**
 * Function combine search and filter by tags.
 *
 * @param {Event} event - The input event triggered by the search field.
 * @param {Array} recipesData - The array of recipe objects to search within.
 * @param {HTMLElement} container - The HTML element where the search results will be displayed.
 */
export function search(event, recipesData, container) {
    const searchTerm = event.target.value.toLowerCase();
    let filteredRecipes = searchTerm.length >= 3 ? searchRecipes(searchTerm, recipesData) : recipesData;

    if (Object.values(window.selectedTags).some(tags => tags.length > 0)) {
        filteredRecipes = filterRecipes(filteredRecipes, window.selectedTags);
    }

    if (filteredRecipes.length === 0) {
        noResultsMessage(container, searchTerm);
        updateDropdowns([]);
        updateTotalRecipes(0);
    } else {
        displayRecipes(filteredRecipes, container);
        updateDropdowns(filteredRecipes);
        updateTotalRecipes(filteredRecipes.length);
    }
}

/*
export function search(event, recipesData, selectedTags, container) {
    const searchTerm = event.target.value.toLowerCase();
    const filteredRecipes = searchTerm.length >= 3 ? searchRecipes(searchTerm, recipesData) : recipesData;

    filteredRecipes = filterRecipes(filteredRecipes, selectedTags);

    if (filteredRecipes.length === 0) {
        noResultsMessage(container, searchTerm);
        updateDropdowns([]);
        updateTotalRecipes(0);
    } else {
        displayRecipes(filteredRecipes, container);
        updateDropdowns(filteredRecipes);
        updateTotalRecipes(filteredRecipes.length);
    }
}
    */
