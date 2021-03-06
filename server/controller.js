const Rollbar = require("rollbar")
const houses = require("./db.json")
let houseId = 4

const rollbar = new Rollbar({
    accessToken: '6ec6778ecf174db9a290d491a827f161',
    captureUncaught: true,
    captureUnhandledRejections: true
  });
//   commment

module.exports = {
    getHouses: (req,res) => {
        rollbar.log('gethouses')
        res.status(200).send(houses)
    },
    deleteHouse: (req, res) => {
        const index = houses.findIndex(elem => elem.id === +req.params.id)
        houses.splice(index, 1)
        res.status(200).send(houses)
    },
    createHouse: (req,res) => {
        console.log("create House working")
        const { address,price,imageURL } = req.body
        const newHouse = {id:houseId,address,price,imageURL}
        houses.push(newHouse)
        rollbar.info("house added successfully")
        rollbar.log("house added!!")
        res.status(200).send(houses)
        houseId++
    },
    updateHouse: (req,res) => {
        const index = houses.findIndex(elem => elem.id === +req.params.id)
        const { type } = req.body
        if (type === 'plus') {
            houses[index].price += 10000
            res.status(200).send(houses)
        } else if (type === 'minus' && houses[index].price >= 10000) {
            houses[index].price -= 10000
            res.status(200).send(houses)
        } else {
            res.status(400).send({error: 'cannot update price'})
        }
    }
}

