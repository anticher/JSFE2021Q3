const bookingWindow = document.querySelector('.booking-form')
const bookingOverlay = document.querySelector('.booking-form__overlay')
const bookingWindowOpenBtn = document.querySelector('.tickets__btn')
const bookingWindowCloseBtn = document.querySelector('.booking-form__closeButton')

bookingWindowOpenBtn.addEventListener('click', function () {
  bookingWindow.classList.add('booking-form-active')
  bookingOverlay.classList.add('booking-form__overlay-active')
})

bookingWindowCloseBtn.addEventListener('click', function () {
  bookingWindow.classList.remove('booking-form-active')
  bookingOverlay.classList.remove('booking-form__overlay-active')
})

bookingOverlay.addEventListener('click', function () {
  bookingWindow.classList.remove('booking-form-active')
  bookingOverlay.classList.remove('booking-form__overlay-active')
})


//select style

let x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "booking-form__select-wrapper": */
x = document.getElementsByClassName("booking-form__select-wrapper");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box,
      and the selected item: */
      let y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  let x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);



//tickets

const bookingEntryTicketBasicLeftButton = document.querySelector('#entry-ticket__basic-left-btn')
const bookingEntryTicketBasicRightButton = document.querySelector('#entry-ticket__basic-right-btn')
const bookingEntryTicketSeniorLeftButton = document.querySelector('#entry-ticket__senior-left-btn')
const bookingEntryTicketSeniorRightButton = document.querySelector('#entry-ticket__senior-right-btn')

const ticketsAmount = document.querySelector('#tickets__basic-left-btn')

const ticketsAmountBasicLeftButton = document.querySelector('#amount__basic-left-btn')
const ticketsAmountBasicRightButton = document.querySelector('#amount__basic-right-btn')
const ticketsAmountSeniorLeftButton = document.querySelector('#amount__senior-left-btn')
const ticketsAmountSeniorRightButton = document.querySelector('#amount__senior-right-btn')






const bookingEntryBasicCost = document.querySelector('#booking__entry-basic-cost')
const bookingEntrySeniorCost = document.querySelector('#booking__entry-senior-cost')
const bookingBasicCost = document.querySelector('#booking__basic-cost')
const bookingSeniorCost = document.querySelector('#booking__senior-cost')

const bookingFormOverwiewType = document.querySelector('.booking-form__overview-type')

const ticketsTotalNumber = document.querySelector('#tickets__total-number')
const bookingTotalNumber = document.querySelector('#booking__total-number')
const bookingBasicNumber = document.querySelector('#booking__basic-number')
const bookingSeniorNumber = document.querySelector('#booking__senior-number')
const bookingBasicEntry = document.querySelector('#booking__basic-entry')
const bookingSeniorEntry = document.querySelector('#booking__senior-entry')
const ticketsInputBasic = document.querySelector('#amount__input-basic')
const ticketsInputSenior = document.querySelector('#amount__input-senior')
const ticketsInputRadio = document.querySelectorAll('.tickets__radio')
const bookingInputBasic = document.querySelector('#entry-input-basic')
const bookingInputSenior = document.querySelector('#entry-input-senior')


// bookingWindowOpenBtn.addEventListener("click", ticketsCost)

// function ticketsCost() {
//   console.log(ticketsInputBasic.value)
//   console.log(ticketsInputSenior.value)
//   ticketsInputRadio.forEach(element => {
//     if (element.checked) {
//       console.log(element.value)
//     }
//   })
// }

function radioButtonsUpdate() {
  if (localStorage.getItem('input-radio')) {
    //if there is a stored value, apply it to the input
    ticketsInputRadio.forEach(element => {
      if (element.value == localStorage.getItem('input-radio')) {
        element.checked = true
        ticketsTotalSum(localStorage.getItem('input-radio'));
        ticketsTotalNumber.innerHTML = localStorage.getItem('tickets-total')
        bookingTotalNumber.innerHTML = localStorage.getItem('tickets-total')
        bookingBasicNumber.innerHTML = localStorage.getItem('tickets-basic')
        bookingSeniorNumber.innerHTML = localStorage.getItem('tickets-senior')
      } else {
        element.checked = false
      }
    })
  } else {
    localStorage.setItem('input-radio', ticketsInputRadio[0].value)
  }
}


