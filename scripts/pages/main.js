import { recipes } from '../../data/recipes.js';
import { templateRecipe } from '../templates/recipeCard.js';
import { searchRecipes } from '../utils/searchBar.js';
import { generateDropdown } from '../utils/tags.js';

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

    document.getElementById('search').addEventListener('input', (event) => searchInput(event, recipesData, recipesContainer));

    dropdowns(recipesData);
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
function updateTotalRecipes(total) {
    const totalRecipesElement = document.getElementById('totalRecipes');
    totalRecipesElement.textContent = `${total} recettes`;
}

/**
 * Function to handle the search input event, filter recipes, and display results.
 *
 * @param {Event} event - The input event triggered by the search field.
 * @param {Array} recipesData - The array of recipe objects to search within.
 * @param {HTMLElement} container - The HTML element where the search results will be displayed.
 */
function searchInput(event, recipesData, container) {
    const searchTerm = event.target.value;

    if (searchTerm.length < 3) {
        displayRecipes(recipesData, container);
        return;
    }

    const results = searchRecipes(searchTerm, recipesData);

    if (results.length === 0) {
        noResultsMessage(container, searchTerm);
    } else {
        displayRecipes(results, container);
    }
}

/**
 * Function to display a message when no search results are found.
 *
 * @param {HTMLElement} container - The HTML element where the message will be displayed.
 * @param {string} searchTerm - The search term entered by the user.
 */
function noResultsMessage(container, searchTerm) {
    container.innerHTML = '';
    const message = document.createElement('p');
    message.textContent = `Aucune recette ne contient '${searchTerm}', vous pouvez chercher 'tarte aux pommes', 'poisson', etc.`;
    container.appendChild(message);
}

/**
 * Function to set up dropdown event listeners for the specified types.
 *
 * @param {Array} recipesData - The array of recipe objects.
 */
function dropdowns(recipesData) {
    const dropdownToggles = [
        { toggleId: 'ingredientDropdownToggle', dropdownId: 'ingredientsDropdown', type: 'ingredients' },
        { toggleId: 'applianceDropdownToggle', dropdownId: 'appliancesDropdown', type: 'appliances' },
        { toggleId: 'ustensilDropdownToggle', dropdownId: 'ustensilsDropdown', type: 'ustensils' }
    ];

    dropdownToggles.forEach(({ toggleId, dropdownId, type }) => {
        const toggle = document.getElementById(toggleId);
        const dropdown = document.getElementById(dropdownId);
        let isOpen = false;

        toggle.addEventListener('click', () => {
            dropdownToggles.forEach(({ dropdownId: otherDropdownId }) => {
                if (dropdownId !== otherDropdownId) {
                    const otherDropdown = document.getElementById(otherDropdownId);
                    otherDropdown.classList.remove('show');
                    otherDropdown.dataset.initialized = false;
                }
            });

            const chevronIcon = toggle.querySelector('i');
            if (isOpen) {
                dropdown.classList.remove('show');
                chevronIcon.classList.remove('rotate');
            } else {
                dropdown.classList.add('show');
                chevronIcon.classList.add('rotate');
                if (!dropdown.dataset.initialized) {
                    generateDropdown(recipesData, type);
                    dropdown.dataset.initialized = true;
                }
            }
            isOpen = !isOpen;
        });
    });
}

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
    });
}
