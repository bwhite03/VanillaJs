import avion from 'avion';
import { state } from './index';

async function getData() {
  let json = await avion({
    method: 'GET',
    cors: true,
    headers: {
      'Content-Type': 'application/json',
    },
    url: 'http://localhost:3000/products',
  });
  return json;
}

async function getCategories() {
  let json = await avion({
    method: 'GET',
    cors: true,
    headers: {
      'Content-Type': 'application/json',
    },
    url: 'http://localhost:3000/categories',
  });
  return json;
}

async function updateData() {
  let json = await avion({
    method: 'POST',
    cors: true,
    headers: {
      'Content-Type': 'application/json',
    },
    url: 'http://localhost:3000/products',
    data: {
      name: state.currentItem.name,
      size: state.currentItem.size,
      price: state.currentItem.price,
      category: state.currentItem.category,
    },
  });
  return json;
}

async function delItem(id) {
  let json = await avion({
    method: 'DELETE',
    cors: true,
    headers: {
      'Content-Type': 'application/json',
    },
    url: 'http://localhost:3000/products',
    data: {
      id,
    },
  });
  return json;
}

export { getData, getCategories, updateData, delItem };
