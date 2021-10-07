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



bookingEntryTicketBasicLeftButton.addEventListener('click', function () {
    bookingEntryTicketBasicLeftButton.nextElementSibling.stepDown()
})
bookingEntryTicketBasicRightButton.addEventListener('click', function () {
    bookingEntryTicketBasicRightButton.previousElementSibling.stepUp()
})
bookingEntryTicketSeniorLeftButton.addEventListener('click', function () {
    bookingEntryTicketSeniorLeftButton.nextElementSibling.stepDown()
})
bookingEntryTicketSeniorRightButton.addEventListener('click', function () {
    bookingEntryTicketSeniorRightButton.previousElementSibling.stepUp()
})


ticketsAmountBasicLeftButton.addEventListener('click', function () {
    ticketsAmountBasicLeftButton.nextElementSibling.stepDown()
})
ticketsAmountBasicRightButton.addEventListener('click', function () {
    ticketsAmountBasicRightButton.previousElementSibling.stepUp()
})
ticketsAmountSeniorLeftButton.addEventListener('click', function () {
    ticketsAmountSeniorLeftButton.nextElementSibling.stepDown()
})
ticketsAmountSeniorRightButton.addEventListener('click', function () {
    ticketsAmountSeniorRightButton.previousElementSibling.stepUp()
})

// optimization
// function updateElements(elements) {
//     // loop through all elements
//     for (let i = 0; i < elements.length; i++) {
//         const currentNode = elements[i].addedNodes;

//         for (let j = 0; j < currentNode.length; j++) {
//             if (currentNode[j].nodeName.toLowerCase() == "iframe") {
//                 const myLink = currentNode[j].src;

//                 // create local HTML code with Youtube link - replace ___data___ with data - dev.to's markdown parser won't let me use it :)
//                 const localHtml = '<html><body style="background:rgb(200,200,200)"><a href="' + myLink + '" style="font-size:14px;text-align:center;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);"><img src="___data___:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzMuOTJtbSIgaGVpZ2h0PSIyMy42Mm1tIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMy45MiAyMy42MiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04OC4wNCAtMTM2LjcpIj4KICA8cGF0aCB0cmFuc2Zvcm09InNjYWxlKC4yNjQ2KSIgZD0ibTM0MS43IDUxNi42Yy00Ljk0NiAwLTguOTI4IDMuOTgxLTguOTI4IDguOTI4djcxLjQzYzAgNC45NDYgMy45ODEgOC45MjggOC45MjggOC45MjhoMTEwLjRjNC45NDYgMCA4LjkyOC0zLjk4MSA4LjkyOC04LjkyOHYtNzEuNDNjMC00Ljk0Ni0zLjk4MS04LjkyOC04LjkyOC04LjkyOHptNDcuMzIgMjkuNTYgMjYuNTIgMTUuMDktMjYuNTIgMTUuMDl6IiBmaWxsPSIjZjAwIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjMuMDM0cHgiIHN0eWxlPSJwYWludC1vcmRlcjpzdHJva2UgZmlsbCBtYXJrZXJzIi8+CiA8L2c+Cjwvc3ZnPgo=" width="80" height="55"/><br/>play video</a></body></html>';

//                 currentNode[j].setAttribute("data-src", myLink);

//                 // set local HTML
//                 // replace ___data___ with data - dev.to's markdown parser won't let me use it :)
//                 currentNode[j].src = "data:text/html;charset=utf-8," + localHtml;
//             }
//         }
//     }
//     // remove listeners at the end
//     removeEventListener(document, updateElements);
// }

// function removeEvents(obj, callback) {
//     if (window.__obs) {
//         window.__obs.disconnect();
//     }
// }

// function registerEvents(obj, callback) {
//     const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
//     if (MutationObserver) {
//         const obs = new MutationObserver(function(mutations, observer) {
//             callback(mutations)
//         });
//         obs.observe(obj, {
//             childList: true,
//             subtree: true
//         });
//         window.__obs = obs;
//     }
// }

// // register events
// registerEvents(document, updateElements);



//welcome
const sliderNumber = document.querySelector('#welcomeSliderCurrentNumber')
// init Swiper:

const swiper = new Swiper('.welcome__slider', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,
    speed: 700,

    // If we need pagination
    pagination: {
        el: '.slider__pagination',
        clickable: true,
        //   bulletElement: 'div',
        bulletClass: 'slider__button-pagination',
        bulletActiveClass: 'slider__button-pagination-active',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.slider__button-next',
        prevEl: '.slider__button-prev',
    },

    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
})
swiper.on('slideChangeTransitionStart', function () {
    let result
    if (swiper.activeIndex > 5) {
        result = 1
    } else if (swiper.activeIndex === 0) {
        result = 5
    } else {
        result = swiper.activeIndex
    }
    sliderNumber.innerHTML = '0' + result
})


