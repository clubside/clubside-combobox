'use strict'

import clubsideComboBox from '/src/js/clubside-combobox.js'

const combobox = document.getElementById('combobox')
const saveButton = document.getElementById('save')

function setup() {
	new clubsideComboBox(combobox, {
		onSearch: async ({ text }) => {
			const api = `https://rickandmortyapi.com/api/character?name=${encodeURI(text)}`
			const data = await fetch(api).then(r => r.json())
			if (!data.results) return []
			const unsorted = data.results.map(r => ({
				id: r.id,
				text: r.name
			}))
			return unsorted.sort((a, b) => a.text.localeCompare(b.text))
		},

		onResults: ({ items }) => {
			return items.map(item => item.text)
		},

		delay: 300,
		listOffset: 2,
		value: { id: 15, text: 'Alien Rick' }
	})
}

saveButton.addEventListener('click', () => {
	console.log(combobox.value)
})

document.addEventListener('DOMContentLoaded', setup)
