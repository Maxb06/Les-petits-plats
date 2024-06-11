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
    let results;

    if (searchTerm.length >= 3) {
        results = searchRecipes(searchTerm, recipesData);
    } else {
        results = [];
    }

    displayRecipes(results, container);
}
