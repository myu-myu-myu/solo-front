import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
// import * as dotenv from 'dotenv';
// dotenv.config();

console.log('import.meta.env : ', import.meta.env);
// let res = await fetch('http://localhost:8000/hi', {
// let url = process.env.SERVER_URL || 'http://localhost:8000';
// let url = 'http://localhost:8000';
const url = 'https://solo-back.onrender.com/';

const getAPI = async (table, req) => {
  console.log('req front-GET: ', req);
  let res = await fetch(`${url}/api/${table}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify(req),
  });
  console.log('res : ', res);
  let text = await res.text();
  try {
    console.log('GET return : ', JSON.parse(text));
    return JSON.parse(text);
  } catch (error) {
    console.error('Received this from server:', text);
    throw new Error('Server is down');
  }
};

const postAPI = async (table, req) => {
  console.log('req front-POST: ', req);
  let res = await fetch(`${url}/api/${table}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req),
  });
  console.log('res : ', res);
  let text = await res.text();
  try {
    console.log('POST return : ', text);
  } catch (error) {
    console.error('Received this from server:', text);
    throw new Error('Server is down');
  }
};

const deleteAPI = async (table, id, req) => {
  console.log('req front-POST: ', req);
  let res = await fetch(`${url}/api/${table}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify(req),
  });
  console.log('res : ', res);
  let text = await res.text();
  try {
    console.log('DELETE return : ', text);
  } catch (error) {
    console.error('Received this from server:', text);
    throw new Error('Server is down');
  }
};

// const putOBJ = {
//   title: 'next todo:環境変数',
//   description: 'Viteの環境変数がわけわからん...',
//   memo: 'いったん仕切り直し！',
// };
// postAPI(2, putOBJ);
// deleteAPI(2, 15);
getAPI(1);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App getAPI={getAPI} postAPI={postAPI} deleteAPI={deleteAPI} />
  </React.StrictMode>
);
