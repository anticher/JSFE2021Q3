import { createStartPageLanding, startCreateActions } from './startPage'
import { createSettingsPageLanding, settingsCreateActions } from './settingsPage'
import { createCategoriesPageLanding, categoryCreateActions } from './categoriesPage'
import { createChooseAuthorPageLanding, authorCategoryActions } from './authorPage'
import { createChoosePicturesPageLanding, picturesCategoryActions } from './picturesPage'

async function createPage(page, actions) {
    const mainElement = document.querySelector('main')
    mainElement.classList.add('hiding')
    const preload = page()
    setTimeout(() => {
        mainElement.innerHTML = preload
        const body = document.querySelector('body')
        actions().then(() => {
            mainElement.classList.remove('hiding')
        })
    }, 300)








    // mainElement.innerHTML = page()

    // setTimeout(() => {
    //     mainElement.innerHTML = page()
    //     actions()
    //     mainElement.classList.remove('hiding')
    // }, 300)
}


export function startPageCreate() {
    createPage(createStartPageLanding, startCreateActions)
}

export function createSettingsPage() {
    createPage(createSettingsPageLanding, () => settingsCreateActions(startPageCreate, createSettingsPage))
}

export function createCategoriesPage(category, categoryIndex = undefined) {
    createPage(() => createCategoriesPageLanding(category), () => categoryCreateActions(startPageCreate, createCategoriesPage, createAuthorPage, createPicturesPage, category, categoryIndex))
}

export function createAuthorPage(imageNum, bullets = []) {
    createPage(createChooseAuthorPageLanding, () => authorCategoryActions(createCategoriesPage, createAuthorPage, imageNum, bullets = []))
}

export function createPicturesPage(imageNum, bullets = []) {
    createPage(createChoosePicturesPageLanding, () => picturesCategoryActions(createCategoriesPage, createPicturesPage, imageNum, bullets = []))
}

