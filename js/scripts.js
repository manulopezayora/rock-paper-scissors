// * DOM
const app = document.getElementById("app")
const form = document.getElementById("form")
const userScoreValue = document.getElementById("user-score-value")
const cpuScoreValue = document.getElementById("cpu-score-value")
const rulesModal = document.getElementById("rules-modal")
const rules = document.getElementById("rules")

// * GLOBALS
let userIsActive = false
let selectedRounds = 0
let currentRound = 0
let userScore = 0
let cpuScore = 0
let userPlay = null
let cpuPlay = null
let winner = false
const tokens = [
  { name: "paper", value: 0 },
  { name: "scissors", value: 1 },
  { name: "rock", value: 2 },
]
const result = [
  [0, 1, 2],
  [2, 0, 1],
  [1, 2, 0],
]

// * FUNCTIONS

const renderApp = () => {
  userScoreValue.textContent = userScore
  cpuScoreValue.textContent = cpuScore
  if (userIsActive === true) {
    printGame()
    setTimeout(userRandomPlay, 5000)
  } else {
    form.classList.remove("hidden")
  }
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
    if (selectTime <= 0) {
      clearInterval(interval)
      selectTime = 5
    }
    const time = `Chose your play: ${selectTime} seconds`
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
  countdown.textContent = "Chose your play: 5 seconds"
  tokens.map((token) => {
    const tokenElement = document.createElement("DIV")
    tokenElement.classList.add("token", token.name)
    tokenElement.setAttribute("data-value", token.value)
    tokenElement.innerHTML = `
      <div class="token-outline-top" data-value="${token.value}">
      <img src="../images/icon-${token.name}.svg" alt="icon for play" data-value="${token.value}" />
      </div>
    `
    table.append(tokenElement)
  })
  fragment.append(countdown, table)
  app.append(fragment)
  timer()
}

const userRandomPlay = () => {
  if (userPlay === null) {
    userPlay = Math.round(Math.random() * 2)
    playRound(userPlay)
  } else {
    console.warn(userPlay)
  }
}

const cpuRandomPlay = () => (cpuPlay = Math.round(Math.random() * 2))

const nextRound = () => {
  app.innerHTML = ""
  userPlay = null

  if (userScore > selectedRounds / 2) {
    winner = true
    userPlay = 0
    app.innerHTML = `
       <div class="final-msg">
         <h2>Congratulations!</h2>
         <h3>you won the game</h3>
         <a href="index.html" class="btn link-btn">Play Again?</a>
       </div>
       `
  } else if (cpuScore > selectedRounds / 2) {
    winner = true
    userPlay = 0
    app.innerHTML = `
         <div class="final-msg">
         <h2>Game Over</h2>
         <h3>you lost the game</h3>
         <a href="index.html" class="btn link-btn">Play Again?</a>
       </div>
         `
  } else if (currentRound <= selectedRounds) {
    if (winner === false) {
      renderApp()
    }
  }
}

const setRound = (userToken) => {
  const user = tokens[userToken].value
  const cpu = tokens[cpuPlay].value
  const roundResult = result[user][cpu]
  let roundResultInfo
  switch (roundResult) {
    case 0:
      roundResultInfo = "Round tied"
      break
    case 1:
      roundResultInfo = "Round loss"
      cpuScore += 1
      currentRound += 1
      break
    case 2:
      roundResultInfo = "Round won"
      userScore += 1
      currentRound += 1
      break

    default:
      break
  }
  app.innerHTML = ""
  const fragment = document.createDocumentFragment()
  const table = document.createElement("SECTION")
  table.classList.add("table", "tableVS")
  const userTokenElement = document.createElement("DIV")
  userTokenElement.classList.add("token", tokens[userToken].name, "token-game")
  userTokenElement.innerHTML = `
      <div class="token-outline-top">
      <img src="../images/icon-${tokens[userToken].name}.svg" alt="icon for play" />
      </div>
    `
  const cpuTokenElement = document.createElement("DIV")
  cpuTokenElement.classList.add("token", tokens[cpuPlay].name, "token-game")
  cpuTokenElement.innerHTML = `
      <div class="token-outline-top">
      <img src="../images/icon-${tokens[cpuPlay].name}.svg" alt="icon for play" />
      </div>
    `
  table.append(userTokenElement, cpuTokenElement)
  const roundInfo = document.createElement("DIV")
  roundInfo.classList.add("round-info")
  roundInfo.innerHTML = `
    <span>You picked</span>
    <span>cpu picked</span>
  `
  const resultInfo = document.createElement("DIV")
  resultInfo.classList.add("result-info")
  resultInfo.innerHTML = `
    <h2 class="result">${roundResultInfo}</h2>
    <button onclick="nextRound()" class="btn">Next Round</button>
  `
  fragment.append(table, roundInfo, resultInfo)
  app.append(fragment)
}

const playRound = (target) => {
  cpuRandomPlay()
  setRound(target, cpuPlay)
  // if (userPlay != null) userRandomPlay()
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
})

app.addEventListener("click", (e) => {
  const target = parseInt(e.target.dataset.value)
  if (target === 0 || target === 1 || target === 2) {
    playRound(target)
    userPlay = target
  }
})

window.addEventListener("load", renderApp())
