const express = require('express')
const app = express()
const cors = require('cors')
const router = express.Router()
const bodyParser =require('body-parser')

let bears = [{ id:1, name:'Pooh', weight:100},
  {id:2, name:'Winnie', weight:200},]

app.use(express.static('public'))

app.use('/api',bodyParser.urlencoded({extended:false}), router)

app.use(cors()) 

router.route('/bears')
  .get((req,res) => res.send(bears))
 
  .post((req,res) => {
  let bear =     {}
  bear.id = bears.length+1
  bear.name = req.body.name
  bear.weight = req.body.weight
  bears.push(bear)
  res.send(bears)   
})

router.route('/bears/:id')
     .get((req,res) => res.send(bears[req.params.id]))

     .delete((req,res) => {
        delete bears[req.params.id]
        res.send(bears)
     })

     .put( (req,res) => {
        const id = req.params.id
        bears[id].name = req.body.name
        bears[id].weight = req.body.weight
        res.send(bears)
        console.log("Put name : " + req.body.name + " and weight : " + req.body.weight)      
     })



app.listen(80)
console.log("Server started!")
