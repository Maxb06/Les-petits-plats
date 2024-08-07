import { displayDropdown } from '../utils/dropdown.js';
import { combinedSearch, filterRecipes } from '../utils/filter.js';

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

    if (!window.selectedTags[type].includes(tag)) {
        window.selectedTags[type].push(tag);
        addTag(tag, type);
    }

    const dropdownItems = event.target.parentElement.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => item.classList.remove('selected'));
    event.target.classList.add('selected');

    combinedSearch({ target: { value: document.getElementById('search').value } }, recipesData, container);
}

/**
 * Function to add a tag element to the UI.
 *
 * @param {string} tag - The tag to add.
 * @param {string} type - The type of the tag (ingredients, appliances, ustensils).
 */
function addTag(tag, type) {
    const tagContainer = document.getElementById('tags-container');
    const tagElement = document.createElement('div');
    tagElement.classList.add('tag');
    tagElement.textContent = tag;
    tagElement.dataset.tag = tag;
    tagElement.dataset.type = type;

    const removeIcon = document.createElement('i');
    removeIcon.classList.add('fa-solid', 'fa-times');
    removeIcon.addEventListener('click', () => removeTag(tag, type, tagElement));

    tagElement.appendChild(removeIcon);
    tagContainer.appendChild(tagElement);
}

/**
 * Function to remove a tag and update the UI.
 *
 * @param {string} tag - The tag to remove.
 * @param {string} type - The type of the tag (ingredients, appliances, ustensils).
 * @param {HTMLElement} tagElement - The tag element to remove from the DOM.
 */
export function removeTag(tag, type, tagElement) {
    window.selectedTags[type] = window.selectedTags[type].filter(t => t !== tag);
    tagElement.remove();

    const dropdownItem = document.querySelector(`.dropdown-item[data-tag="${tag}"][data-type="${type}"]`);
    if (dropdownItem) {
        dropdownItem.classList.remove('selected');
        const icon = dropdownItem.querySelector('.close-icon');
        if (icon) {
            icon.remove();
        }
    }

    const allRecipes = window.recipes;
    const filteredRecipes = filterRecipes(allRecipes, window.selectedTags);
    updateDropdowns(filteredRecipes);

    combinedSearch({ target: { value: document.getElementById('search').value } }, window.recipes, document.getElementById('recipes-container'));
}

/**
 * Function to update the items displayed in the dropdowns based on the filtered recipes.
 *
 * @param {Array} filteredRecipes - The array of filtered recipe objects to use for updating the dropdowns.
 */
export function updateDropdowns(filteredRecipes) {
    ['ingredients', 'appliances', 'ustensils'].forEach(type => {
        const items = getItems(filteredRecipes, type);
        displayDropdown(type, items);
    });
}
