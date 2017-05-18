# todolist-lab
todolist app for General Assembly Austin class on cloud native

## Install

```sh
npm init -y
npm i carbon-components -S
npm i node-sass-chokidar npm-run-all postcss-cli autoprefixer -D
```

## src and dist folders
```
├── dist
│   ├── index.html
│   └── script.js
├── package.json
└── src
    └── style.scss

```

## npm scripts for sass

> **CSS only**: You can also use CSS via CDN [here](https://unpkg.com/carbon-components@7.4.3/css/carbon-components.css)

**ui-application/package.json:**
```json
"scripts": {
  "scss:build": "node-sass-chokidar src/ -o dist/",
  "scss:watch": "node-sass-chokidar src/ -o dist/ --watch --recursive",
  "autoprefixer": "postcss dist/style.css --use autoprefixer -o dist/style.css",
  "scss": "npm-run-all autoprefixer scss:*"
},
```

- `npm run scss:build`: use `node-sass-chokidar` to compile any `.scss` files in **src** and output it to **dist**
- `npm run scss:watch`: do initial build and watch for changes
- `npm run autoprefixer`: add vendor prefixes to style.css
- `npm run scss`: main script for dev, runs all above scripts above. Keep this running while you work in scss files.

Run bff-application and `npm run scss` in two different terminal windows:

## style.scss

> Fonts: (optional) move **fonts** into **dist** folder and set `$font-path: 'fonts';` in **style.scss**

```scss
$css--reset: true;
$css--body: true;

// optional for fonts
$css--font-face: true;
$font-path: 'fonts';

@import '../node_modules/carbon-components/src/globals/scss/styles.scss';
```

Carbon gives you a few options for using styles:
- CSS via CDN
- `@import style.scss`
- `@import` single components



## Planning your components

![original-design](https://cloud.githubusercontent.com/assets/4185382/26179684/b68c53d4-3b2a-11e7-95a9-6655cfbffc46.png)

What components are we working with?

- title
- text-field
- todo-item
  - checkbox
  - todo-item-text
  - delete-button

![deconstructed](https://cloud.githubusercontent.com/assets/4185382/26179983/3d25c212-3b2c-11e7-8c93-632026e9170d.png)

What can we use from `carbon-components`? 
- checkbox
- button
- icons
- text input
- h1

## Text Input

HTML - original
```html
<input id="inputText" class="inputText" type="text" placeholder="What needs to be done?" autofocus="">
```

HTML - carbon-components
```html
<input class="bx--text-input" type="text" id="inputText" placeholder="What needs to be done?" />
```

Some additional styles...

```scss
.bx--text-input {
  margin: 1rem; 
}
```

## Layout

New HTML
```html
<body class="bx--body">
  <div class="todoList-container">
    <h2>Todo List</h2>
    <input class="bx--text-input" type="text" id="inputText" placeholder="What needs to be done?" />
    <ul id="todoList" class="todoList">
    </ul>
  </div>
  ...
</body>
```

Mostly styles for positioning + layout...
```scss
body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.todoList-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  margin: 0 auto;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: white;
  margin: .5rem;
  width: 500px;
}

.bx--checkbox-label {
  margin-left: 1rem;
}

.button {
  margin: 0;
  padding-left: 10px;
  padding-right: 10px;
}

svg {
  fill: white;
  cursor: pointer;
}
```

## Todolist item

This is appended to `ul#todolist` using jQuery via `refreshList()` function.

Refactor the code to use template string literals because...
- multi-line strings
- interpolation


Let's build this up step-by-step...remove all the concatenating HTML string stuff and use a template string.
```js
function refreshList() {
  $('#todoList').empty();
  for (var i = 0; i < todos.length; i++) {
    $('#todoList').append(`
      <li class="item">hello</li>
    `);
  }
}
```

Next we will drop in HTML string for a checkbox from carbon-components:

```js
function refreshList() {
  $('#todoList').empty();
  for (var i = 0; i < todos.length; i++) {
    $('#todoList').append(`
      <li class="item">
        <input id="bx--checkbox-${i}" class="bx--checkbox" type="checkbox" value="green" name="checkbox">
        <label for="bx--checkbox-${i}" class="bx--checkbox-label">
          <span class="bx--checkbox-appearance">
            <svg class="bx--checkbox-checkmark" idth="12" height="9" viewBox="0 0 12 9" fill-rule="evenodd">
              <path d="M4.1 6.1L1.4 3.4 0 4.9 4.1 9l7.6-7.6L10.3 0z"></path>
            </svg>
          </span>
        </label>
      </li>
    `);
  }
}
```

`${i}` gets interpolated so that there are unique `id` and `for` attribute pairings between `<input>` and `<label>`

Finally, add a button using some carbon-component styles and interpolate todo data as well.

```js
function refreshList() {
  $('#todoList').empty();
  for (var i = 0; i < todos.length; i++) {
    $('#todoList').append(
      `<li class="item">
        <input id="bx--checkbox-${i}" class="bx--checkbox" type="checkbox" value="green" name="checkbox">
        <label for="bx--checkbox-${i}" class="bx--checkbox-label">
          <span class="bx--checkbox-appearance">
            <svg class="bx--checkbox-checkmark" idth="12" height="9" viewBox="0 0 12 9" fill-rule="evenodd">
              <path d="M4.1 6.1L1.4 3.4 0 4.9 4.1 9l7.6-7.6L10.3 0z"></path>
            </svg>
          </span>
        </label>
        ${todos[i].todo}
        <button class="button bx--btn bx--btn--primary" onclick="deleteItem(${i})">
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z"></path>
        </svg>
        </button>
      </li>`
    );
  }
}
```



