// Импортируем библиотеку React для использования JSX и создания компонентов
import React from "react";
// Импортируем ReactDOM для рендеринга React-компонентов в DOM
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./scss/app";

// Импортируем главный компонент приложения App
import App from "./App.js";

// Создаем корневой элемент для рендеринга в DOM с id 'root'
const root = ReactDOM.createRoot(document.getElementById("root"));

//Рендерим код из App.js
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
);
