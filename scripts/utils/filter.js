import { displayRecipes, updateTotalRecipes, noResultsMessage } from '../pages/main.js';
import { updateDropdowns } from '../utils/tags.js';
import { searchRecipes } from './searchBar.js';

/**
 * Function to filter recipes based on selected tags.
 *
 * @param {Array} recipes - The array of recipe objects.
 * @param {Object} selectedTags - The selected tags for each type.
 * @returns {Array} The array of filtered recipe objects.
 */
export function filterRecipes(recipes, selectedTags) {
    return recipes.filter(recipe => {
        return selectedTags.ingredients.every(tag => recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag))) &&
            selectedTags.appliances.every(tag => recipe.appliance.toLowerCase().includes(tag)) &&
            selectedTags.ustensils.every(tag => recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag)));
    });
}

/**
 * Function that combines filters search and tags.
 *
 * @param {Event} event - The input event triggered by the search field.
 * @param {Array} recipesData - The array of recipe objects to search within.
 * @param {HTMLElement} container - The HTML element where the search results will be displayed.
 */
export function combinedSearch(event, recipesData, container) {
    const searchTerm = event.target.value.toLowerCase();
    let filteredRecipes = searchTerm.length >= 3 ? searchRecipes(searchTerm, recipesData) : recipesData;

    filteredRecipes = filterRecipes(filteredRecipes, window.selectedTags);

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
    