window.onload = function() {
  if (localStorage.getItem('input-basic')) {
    //if there is a stored value, apply it to the input
    ticketsInputBasic.value = localStorage.getItem('input-basic');
    bookingInputBasic.value = localStorage.getItem('input-basic');
    bookingBasicEntry.value = localStorage.getItem('input-basic');
  }

  ticketsAmountBasicLeftButton.addEventListener('click', function () {
    localStorage.setItem('input-basic', ticketsInputBasic.value);
  })
  ticketsAmountBasicRightButton.addEventListener('click', function () {
    localStorage.setItem('input-basic', ticketsInputBasic.value);
  })
  if (localStorage.getItem('input-senior')) {
    //if there is a stored value, apply it to the input
    ticketsInputSenior.value = localStorage.getItem('input-senior');
    bookingInputSenior.value = localStorage.getItem('input-senior');
    bookingSeniorEntry.value = localStorage.getItem('input-senior');
  }

  ticketsAmountBasicLeftButton.addEventListener('click', function () {
    localStorage.setItem('input-senior', ticketsInputSenior.value);
  })
  ticketsAmountBasicRightButton.addEventListener('click', function () {
    localStorage.setItem('input-senior', ticketsInputSenior.value);
  })
  
  radioButtonsUpdate()

  ticketsInputRadio.forEach(element => element.addEventListener('click', function () {
    localStorage.setItem('input-radio', element.value)
    ticketsTotalSum(localStorage.getItem('input-radio'));
    ticketsTotalNumber.innerHTML = localStorage.getItem('tickets-total')
    bookingTotalNumber.innerHTML = localStorage.getItem('tickets-total')
    bookingBasicNumber.innerHTML = localStorage.getItem('tickets-basic')
    bookingSeniorNumber.innerHTML = localStorage.getItem('tickets-senior')
    }))
}


//





function ticketsBasicMinusButton() {
  ticketsInputBasic.stepDown()
  bookingInputBasic.stepDown()
  bookingBasicEntry.stepDown()
  localStorage.setItem('input-basic', ticketsInputBasic.value);
  ticketsTotalSum(localStorage.getItem('input-radio'));
  ticketsTotalNumber.innerHTML = localStorage.getItem('tickets-total')
  bookingTotalNumber.innerHTML = localStorage.getItem('tickets-total')
  bookingBasicNumber.innerHTML = localStorage.getItem('tickets-basic')
}

function ticketsBasicPlusButton() {
  ticketsInputBasic.stepUp()
  bookingInputBasic.stepUp()
  bookingBasicEntry.stepUp()
  localStorage.setItem('input-basic', ticketsInputBasic.value);
  ticketsTotalSum(localStorage.getItem('input-radio'));
  ticketsTotalNumber.innerHTML = localStorage.getItem('tickets-total')
  bookingTotalNumber.innerHTML = localStorage.getItem('tickets-total')
  bookingBasicNumber.innerHTML = localStorage.getItem('tickets-basic')
}

function ticketsSeniorMinusButton() {
  ticketsInputSenior.stepDown()
  bookingInputSenior.stepDown()
  bookingSeniorEntry.stepDown()
  localStorage.setItem('input-senior', ticketsInputSenior.value);
  ticketsTotalSum(localStorage.getItem('input-radio'));
  ticketsTotalNumber.innerHTML = localStorage.getItem('tickets-total')
  bookingTotalNumber.innerHTML = localStorage.getItem('tickets-total')
  bookingSeniorNumber.innerHTML = localStorage.getItem('tickets-senior')
}

