import { recipes } from '../../data/recipes.js';
import { createRecipeCard } from '../templates/recipeCard.js';


function displayRecipes(recipes, container) {
    container.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = createRecipeCard(recipe);
        container.appendChild(recipeCard);
    });
}

async function init() {
    const recipesContainer = document.getElementById('recipes-container');

    const recipesData = recipes;

    displayRecipes(recipesData, recipesContainer);
}

document.addEventListener('DOMContentLoaded', init);
