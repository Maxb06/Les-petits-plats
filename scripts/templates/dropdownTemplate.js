import { selectTag } from '../utils/tags.js';

/**
 * function for displaying dropdown
 *
 * @param {string} type - The type of the dropdown (ingredients, appliances, ustensils).
 * @param {Array} items - The array of items to display in the dropdown.
 */
export function displayDropdown(type, items) {
    const dropdown = document.getElementById(`${type}Dropdown`);
    dropdown.innerHTML = '';

    const searchBarContainer = document.createElement('div');
    searchBarContainer.classList.add('search-text');

    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.id = `${type}Search`;
    searchBar.classList.add('form-control');

    const searchIcon = document.createElement('i');
    searchIcon.classList.add('fa-solid', 'fa-magnifying-glass');

    searchBarContainer.appendChild(searchBar);
    searchBarContainer.appendChild(searchIcon);
    dropdown.appendChild(searchBarContainer);

    const listContainer = document.createElement('div');
    listContainer.classList.add('list-container');
    dropdown.appendChild(listContainer);

    items.forEach(item => {
        const listItem = document.createElement('div');
        listItem.textContent = item;
        listItem.classList.add('dropdown-item');
        listItem.dataset.tag = item.toLowerCase();
        listItem.dataset.type = type;
        listItem.addEventListener('click', (event) => selectTag(event, window.recipes, document.getElementById('recipes-container')));
        listContainer.appendChild(listItem);
    });

    searchBar.addEventListener('input', (event) => filterDropdownItems(event, items, listContainer));
}

/**
 * Function to filter items in the dropdown based on the search input.
 *
 * @param {Event} event - The input event triggered by the search field.
 * @param {Array} items - The array of items to filter.
 * @param {HTMLElement} listContainer - The container element where the filtered items will be displayed.
 */
function filterDropdownItems(event, items, listContainer) {
    const searchTerm = event.target.value.toLowerCase();

    listContainer.innerHTML = '';

    if (searchTerm.length < 3) {
        items.forEach(item => {
            const listItem = document.createElement('div');
            listItem.textContent = item;
            listItem.classList.add('dropdown-item');
            listItem.dataset.tag = item.toLowerCase();
            listItem.dataset.type = event.target.id.replace('Search', '');
            listItem.addEventListener('click', (event) => selectTag(event, window.recipes, document.getElementById('recipes-container')));
            listContainer.appendChild(listItem);
        });
        return;
    }

    const filteredItems = items.filter(item => item.toLowerCase().includes(searchTerm));

    filteredItems.forEach(item => {
        const listItem = document.createElement('div');
        listItem.textContent = item;
        listItem.classList.add('dropdown-item');
        listItem.dataset.tag = item.toLowerCase();
        listItem.dataset.type = event.target.id.replace('Search', '');
        listItem.addEventListener('click', (event) => selectTag(event, window.recipes, document.getElementById('recipes-container')));
        listContainer.appendChild(listItem);
    });
}
