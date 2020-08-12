// * DOM
const app = document.getElementById("app")
const form = document.getElementById("form")
const rulesModal = document.getElementById("rules-modal")
const rules = document.getElementById("rules")

// * GLOBALS
let userIsActive = false
let selectedRounds = 0
let humanScore = 0
let cpuScore = 0
const tokens = [{ name: "paper" }, { name: "scissors" }, { name: "rock" }]
const result = [
  [0, 1, 2],
  [2, 0, 1],
  [1, 2, 0],
]

// * FUNCTIONS

const renderApp = () => {
  // ! cambiar a true!!!
  if (userIsActive === true) printGame()
  else form.classList.remove("hidden")
}

const setRounds = (rounds) => {
  selectedRounds = rounds
  userIsActive = true
}

const timer = () => {
  const countdownElement = document.getElementById("countdown")
  let selectTime = 5
  const interval = setInterval(() => {
    selectTime--
    if (selectTime < 1) {
      clearInterval(interval)
      countdownElement.innerHTML = "Finished time"
    }
    const time = `Chose you're play: ${selectTime} seconds`
    countdownElement.innerHTML = time
  }, 1000)
}

const printGame = () => {
  form.classList.add("hidden")
  const fragment = document.createDocumentFragment()
  const table = document.createElement("SECTION")
  table.classList.add("table")

  const countdown = document.createElement("span")
  countdown.classList.add("countdown")
  countdown.setAttribute("id", "countdown")
  countdown.textContent = "Chose you're play: 5 seconds"

  tokens.map((token) => {
    const tokenElement = document.createElement("DIV")
    tokenElement.classList.add("token", token.name)
    tokenElement.setAttribute("data-value", token.name)
    tokenElement.innerHTML = `
      <div class="token-outline-top">
      <img src="../images/icon-${token.name}.svg" alt="icon for play" />
      </div>
    `
    table.append(tokenElement)
  })
  fragment.append(countdown, table)
  app.append(fragment)
  timer()
}

const playRound = () => {
  let currentRound = 0
  while (currentRound < selectedRounds) {
    currentRound++
    console.log(selectedRounds, currentRound)
  }
}

// * EVENTS

// Open/close modal rules
rules.addEventListener("click", (e) => {
  if (e.target.dataset.action === "open-rules")
    rulesModal.classList.add("rules__modal--active")
  else if (e.target.dataset.action === "close-rules")
    rulesModal.classList.remove("rules__modal--active")
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  const rounds = parseInt(e.target[0].value)
  setRounds(rounds)
  renderApp()
  playRound()
})

app.addEventListener("click", (e) => {
  const target = e.target.dataset.value
  if (target === "rock" || target === "paper" || target === "scissors")
    console.log(target)
})

window.addEventListener("load", renderApp())
