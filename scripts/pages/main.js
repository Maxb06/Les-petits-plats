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
function displayRecipes(recipes, container) {
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


function dropdowns(recipesData) {
const ingredientButton = document.getElementById('ingredientButton');
    const applianceButton = document.getElementById('applianceButton');
    const ustensilButton = document.getElementById('ustensilButton');

    ingredientButton.addEventListener('click', () => {
        const dropdown = document.getElementById('ingredientsDropdown');
        dropdown.classList.toggle('show');
        if (dropdown.classList.contains('show')) {
            generateDropdown(recipesData, 'ingredients');
        }
    });

    applianceButton.addEventListener('click', () => {
        const dropdown = document.getElementById('appliancesDropdown');
        dropdown.classList.toggle('show');
        if (dropdown.classList.contains('show')) {
            generateDropdown(recipesData, 'appliances');
        }
    });

    ustensilButton.addEventListener('click', () => {
        const dropdown = document.getElementById('ustensilsDropdown');
        dropdown.classList.toggle('show');
        if (dropdown.classList.contains('show')) {
            generateDropdown(recipesData, 'ustensils');
        }
    })
};



/*
function dropdowns(recipesData) {
    const dropdownButtons = [
        { buttonId: 'ingredientButton', dropdownId: 'ingredientsDropdown', type: 'ingredients' },
        { buttonId: 'applianceButton', dropdownId: 'appliancesDropdown', type: 'appliances' },
        { buttonId: 'ustensilButton', dropdownId: 'ustensilsDropdown', type: 'ustensils' }
    ];

    dropdownButtons.forEach(({ buttonId, dropdownId, type }) => {
        const button = document.getElementById(buttonId);
        button.addEventListener('click', () => {
            const dropdown = document.getElementById(dropdownId);
            dropdown.classList.toggle('show');
            if (dropdown.classList.contains('show')) {
                generateDropdown(recipesData, type);
            }
        });
    });
}*/