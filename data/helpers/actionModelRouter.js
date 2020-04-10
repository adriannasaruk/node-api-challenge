const  express = require("express")
const Project = require('./projectModel.js')
const Action = require ('./actionModel.js')
const router = express.Router()

router.get("/", (req, res) => {
    Action.get()
    .then(item => {
        res.status(200).json(item)
    })
    .catch(err=> {
        res.status(500).json("Error retrieving the projects")
    })
})

router.get("/:id", (req, res) => {
    Action.get(req.params.id)
    .then(item => {
        if(item) {
            res.status(200).json(item)
        } else{
            res.status(400).json({errorMessage: "The ID doesn't exist"})
        }
    })
    .catch(err=> {
        res.status(500).json("Error retrieving the desired project")
    })
})

router.post("/", (req, res) => {
    const ID = Project.get()
    .then(item => {
        console.log(item)
        item.find((element) =>element.id == req.body.project_id)
        console.log(id)
    })
    console.log(ID)
    Action.insert(req.body)
    .then(item => {
        if(!ID) {
            res.status(404).json({errorMessage: "The project ID doesn't exist"})
        } else {
            res.status(201).json(item)
        }
        
    })
    .catch(err=> {
        res.status(500).json("The project id doesnt exist")
    })
})

router.put("/:id", (req, res) => {
   Action.update(req.params.id, req.body)
    .then(item => {
        if(item){
            res.status(200).json(item)
        } else {
            res.status(400).json({errorMessage: "The id is not found"})
        }
        
    })
    .catch(err=> {
        res.status(500).json("Error updating the project")
    })
})

router.delete("/:id", (req, res) => {
    Action.remove(req.params.id)
    .then(count => {
        if(count >0 ) {
            res.status(200).json({message: "The project is deleted"})
        } else{
            res.status(400).json({errorMessage: "The ID was not found"})
        }
    })
    .catch(err=> {
        res.status(500).json("Error deleting the desired project")
    })
})


module.exports = router