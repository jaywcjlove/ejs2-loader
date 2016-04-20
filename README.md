## Usage

[Documentation: Using loaders](http://webpack.github.io/docs/using-loaders.html)

### in js

``` js
var template = require("ejs-compiled!./file.ejs");
// => returns the template function compiled with ejs templating engine.

// And then use it somewhere in your code
// Pass object with data
template(data) 

```

### in webpack 

```json
module: {
    loaders: [
      {test: /\.ejs$/, loader: 'ejs2-loader?htmlmin=removeComments|removeAttributeQuotes|minifyCSS'}
    ]
}
```

[HTMLMinifier, Options Quick Reference](https://github.com/kangax/html-minifier#options-quick-reference)

### Child Templates

```html
<!-- Child Templates -->
<!-- path is relative to where webpack is being run -->
<!-- global variable -->
<%- var title = "This is really amazing" -%>
<%- include templates/header -%>
```

# reference

- [How to write a plugin](https://webpack.github.io/docs/how-to-write-a-plugin.html)
- [mde/ejs](https://github.com/mde/ejs) 