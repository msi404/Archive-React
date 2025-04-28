import { useState, useEffect, useCallback } from 'react'

type Theme = {
	name: string
	primary: string
	primaryForeground: string
}

// Define your theme options here
const themes: Theme[] = [
	{
		name: 'Default',
		primary: 'oklch(0.52 0.3108 260.47)',
		primaryForeground: 'oklch(0.985 0 0)'
	},
	{
		name: 'Yellow',
		primary: 'oklch(0.75 0.1727 84.71)',
		primaryForeground: 'oklch(0.985 0 0)'
	},
	{
		name: 'Green',
		primary: 'oklch(0.75 0.2006 147.18)',
		primaryForeground: 'oklch(0.1 0 0)'
	},
	{
		name: 'Red',
		primary: 'oklch(0.64 0.2861 20.12)',
		primaryForeground: 'oklch(1 0 20.12)'
	}
]

const defaultThemeName = 'Default'
const storageKey = 'app-theme'

export const useTheme = () => {
	const [themeName, setThemeName] = useState<string>(() => {
		try {
			const storedTheme = window.localStorage.getItem(storageKey)
			return storedTheme ?? defaultThemeName
		} catch (error) {
			console.error('Error reading theme from localStorage:', error)
			return defaultThemeName
		}
	})

	const applyTheme = useCallback((name: string) => {
		const selectedTheme = themes.find((t) => t.name === name) ?? themes[0]
		const root = document.documentElement
		root.style.setProperty('--primary', selectedTheme.primary)
		root.style.setProperty(
			'--primary-foreground',
			selectedTheme.primaryForeground
		)
	}, [])

	useEffect(() => {
		applyTheme(themeName)
		try {
			window.localStorage.setItem(storageKey, themeName)
		} catch (error) {
			console.error('Error saving theme to localStorage:', error)
		}
	}, [themeName, applyTheme])

	const cycleTheme = () => {
		setThemeName((prevName) => {
			const currentIndex = themes.findIndex((t) => t.name === prevName)
			const nextIndex = (currentIndex + 1) % themes.length
			return themes[nextIndex].name
		})
	}

	return { themeName, setTheme: setThemeName, cycleTheme, availableThemes: themes }
} 