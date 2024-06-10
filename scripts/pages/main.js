import { recipes } from '../../data/recipes.js';
import { templateRecipe } from '../templates/recipeCard.js';

document.addEventListener('DOMContentLoaded', init);

async function init() {
    const recipesContainer = document.getElementById('recipes-container');

    const recipesData = recipes;

    displayRecipes(recipesData, recipesContainer);
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
