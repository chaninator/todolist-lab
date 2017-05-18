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

## HTML

**index.html:**
```html
<body>
  <div class="container">
    <h2>Todo List</h2>
    <div>
      <div class="formInputArea">
        <input id="inputText" class="inputText" type="text" placeholder="What needs to be done?" autofocus="">
      </div>
      <ul id="todoList" class="todoList">
      </ul>
    </div>
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script src="./script.js"></script>
</body>
```

**index.html w/carbon-components:** 