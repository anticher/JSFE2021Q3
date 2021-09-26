// buttons plus and minus of tickets section that change input(number of tickets)


const bookingEntryTicketBasicLeftButton = document.querySelector('#entry-ticket__basic-left-btn')
const bookingEntryTicketBasicRightButton = document.querySelector('#entry-ticket__basic-right-btn')
const bookingEntryTicketSeniorLeftButton = document.querySelector('#entry-ticket__senior-left-btn')
const bookingEntryTicketSeniorRightButton = document.querySelector('#entry-ticket__senior-right-btn')

const ticketsAmount = document.querySelector('#tickets__basic-left-btn')

const ticketsAmountBasicLeftButton = document.querySelector('#amount__basic-left-btn')
const ticketsAmountBasicRightButton = document.querySelector('#amount__basic-right-btn')
const ticketsAmountSeniorLeftButton = document.querySelector('#amount__senior-left-btn')
const ticketsAmountSeniorRightButton = document.querySelector('#amount__senior-right-btn')



bookingEntryTicketBasicLeftButton.addEventListener('click', function() {
    bookingEntryTicketBasicLeftButton.nextElementSibling.stepDown()
})
bookingEntryTicketBasicRightButton.addEventListener('click', function() {
    bookingEntryTicketBasicRightButton.previousElementSibling.stepUp()
})
bookingEntryTicketSeniorLeftButton.addEventListener('click', function() {
    bookingEntryTicketSeniorLeftButton.nextElementSibling.stepDown()
})
bookingEntryTicketSeniorRightButton.addEventListener('click', function() {
    bookingEntryTicketSeniorRightButton.previousElementSibling.stepUp()
})


ticketsAmountBasicLeftButton.addEventListener('click', function() {
    ticketsAmountBasicLeftButton.nextElementSibling.stepDown()
})
ticketsAmountBasicRightButton.addEventListener('click', function() {
    ticketsAmountBasicRightButton.previousElementSibling.stepUp()
})
ticketsAmountSeniorLeftButton.addEventListener('click', function() {
    ticketsAmountSeniorLeftButton.nextElementSibling.stepDown()
})
ticketsAmountSeniorRightButton.addEventListener('click', function() {
    ticketsAmountSeniorRightButton.previousElementSibling.stepUp()
})


console.log(`Score: 150 / 150
    Вёрстка валидная +10
    Вёрстка семантическая +24
    Вёрстка соответствует макету +45
    Форма покупки билетов +22
    Требования к css + 18
    Интерактивность, реализуемая через css +25
    Интерактивность, реализуемая через js +16
    
    Спасибо за проверку и успехов!`)
