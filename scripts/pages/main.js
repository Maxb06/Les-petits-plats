import { recipes } from '../../data/recipes.js';
import { templateRecipe } from '../templates/recipeCard.js';
import { combinedSearch } from '../utils/filter.js';
import { generateDropdown, updateDropdowns } from '../utils/tags.js';

document.addEventListener('DOMContentLoaded', init);

/**
 * Initial function to set up event listeners and display recipes on page load.
 */
async function init() {
    const recipesContainer = document.getElementById('recipes-container');
    const recipesData = recipes;

    window.recipes = recipesData;
    window.selectedTags = { ingredients: [], appliances: [], ustensils: [] };

    searchClear();
    displayRecipes(recipesData, recipesContainer);

    document.getElementById('search').addEventListener('input', (event) => combinedSearch(event, recipesData, recipesContainer));

    setupDropdowns(recipesData);
}

/**
 * Display the list of recipes in the specified container.
 *
 * @param {Array} recipes - The array of recipe objects to display.
 * @param {HTMLElement} container - The container element where the recipes will be displayed.
 */
export function displayRecipes(recipes, container) {
    container.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = templateRecipe(recipe);
        container.appendChild(recipeCard);
    });

    updateTotalRecipes(recipes.length);
}

/**
 * Function to update the total number of recipes displayed.
 *
 * @param {number} total - The total number of recipes.
 */
export function updateTotalRecipes(total) {
    const totalRecipesElement = document.getElementById('totalRecipes');
    totalRecipesElement.textContent = `${total} recettes`;
}

/**
 * Function to display a message when no search results are found.
 *
 * @param {HTMLElement} container - The HTML element where the message will be displayed.
 * @param {string} searchTerm - The search term entered by the user.
 */
export function noResultsMessage(container, searchTerm) {
    container.innerHTML = '';
    const message = document.createElement('p');
    message.textContent = `Aucune recette ne contient '${searchTerm}', vous pouvez chercher 'tarte aux pommes', 'poisson', etc.`;
    container.appendChild(message);
}

/**
 * Function to handle dropdown toggle click.
 *
 * @param {HTMLElement} toggle - The dropdown toggle element.
 * @param {HTMLElement} dropdown - The dropdown element.
 * @param {Array} dropdownToggles - Array of all dropdown toggle information.
 */
function dropdownToggleClick(toggle, dropdown, dropdownToggles) {
    dropdownToggles.forEach(({ dropdownId: otherDropdownId }) => {
        if (dropdown.id !== otherDropdownId) {
            const otherDropdown = document.getElementById(otherDropdownId);
            const otherChevronIcon = document.querySelector(`#${otherDropdownId}Toggle i`);
            otherDropdown.classList.remove('show');
            if (otherChevronIcon) {
                otherChevronIcon.classList.remove('rotate-180');
            }
        }
    });

    dropdown.classList.toggle('show');
    const chevronIcon = toggle.querySelector('i');
    chevronIcon.classList.toggle('rotate-180');
}

/**
 * Function to set up dropdown event listeners for the specified types.
 *
 * @param {Array} recipesData - The array of recipe objects.
 */
function setupDropdowns(recipesData) {
    const dropdownToggles = [
        { toggleId: 'ingredientDropdownToggle', dropdownId: 'ingredientsDropdown', type: 'ingredients' },
        { toggleId: 'applianceDropdownToggle', dropdownId: 'appliancesDropdown', type: 'appliances' },
        { toggleId: 'ustensilDropdownToggle', dropdownId: 'ustensilsDropdown', type: 'ustensils' }
    ];

    dropdownToggles.forEach(({ toggleId, dropdownId, type }) => {
        const toggle = document.getElementById(toggleId);
        const dropdown = document.getElementById(dropdownId);

        if (!dropdown.dataset.initialized) {
            generateDropdown(recipesData, type);
            dropdown.dataset.initialized = true;
        }

        toggle.addEventListener('click', () => dropdownToggleClick(toggle, dropdown, dropdownToggles));
    });
  
    document.addEventListener('click', (event) => closeDropdowns(event, dropdownToggles));
}

/**
 * Function to set up the clear button for the main search input.
 * The clear button appears when there is text in the search input, and clicking it clears the input,
 * resets the displayed recipes, and updates the dropdowns.
 */
function searchClear() {
    const searchInput = document.getElementById('search');
    const searchClear = document.getElementById('search-clear');

    searchInput.addEventListener('input', () => {
        searchClear.style.display = searchInput.value ? 'inline' : 'none';
    });

    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchClear.style.display = 'none';
        displayRecipes(recipes, document.getElementById('recipes-container'));
        updateDropdowns(recipes);
    });
}

/**
 * Function to close all dropdowns when clicking outside.
 *
 * @param {Event} event - The click event.
 * @param {Array} dropdownToggles - Array of all dropdown toggle information.
 */
function closeDropdowns(event, dropdownToggles) {
    dropdownToggles.forEach(({ toggleId, dropdownId }) => {
        const toggle = document.getElementById(toggleId);
        const dropdown = document.getElementById(dropdownId);

        if (!dropdown.contains(event.target) && !toggle.contains(event.target)) {
            dropdown.classList.remove('show');
            const chevronIcon = toggle.querySelector('i');
            if (chevronIcon) {
                chevronIcon.classList.remove('rotate-180');
            }
        }
    });
}

/**
 * Function to handle the search input event, filter recipes, and display results.
 *
 * @param {Event} event - The input event triggered by the search field.
 * @param {Array} recipesData - The array of recipe objects to search within.
 * @param {HTMLElement} container - The HTML element where the search results will be displayed.
 *//*
function searchInput(event, recipesData, container) {
    const searchTerm = event.target.value;

    if (searchTerm.length < 3) {
        displayRecipes(recipesData, container);
        updateDropdowns(recipesData);
        updateTotalRecipes(recipesData.length);
        return;
    }

    const results = searchRecipes(searchTerm, recipesData);

    if (results.length === 0) {
        noResultsMessage(container, searchTerm);
        updateDropdowns([]);
        updateTotalRecipes(0);
        
    } else {
        displayRecipes(results, container);
        updateDropdowns(results);
        updateTotalRecipes(results.length);
    }
}*/
