export const state = {
    pictureInfo: [],
    answers: [],
    questionIndex: undefined,
    userAnswers: [],
    categoriesScoreNumber: undefined,
    interval: undefined,
    intervalNumber: undefined,
}




export function clearState() {
    state.pictureInfo = []
    state.userAnswers = []
    state.questionIndex = undefined
    state.categoriesScoreNumber = undefined
    state.answers = []
    state.interval = undefined
    state.intervalNumber = undefined
}