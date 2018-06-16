const inquirer = require('inquirer')
const axios = require('axios')

const mnuHoofd =
  {
    type: 'list',
    name: 'hoofdmenu',
    message: 'Wat wil je doen?',
    choices: [
      'Toon alle 🍞🍞',
      'Toon 1 🍞',
      'Simuleer 🙎',
      '🍞 aanvullen',
      '🔚 Exit',
      new inquirer.Separator(),
      'Avendoo simulatie',
    ]
  }

const mnuToonItem = {
  type: 'input',
  name: 'mnuToonItem',
  message: 'Welk item ( id)'
}
const mnuSimuleerGebruiker = {
  type: 'list',
  name: 'simulatie',
  message: 'Wat wil je doen?',
  choices: [
    'Ochtend 😴',
    'Middag 🤤',
    '⬅️ Terug'
  ]
}


inquirer
  .prompt(mnuHoofd)
  .then(answers => {
    if (answers.hoofdmenu === 'Toon alle 🍞🍞')
      return toonAlleItems()
    if (answers.hoofdmenu === 'Toon 1 🍞')
      return toonEenItem()
    if (answers.hoofdmenu === '🍞 aanvullen')
      return reseedItems()
    if (answers.hoofdmenu === 'Simuleer 🙎')
      return subSimuleerGebruiker()
  })

const subSimuleerGebruiker = async () => {
  inquirer
    .prompt(mnuSimuleerGebruiker)
    .then(answers => {
      if (answers.simulatie === 'Ochtend 😴')
        return simOchtendShift()
      if (answers.simulatie === 'Middag 🤤')
        return simMiddagShift()
      if (answers.simulatie === '⬅️ Terug')
        return true
    })
}

const toonAlleItems = async () => {
  const response = await axios.get('http://localhost:3001/api/items')
  console.log('Toon alles:', response.data)
}

const toonEenItem = async () => {
  console.log('Toon 1 item')
  inquirer
    .prompt(mnuToonItem)
    .then(answers => {
      if (answers.hoofdmenu === 'Toon alle items')
        return toonAlleItems()
      if (answers.hoofdmenu === 'Toon 1 item')
        return toonEenItem()
      console.log(answers)
      // Axios GET
    })
}

const reseedItems = async () => {
  console.log('Reseeding ... 🌀')
  const result = await axios.get('http://localhost:3001/api/items/reseed')
  if (result.data.status === 200) console.log('Db reseeded ✅')
  else console.error('Er ging iets mis ❌', result.data)
}

const simOchtendShift = async () => {
  console.log('Simulatie van de ochtend 😴');
  console.log('Overal worden er broden weg gehaald 🍞')
  for (let i = 0; i < 32; i++) {
    const randomNumber = Math.floor(Math.random() * 425 + 1);
    await axios.delete(`http://localhost:3001/api/items/${randomNumber}`)
  }
}

const simMiddagShift = async () => {
  console.log('Simulatie van de middag 🤤');
  console.log('Overal worden er broden weg gehaald 🍞 omdat de mensen honger hebben');
  for (let i = 0; i < 250; i++) {
    const randomNumber = Math.floor(Math.random() * 425 + 1);
    await axios.delete(`http://localhost:3001/api/items/${randomNumber}`)
  }
}