function ticketsSeniorPlusButton() {
  ticketsInputSenior.stepUp()
  bookingInputSenior.stepUp()
  bookingSeniorEntry.stepUp()
  localStorage.setItem('input-senior', ticketsInputSenior.value);
  ticketsTotalSum(localStorage.getItem('input-radio'));
  ticketsTotalNumber.innerHTML = localStorage.getItem('tickets-total')
  bookingTotalNumber.innerHTML = localStorage.getItem('tickets-total')
  bookingSeniorNumber.innerHTML = localStorage.getItem('tickets-senior')
}

ticketsAmountBasicLeftButton.addEventListener('click', ticketsBasicMinusButton)
bookingEntryTicketBasicLeftButton.addEventListener('click', ticketsBasicMinusButton)

ticketsAmountBasicRightButton.addEventListener('click', ticketsBasicPlusButton)
bookingEntryTicketBasicRightButton.addEventListener('click', ticketsBasicPlusButton)

ticketsAmountSeniorLeftButton.addEventListener('click', ticketsSeniorMinusButton)
bookingEntryTicketSeniorLeftButton.addEventListener('click', ticketsSeniorMinusButton)


ticketsAmountSeniorRightButton.addEventListener('click', ticketsSeniorPlusButton)
bookingEntryTicketSeniorRightButton.addEventListener('click', ticketsSeniorPlusButton)

const bookingSelectSelected = document.querySelector('.select-selected')
const bookingSelectItems = document.querySelector('.select-items')
const bookingSelectItem = bookingSelectItems.querySelectorAll('div')
bookingSelectItem.forEach(element => {
  element.addEventListener('click', function() {
    ticketsTotalSum(element.innerHTML)
  })
})
function ticketsTotalSum(type) {
  bookingFormOverwiewType.innerHTML = type
  localStorage.setItem('input-radio', type)
  ticketsInputRadio.forEach(element => {
    if (element.value == type) {
      element.checked = true
    } else {
      element.checked = false
    }
  })
  if (type == 'Permanent exhibition') {
    localStorage.setItem('tickets-total', ticketsSum(20));
    localStorage.setItem('tickets-basic', inputBasicSum(20));
    localStorage.setItem('tickets-senior', inputSeniorSum(20));
    bookingEntryBasicCost.innerHTML = '20'
    bookingBasicCost.innerHTML = '20'
    bookingEntrySeniorCost.innerHTML = '10'
    bookingSeniorCost.innerHTML = '10'
    ticketsTotalNumber.innerHTML = localStorage.getItem('tickets-total')
    bookingTotalNumber.innerHTML = localStorage.getItem('tickets-total')
    bookingBasicNumber.innerHTML = localStorage.getItem('tickets-basic')
    bookingSeniorNumber.innerHTML = localStorage.getItem('tickets-senior')
  }
  if (type == 'Temporary exhibition') {
    bookingSelectSelected.innerHTML = 'Temporary exhibition'
    localStorage.setItem('tickets-total', ticketsSum(25));
    localStorage.setItem('tickets-basic', inputBasicSum(25));
    localStorage.setItem('tickets-senior', inputSeniorSum(25));
    bookingEntryBasicCost.innerHTML = '25'
    bookingBasicCost.innerHTML = '25'
    bookingEntrySeniorCost.innerHTML = '12.5'
    bookingSeniorCost.innerHTML = '12.5'
    ticketsTotalNumber.innerHTML = localStorage.getItem('tickets-total')
    bookingTotalNumber.innerHTML = localStorage.getItem('tickets-total')
    bookingBasicNumber.innerHTML = localStorage.getItem('tickets-basic')
    bookingSeniorNumber.innerHTML = localStorage.getItem('tickets-senior')
  }
  if (type == 'Combined Admission') {
    bookingSelectSelected.innerHTML = 'Combined Admission'
    localStorage.setItem('tickets-total', ticketsSum(40));
    localStorage.setItem('tickets-basic', inputBasicSum(40));
    localStorage.setItem('tickets-senior', inputSeniorSum(40));
    bookingEntryBasicCost.innerHTML = '40'
    bookingBasicCost.innerHTML = '40'
    bookingEntrySeniorCost.innerHTML = '20'
    bookingSeniorCost.innerHTML = '20'
    ticketsTotalNumber.innerHTML = localStorage.getItem('tickets-total')
    bookingTotalNumber.innerHTML = localStorage.getItem('tickets-total')
    bookingBasicNumber.innerHTML = localStorage.getItem('tickets-basic')
    bookingSeniorNumber.innerHTML = localStorage.getItem('tickets-senior')
  }
}

