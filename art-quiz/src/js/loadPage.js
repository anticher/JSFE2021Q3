import { startPageCreate, createSettingsPage, createCategoriesPage, createAuthorPage, createPicturesPage } from './createPage'


export function loadStart() {
    startPageCreate()
}

export function loadSettings() {
    createSettingsPage()
}

export function loadCategories(category, categoryIndex = undefined) {
    createCategoriesPage(category, categoryIndex)
}

export function loadAuthor(imageNum, bullets = []) {
    createAuthorPage(imageNum, bullets = [])
}

export function loadPictures(imageNum, bullets = []) {
    createPicturesPage(imageNum, bullets = [])
}

