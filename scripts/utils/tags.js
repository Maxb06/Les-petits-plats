import { displayDropdown } from '../templates/dropdownTemplate.js';
import { displayRecipes } from '../pages/main.js';

/**
 * Function to get unique items from the recipes based on the type.
 *
 * @param {Array} recipes - The array of recipe objects.
 * @param {string} type - The type of the items (ingredients, appliances, ustensils).
 * @returns {Array} The array of unique items.
 */
function getItems(recipes, type) {
    let items = [];

    if (type === 'ingredients') {
        items = recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient));
    } else if (type === 'appliances') {
        items = recipes.map(recipe => recipe.appliance);
    } else if (type === 'ustensils') {
        items = recipes.flatMap(recipe => recipe.ustensils);
    }

    // Filtre les doublons
    return [...new Set(items)];
}

/**
 * Function to generate a dropdown menu for the specified type.
 *
 * @param {Array} recipes - The array of recipe objects.
 * @param {string} type - The type of the dropdown (ingredients, appliances, ustensils).
 */
export function generateDropdown(recipes, type) {
    const items = getItems(recipes, type);
    displayDropdown(type, items);
}

/**
 * Function to select a tag from the dropdown.
 *
 * @param {Event} event - The click event triggered by selecting a tag.
 * @param {Array} recipesData - The array of recipe objects.
 * @param {HTMLElement} container - The HTML element where the filtered recipes will be displayed.
 */
export function selectTag(event, recipesData, container) {
    const tag = event.target.dataset.tag;
    const type = event.target.dataset.type;
    const results = filterByTag(recipesData, type, tag);

    displayRecipes(results, container);
}

/**
 * Function to filter recipes by a specific tag and type.
 *
 * @param {Array} recipes - The array of recipe objects.
 * @param {string} type - The type of the tag (ingredients, appliances, ustensils).
 * @param {string} tag - The tag to filter by.
 * @returns {Array} The array of filtered recipe objects.
 */
export function filterByTag(recipes, type, tag) {
    tag = tag.toLowerCase();
    
    return recipes.filter(recipe => {
        if (type === 'ingredients') {
            return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(tag));
        } else if (type === 'appliances') {
            return recipe.appliance.toLowerCase().includes(tag);
        } else if (type === 'ustensils') {
            return recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(tag));
        }
        return false;
    });
}