function inputBasicSum(x) {
  return x * localStorage.getItem('input-basic')
}

function inputSeniorSum(x) {
  return x * localStorage.getItem('input-senior') / 2
}



function ticketsSum(x) {
  return inputBasicSum(x) + inputSeniorSum(x)
}



//date
const bookingFormDate = document.querySelector('.booking-form__date')
const bookingFormOverviewDate = document.querySelector('.booking-form__overview-date')
const calendarInput = document.querySelector('.booking-form__date')
let calendarDate = new Date()
let calendarYear = calendarDate.getFullYear()
let calendarMonth = calendarDate.getMonth() + 1
if (calendarMonth < 10) {
  calendarMonth = '0' + calendarMonth
}
let calendarDay = calendarDate.getDate()
if (calendarDay < 10) {
  calendarDay = '0' + calendarDay
}
calendarInput.min = `${calendarYear}-${calendarMonth}-${calendarDay}`


bookingFormDate.addEventListener('change', function() {
  let dateTicket = new Date(bookingFormDate.value)
  let month = dateTicket.getMonth()
  let dayOfTheMonth = dateTicket.getDate()
  let dayOfTheWeek = dateTicket.getDay()
  const daysOfTheWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  bookingFormOverviewDate.innerHTML = `${daysOfTheWeek[dayOfTheWeek]}, ${months[month]} ${dayOfTheMonth}`
})


//time
const bookingFormOverviewTime = document.querySelector('.booking-form__overview-time')
const bookingFormTime = document.querySelector('.booking-form__time')

bookingFormTime.addEventListener('change', function() {
  bookingFormOverviewTime.innerHTML = bookingFormTime.value
})


//validation

const bookingFormName = document.querySelector('.booking-form__name')
const bookingFormEmail = document.querySelector('.booking-form__email')
const bookingFormTel = document.querySelector('.booking-form__tel')
const bookingFormError = document.querySelector('.booking_error')

const bookingFormNameLabel = document.querySelector('.booking-form__name-label')
const bookingFormEmailLabel = document.querySelector('.booking-form__email-label')
const bookingFormTelLabel = document.querySelector('.booking-form__tel-label')



const nameRe = /^([A-zА-я ]{3,15})$/
const emailRe = /^([A-Z|a-z|0-9|\-|_]{3,15})\@([A-Z|a-z]{4,})\.[a-z]{2,}$/
const telRe = /^([ -]?([0-9]{2,3})){1,5}$/

bookingFormName.addEventListener('input', function() {
  if (nameRe.test(bookingFormName.value)) {
    console.log('name changed')
    bookingFormName.style.border = '1px solid black'
    bookingFormNameLabel.classList.remove('booking__label-error')
  } else {
    console.log('name changed')
    bookingFormName.style.border = '3px solid red'
    bookingFormNameLabel.classList.add('booking__label-error')
  }
})

bookingFormEmail.addEventListener('input', function() {
  if (emailRe.test(bookingFormEmail.value)) {
    bookingFormEmail.style.border = '1px solid black'
    bookingFormEmailLabel.classList.remove('booking__label-error')
  } else {
    bookingFormEmail.style.border = '3px solid red'
    bookingFormEmailLabel.classList.add('booking__label-error')
  }
})

bookingFormTel.addEventListener('input', function() {
  if (telRe.test(bookingFormTel.value) && (bookingFormTel.value.split('-').join('').split(' ').join('').length) < 11) {
    bookingFormTel.style.border = '1px solid black'
    bookingFormTelLabel.classList.remove('booking__label-error')
  } else {
    bookingFormTel.style.border = '3px solid red'
    bookingFormTelLabel.classList.add('booking__label-error')
  }
})