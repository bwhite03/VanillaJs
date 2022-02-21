console.log('code is up and running');
import { isValid } from './utils';
import { data } from './data';
import './styles.css';

let filteredData = data;

const state = {
  items: data,
  currentItem: {
    name: '',
    size: '',
    price: 0,
    category: '',
  },
};

const changeState = (element) => {
  const { id, value } = element.target;
  if (!isValid(value) || !isValid(id)) return;

  setValue(id, value);

  const result = {
    ...state,
    currentItem: {
      ...(state.currentItem[id] = value),
    },
  };
  console.log(result);
  return result;
};

const setValue = (id, value) => {
  if (isValid(value)) {
    document.getElementById(id).value = value;
  }
};

const inputs = document.getElementsByTagName('input');
for (let input of inputs) {
  input.addEventListener('change', changeState);
}

const buildTable = () => {
  let html = `<table style="width: 90%; margin: 20px auto; color: #000">`;
  html += `<tr><th>Product</th><th>Size</th><th>Price</th><th>Category</th><th>Delete</th></tr>`;
  filteredData.map((item) => {
    const { name, id, price, size, category } = item;
    html += `<tr><td>${name}</td><td>${size}</td><td>${price}</td><td>${category}</td><td style="cursor: pointer;" onClick="deleteItem(${id})">Delete</td></tr>`;
  });
  html += '</table>';
  document.getElementById('items').innerHTML = html;
};

buildTable();

Array.prototype.unique = function (field) {
  const newArray = [];
  this.forEach((record) => {
    const { [field]: targetField } = record;
    if (!newArray.includes(targetField)) {
      newArray.push(targetField);
    }
  });
  return newArray;
};

const handleFilterChange = (e) => {
  if (e.target.value === '0') {
    filteredData = state.items;
  } else {
    filteredData = state.items.filter((d) => d.category === e.target.value);
  }
  buildTable();
};

const buildFilterBox = () => {
  const categories = data.unique('category');
  let html = `<select id="category-filter"><option value="0">Select a category to filter by</option>`;
  categories.map((c) => {
    html += `<option value="${c}">${c}</option>`;
  });
  html += `</select>`;
  document.getElementById('filter').innerHTML = html;
  const newSelect = document.getElementById('category-filter');
  newSelect.addEventListener('change', handleFilterChange);
};

buildFilterBox();
