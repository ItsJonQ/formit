# 🐇 Formit

> A speedy way to create HTML forms.

* **Tiny**, around 1.35 KB gzipped
* **Zero dependences**

## 🔧 Installation

```
npm install --save formit
```


## 🕹 Usage

Here's a quick example of how you can compose HTML forms with Formit:

```js
Formit('#form', [
  {
    label: 'First name',
    type: 'text',
    placeholder: 'First',
    autofocus: true,
  },
  {
    label: 'Last name',
    placeholder: 'Last',
    type: 'text',
  },
  {
    type: 'submit',
    value: 'Go!'
  },
])
```

#### Rendered HTML

```html
<div id="form">
  <div class="FormElements-FieldGroup FormElements-id-0">
    <label for="FormElements-0" class="FormElements-Label">
      <div class="FormElements-Label__text">First name</div>
      <input type="text" id="FormElements-0" placeholder="First" autofocus="true" class="FormElements-Field">
    </label>
  </div>
  <div class="FormElements-FieldGroup FormElements-id-1">
    <label for="FormElements-1" class="FormElements-Label">
    <div class="FormElements-Label__text">Last name</div>
    <input type="text" id="FormElements-1" placeholder="Last" class="FormElements-Field">
    </label>
  </div>
  <div class="FormElements-FieldGroup FormElements-id-2">
    <input type="submit" id="FormElements-2" value="Go!" class="FormElements-Field">
  </div>
</div>
```

A cool feature of Formit is that it'll automatically generate unique IDs and associate the `<label>` (if generated) with the field.
