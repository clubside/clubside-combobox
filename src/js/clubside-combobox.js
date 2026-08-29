'use strict'

/**
 * @typedef {Object} ClubsideComboBoxValue
 * @property {string|number|null} id
 * @property {string} text
 */

/**
 * @typedef {Object} ClubsideComboBoxOptions
 * @property {Function} onSearch
 * @property {Function} onResults
 * @property {number} [delay=500]
 * @property {number} [listOffset=0]
 * @property {ClubsideComboBoxValue} [value]
 */

function createModel(initialValue) {
	let current = initialValue || { id: null, text: '' }

	return {
		get value() { return current },
		set value(v) { current = v }
	}
}

/**
 * Create a new instance of Clubside ComboBox
 * @param {HTMLElement} root
 * @param {ClubsideComboBoxOptions} options
 */
export default function clubsideComboBox(root, options) {
	if (!(root instanceof HTMLElement)) {
		throw new Error('ComboBox root must be an HTMLElement')
	}

	if (root.children.length > 0) {
		throw new Error('ComboBox root must not contain child elements')
	}

	if (!options || typeof options !== 'object') {
		throw new Error('ComboBox options must be provided')
	}

	const { onSearch, onResults, delay = 500, listOffset = 0, value } = options

	if (typeof onSearch !== 'function') {
		throw new Error('ComboBox requires an onSearch function')
	}

	if (typeof onResults !== 'function') {
		throw new Error('ComboBox requires an onResults function')
	}

	const listboxId = `cscb-${Math.random().toString(36).slice(2)}`

	root.style.position = 'relative'
	root.setAttribute('role', 'group')
	root.setAttribute('aria-owns', listboxId)

	// Create input
	const input = document.createElement('input')
	input.classList.add('cscb-input')
	input.type = 'text'
	input.setAttribute('role', 'combobox')
	input.setAttribute('aria-autocomplete', 'list')
	input.setAttribute('aria-expanded', 'false')
	input.setAttribute('aria-haspopup', 'listbox')
	input.setAttribute('aria-controls', listboxId)
	input.setAttribute('aria-activedescendant', '')
	root.appendChild(input)

	// Measure after layout
	const inputRect = input.getBoundingClientRect()
	const inputHeight = inputRect.height - 8

	// Add padding so text doesn't overlap the clear button
	input.style.paddingRight = `${inputHeight + 8}px`

	// Create clear button
	const clearButton = document.createElement('button')
	clearButton.classList.add('cscb-close')
	clearButton.style.width = `${inputHeight}px`
	clearButton.style.height = `${inputHeight}px`
	clearButton.tabIndex = -1
	clearButton.setAttribute('aria-hidden', 'true')
	clearButton.type = 'button'

	// SVG icon
	clearButton.innerHTML = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="m18.3 5.71c-.39-.39-1.02-.39-1.41 0l-4.89 4.88-4.89-4.89c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l4.89 4.89-4.89 4.89c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0l4.89-4.89 4.89 4.89c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41l-4.89-4.89 4.89-4.89c.38-.38.38-1.02 0-1.4z" fill="#000"></path>
    </svg>
`

	// Clear logic
	clearButton.addEventListener('mousedown', e => e.preventDefault())
	clearButton.addEventListener('click', () => {
		input.value = ''
		model.value = { id: null, text: '' }
		root.value = model.value

		lastResults = []

		listbox.innerHTML = ''
		listbox.style.display = 'none'
		input.setAttribute('aria-expanded', 'false')

		input.focus()
	})

	root.appendChild(clearButton)

	const listbox = document.createElement('ul')
	listbox.id = listboxId
	listbox.classList.add('cscb-listbox')
	listbox.setAttribute('role', 'listbox')
	listbox.style.display = 'none'
	document.body.appendChild(listbox)

	// Internal model
	const model = createModel(value)

	// Internal search state
	let lastResults = []
	let searchTimer = null

	// Debounced search trigger
	function scheduleSearch(text) {
		if (searchTimer) {
			clearTimeout(searchTimer)
		}

		searchTimer = setTimeout(() => {
			runSearch(text)
		}, delay)
	}

	function renderResults(items) {
		// Clear listbox
		listbox.innerHTML = ''

		// Developer renderer
		const htmlArray = onResults({ items })

		if (!Array.isArray(htmlArray)) {
			console.error('onResults must return an array of HTML strings')
			return
		}

		// Create LI elements
		htmlArray.forEach((html, index) => {
			const li = document.createElement('li')

			li.setAttribute('role', 'option')
			li.setAttribute('aria-selected', 'false')
			li.tabIndex = -1

			// Unique ID for aria-activedescendant
			const optionId = `${listboxId}-opt-${index}`
			li.id = optionId

			// Store ID + text for selection logic
			li.dataset.id = items[index].id
			li.dataset.text = items[index].text

			// Developer-provided inner HTML
			li.innerHTML = html

			listbox.appendChild(li)
		})

		// Position listbox relative to input
		const rect = input.getBoundingClientRect()

		listbox.style.top = `${rect.bottom + window.scrollY + listOffset}px`
		listbox.style.left = `${rect.left + window.scrollX}px`
		listbox.style.width = `${rect.width}px`
		listbox.style.display = 'flex'

		// Open dropdown
		input.setAttribute('aria-expanded', 'true')
	}

	// Execute onSearch and store results
	async function runSearch(text) {
		try {
			const results = await onSearch({ text })

			if (!Array.isArray(results)) {
				console.error('onSearch must return an array')
				lastResults = []
			} else {
				lastResults = results
			}

			console.log('Search results:', lastResults)

			if (lastResults.length > 0) {
				renderResults(lastResults)
			} else {
				// No results → close dropdown
				listbox.innerHTML = ''
				listbox.style.display = 'none'
				input.setAttribute('aria-expanded', 'false')
			}
		} catch (err) {
			console.error('onSearch error:', err)
			lastResults = []
		}
	}

	function selectItem(li) {
		const id = li.dataset.id ? Number(li.dataset.id) : null
		const text = li.dataset.text || li.textContent.trim()

		model.value = { id, text }
		root.value = model.value
		input.value = text

		input.setAttribute('aria-activedescendant', '')
		input.setAttribute('aria-expanded', 'false')

		listbox.style.display = 'none'
		input.focus()
	}

	// Public value API
	Object.defineProperty(root, 'value', {
		get() { return model.value },
		set(v) {
			model.value = v
			input.value = v.text
		}
	})

	// Initialize input with initial value (if provided)
	if (value && typeof value.text === 'string') {
		input.value = value.text
	}

	input.addEventListener('keydown', e => {
		if (e.key === 'Tab') {
			// Close listbox
			listbox.style.display = 'none'
			input.setAttribute('aria-expanded', 'false')
			input.setAttribute('aria-activedescendant', '')
			// Allow normal tabbing
			return
		}

		if (e.key === 'ArrowDown') {
			const items = listbox.querySelectorAll('li')
			if (!items.length) return

			e.preventDefault()
			if (listbox.style.display === 'none') listbox.style.display = 'flex'
			items[0].focus()
			input.setAttribute('aria-activedescendant', items[0].id)
		}
	})

	// BASIC INPUT LISTENER (before search, before dropdown)
	input.addEventListener('input', () => {
		const text = input.value

		// Typing always breaks selection → id = null
		model.value = { id: null, text }

		// Update public API
		// (this keeps root.value in sync)
		root.value = model.value

		// Trigger search
		scheduleSearch(text)
	})

	// Prepare for exact-match-on-blur
	input.addEventListener('blur', () => {
		const text = input.value.trim().toLowerCase()

		if (!text) return

		const match = lastResults.find(r =>
			r.text.toLowerCase() === text
		)

		if (match) {
			model.value = { id: match.id, text: match.text }
			root.value = model.value
		}
	})

	// Prevent blur-before-click issues
	listbox.addEventListener('mousedown', e => {
		e.preventDefault()
	})

	// Single click handler for all items
	listbox.addEventListener('click', e => {
		const li = e.target.closest('li')
		if (!li) return

		const id = li.dataset.id ? Number(li.dataset.id) : null
		const text = li.dataset.text || li.textContent.trim()

		// Update model
		model.value = { id, text }
		root.value = model.value

		// Update input
		input.value = text

		// Update ARIA
		input.setAttribute('aria-activedescendant', li.id)
		input.setAttribute('aria-expanded', 'false')

		// Close listbox
		listbox.style.display = 'none'

		// Restore focus
		input.focus()
	})

	listbox.addEventListener('keydown', e => {
		const items = listbox.querySelectorAll('li')
		const count = items.length
		const current = document.activeElement
		const index = [...items].indexOf(current)

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault()
				if (index < count - 1) {
					items[index + 1].focus()
					input.setAttribute('aria-activedescendant', items[index + 1].id)
				}
				// else do nothing
				break

			case 'ArrowUp':
				e.preventDefault()
				if (index === 0) {
					// Return focus to input
					input.focus()
					input.setAttribute('aria-activedescendant', '')
				} else {
					const prev = index - 1
					items[prev].focus()
					input.setAttribute('aria-activedescendant', items[prev].id)
				}
				break

			case 'Enter':
				e.preventDefault()
				selectItem(current)
				break

			case 'Escape':
				e.preventDefault()
				listbox.style.display = 'none'
				input.setAttribute('aria-expanded', 'false')
				input.focus()
				input.setAttribute('aria-activedescendant', '')
				break

			case 'Tab':
				// Close listbox
				listbox.style.display = 'none'
				input.setAttribute('aria-expanded', 'false')
				input.setAttribute('aria-activedescendant', '')

				// Return focus to input *just long enough* for tabbing to continue
				input.focus()

				// Allow browser to continue normal tabbing
				// DO NOT preventDefault()
				break
		}
	})

	document.addEventListener('mousedown', e => {
		// If listbox is closed, ignore
		if (listbox.style.display === 'none') return

		// If click is inside input → do nothing
		if (root.contains(e.target)) return

		// If click is inside listbox → do nothing
		if (listbox.contains(e.target)) return

		// Otherwise → close
		listbox.style.display = 'none'
		input.setAttribute('aria-expanded', 'false')
		input.setAttribute('aria-activedescendant', '')
	})
}

/*
function findScrollParent(el) {
    while (el && el !== document.body) {
        const style = getComputedStyle(el)
        if (/(auto|scroll)/.test(style.overflowY)) {
            return el
        }
        el = el.parentElement
    }
    return window
}

const scrollParent = findScrollParent(root)

scrollParent.addEventListener('scroll', reposition)
window.addEventListener('resize', reposition)

new ResizeObserver(reposition).observe(input)

function reposition() {
    const rect = input.getBoundingClientRect()
    listbox.style.top = `${rect.bottom + window.scrollY}px`
    listbox.style.left = `${rect.left + window.scrollX}px`
    listbox.style.width = `${rect.width}px`
}
*/
