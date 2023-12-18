# REACT IBM CHART ADDON


### Iconify
https://icon-sets.iconify.design/ic/outline-restore-from-trash/

### Chart
https://canvasjs.com/javascript-charts/line-chart-multiple-axis/
https://recharts.org/en-US/examples

### Fluent UI
https://react.fluentui.dev/?path=/docs/compat-components-datepicker--default

### Rsuite
https://rsuitejs.com/components/date-range-picker/

### Jupyter + lumino
https://jupyter.org/try-jupyter/lab/?path=notebooks%2FIntro.ipynb
https://github.com/ccssmnn/lumino-react
https://github.com/jupyterlab/lumino

## Screenshot
![alt text for screen readers](./public/screenshot.png)


## Scripts

```bash
# dev server with PORT 6005 at http://localhost:6005
$ npm start

# build for production with minify
$ npm run build

# run `lint` to tell you what is wrong code.
$ npm run lint

# run `format` to format all code based on your prettier and linting configuration.
$ npm run format
```

## FE

- react
- redux
- redux thunk

## Libs

- axios
- styled component
- chroma-js
- oidc-client

## Tools

- husky
- lint-staged

## Config VSCode

### Install extensions

- ESLint
- Prettier
- EditorConfig for VS Code

### Edit settings.json file

Windows: Go to File -> Preferences -> Settings or `Ctrl + ,`

Adding in the settings.json file

```
{
  "files.associations": {
    "*.jsx": "javascriptreact"
  },
  "editor.wordWrap": "on",
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.detectIndentation": false,
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Git replacing CRLF to LF

```
$ git config --global core.autocrlf false
$ git rm --cached -r .
$ git reset --hard
```
