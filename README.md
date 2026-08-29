# Clubside ComboBox

A lightweight, framework‑free, **ARIA‑correct** combobox component written in vanilla JavaScript.
Designed for production environments, modal contexts, and portal‑based rendering.
Implements full keyboard navigation, click selection, outside‑click closing, and dynamic search.

## Features

- True WAI‑ARIA 1.2 combobox behavior
- Vanilla JavaScript (no dependencies)
- Portal‑based listbox (`<ul role="listbox">`) appended to `document.body`
- Full keyboard support:
  - ArrowDown from input opens listbox and focuses first option
  - ArrowUp/ArrowDown navigate options
  - ArrowUp from first option returns focus to input
  - Enter selects option
  - Escape closes listbox
  - Tab closes listbox and continues normal tabbing
- Click selection with event delegation (single UL listener)
- Outside‑click closing
- CSS‑driven styling with customizable variables
- JS‑driven geometry (placement, width, offset)
- Supports async search via `onSearch`
- Supports custom rendering via `onResults`
- Designed for modal environments (Biolineage)

## Usage

```js
new clubsideComboBox(comboboxElement, {
  onSearch: async ({ text }) => {
    // Return array of { id, text }
  },

  onResults: ({ items }) => {
    // Return array of strings or HTML for each <li>
  },

  delay: 300,
  listOffset: 2,
  value: { id: 15, text: 'Alien Rick' }
})
```

---

## Parameters

### onSearch

**Required.**
A function that returns values to be used in the listbox.
Returned objects must be in the form `{ id, text }`.
Additional properties are allowed and can be used in `onResults` for formatting.

### onResults

**Required.**
A function that returns an array of elements that will be wrapped in `<li>` elements for display.
This can be simple (just the `text` values) or complex (images, markup, etc.).

### showOnEmpty

**Optional.**
Default: `false`.
Whether or not to allow showing of search results when nothing has been entered. Allows the Down Arrow to act like a traditional `<select>` element showing all choices.

### delay

**Optional.**
Default: `500` ms.
The debounce delay before `onSearch` is executed after typing stops.

### listOffset

**Optional.**
Default: `0`.
Vertical pixel offset between the `<input>` and the listbox.

### required

**Optional.**
Default: `false`.
Whether the internal `<input>` element should have the `required` attribute for form validation.

### placeholder

**Optional.**
Default: `null`.
Whether the internal `<input>` element should have the `placeholder` attribute for display when `value` is empty.

### value

**Optional.**
Default: `{ id: null, text: '' }`.
Allows restoring a value from a database or other source.
Supports both custom text (`{ id: null, text: 'Some place' }`) and pick‑list values (`{ id: 34, text: 'That place' }`).

---

## Properties

### value

Returns the current value of the ComboBox in the format `{ id, text }`.
If `id` is `null`, the raw `input.value` is used as `text`.
If an item is selected from the listbox, both `id` and `text` are populated.

---

## CSS

All ComboBox‑related CSS is prefixed with `cscb-`.
Internal elements:

- `cscb-input` — the `<input>`
- `cscb-listbox` — the `<ul>` dropdown

Customizable CSS variables:

```text
--cscb-foreground-color (fallback black)
--cscb-background-color (fallback white)
--cscb-border-color (fallback black)
--cscb-border-width (fallback 1px)
--cscb-listbox-gap (default 0)
--cscb-listbox-padding (fallback 0)
--cscb-listbox-height (fallback 10lh)
--cscb-listitem-padding-horizontal (fallback 6px)
--cscb-listitem-padding-vertical (fallback 4px)
--cscb-hover-foreground-color (fallback black)
--cscb-hover-background-color (fallback #ddd)
```

---

## License

MIT
