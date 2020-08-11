// * DOM
const app = document.getElementById("app")
const form = document.getElementById("form")
const rulesModal = document.getElementById("rules-modal")
const rules = document.getElementById("rules")

// * GLOBALS
let userIsActive = false
const tokens = [{ name: "paper" }, { name: "scissors" }, { name: "rock" }]

// * FUNCTIONS

const renderApp = () => {
  // ! cambiar a true!!!
  if (userIsActive === false) printGame()
  else form.classList.remove("hidden")
}

// Add Rounds to session storage
const setRounds = (rounds) => {
  sessionStorage.setItem("rounds", JSON.stringify(rounds))
  userIsActive = true
}

const printGame = () => {
  form.classList.add("hidden")
  const fragment = document.createDocumentFragment()
  const table = document.createElement("SECTION")
  table.classList.add("table")

  tokens.map((token) => {
    const tokenElement = document.createElement("DIV")
    tokenElement.classList.add("token", `${token.name}`)
    tokenElement.innerHTML = `
      <div class="token-outline-top">
      <img src="../images/icon-${token.name}.svg" alt="icon for play" />
      </div>
    `

    table.append(tokenElement)
  })

  fragment.append(table)

  app.append(fragment)
}

const startGame = () => {}

// Traer el valor del session storage
// const token = JSON.parse(sessionStorage.getItem("token"))

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
  startGame()
})

window.addEventListener("load", renderApp())
