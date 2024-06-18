import { recipes } from '../../data/recipes.js';
import { templateRecipe } from '../templates/recipeCard.js';
import { searchRecipes } from '../utils/searchBar.js';

document.addEventListener('DOMContentLoaded', init);

async function init() {
    const recipesContainer = document.getElementById('recipes-container');
    const recipesData = recipes;

    displayRecipes(recipesData, recipesContainer);

    document.getElementById('search').addEventListener('input', (event) => searchInput(event, recipesData, recipesContainer));
}

function displayRecipes(recipes, container) {
    container.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = templateRecipe(recipe);
        container.appendChild(recipeCard);
    });

    updateTotalRecipes(recipes.length);
}

function updateTotalRecipes(total) {
    const totalRecipesElement = document.getElementById('totalRecipes');
    totalRecipesElement.textContent = `${total} recettes`;
}

function searchInput(event, recipesData, container) {
    const searchTerm = event.target.value;

    if (searchTerm.length < 3) {
        displayRecipes([], container);
        return;
    }
    
    const results = searchRecipes(searchTerm, recipesData);

    if (results.length === 0) {
        noResultsMessage(container, searchTerm);
    } else {
        displayRecipes(results, container);
    }
}

function noResultsMessage(container, searchTerm) {
    container.innerHTML = '';
    const message = document.createElement('p');
    message.textContent = `Aucune recette ne contient '${searchTerm}', vous pouvez chercher 'tarte aux pommes', 'poisson', etc.`;
    container.appendChild(message);
}
