export function createRecipeCard(recipe) {
    const { name, ingredients, description, image, time } = recipe;

    const recipeCard = document.createElement('div');
    recipeCard.className = 'recipe-card col-md-4 mb-4';

    const card = document.createElement('div');
    card.className = 'card';

    const img = document.createElement('img');
    img.src = `assets/recipes/${image}`;
    img.alt = name;
    img.className = 'card-img-top';
    card.appendChild(img);

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardTitle = document.createElement('h2');
    cardTitle.className = 'card-title';
    cardTitle.textContent = name;
    cardBody.appendChild(cardTitle);

    const recipeTitle = document.createElement('p');
    recipeTitle.textContent = 'RECETTE';
    cardBody.appendChild(recipeTitle);

    const cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = description;
    cardBody.appendChild(cardText);

    const ingredientsTitle = document.createElement('p');
    ingredientsTitle.textContent = 'INGRÉDIENTS';
    cardBody.appendChild(ingredientsTitle);

    const ingredientsDiv = document.createElement('div');
    ingredientsDiv.className = 'ingredients';

    ingredients.forEach(ingredient => {
        const ingredientP = document.createElement('p');

        const ingredientStrong = document.createElement('strong');
        ingredientStrong.textContent = ingredient.ingredient;

        ingredientP.appendChild(ingredientStrong);
        ingredientP.append(`: ${ingredient.quantity || ''} ${ingredient.unit || ''}`);

        ingredientsDiv.appendChild(ingredientP);
    });

    cardBody.appendChild(ingredientsDiv);

    const badge = document.createElement('span');
    badge.className = 'badge badge-primary';
    badge.textContent = `${time} min`;
    cardBody.appendChild(badge);

    card.appendChild(cardBody);
    recipeCard.appendChild(card);

    return recipeCard;
}

