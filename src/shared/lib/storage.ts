const PINNED_COLUMNS_KEY = 'pinned_columns'

export const loadPinnedColumns = (): Record<string, boolean> => {
	try {
		const value = localStorage.getItem(PINNED_COLUMNS_KEY)
		return value ? JSON.parse(value) : {}
	} catch {
		return {}
	}
}

export const savePinnedColumns = (value: Record<string, boolean>) => {
	try {
		localStorage.setItem(PINNED_COLUMNS_KEY, JSON.stringify(value))
	} catch {
		return {}
	}
}

const COLUMN_VISIBILITY_KEY = 'column_visibility'

export const loadColumnVisibility = (): Record<string, boolean> => {
	try {
		const value = localStorage.getItem(COLUMN_VISIBILITY_KEY)
		return value ? JSON.parse(value) : {}
	} catch {
		return {}
	}
}

export const saveColumnVisibility = (value: Record<string, boolean>) => {
	try {
		localStorage.setItem(COLUMN_VISIBILITY_KEY, JSON.stringify(value))
	} catch {
		return {}
	}
}
