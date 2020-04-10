const  express = require("express")
const Project = require('./projectModel.js')
const Action = require ('./actionModel.js')
const router = express.Router()
router.use("/:id", validateProjectId)

router.get("/", (req, res) => {
    Project.get()
    .then(item => {
        res.status(200).json(item)
    })
    .catch(err=> {
        res.status(500).json("Error retrieving the projects")
    })
})

router.get("/:id", (req, res) => {
    Project.get(req.params.id)
    .then(item => {
        if(item) {
            res.status(200).json(item)
        } else {
            res.status(400).json({errorMessage: "The ID doesn't exist"})
        }
    })
    .catch(err=> {
        res.status(500).json("Error retrieving the desired project")
    })
})    

router.get("/:id/actions", (req, res) => {
    Project.getProjectActions(req.params.id)
    .then(item => {
        if(item) {
            res.status(200).json(item)
        } else {
            res.status(400).json({errorMessage: "The ID doesn't exist"})
        }
    })
    .catch(err=> {
        res.status(500).json("Error retrieving the desired project")
    })
})

// router.post("/:project_id/actions", (req, res) => {
//     const {project_id} = req.params
//     const {text} = req.body
//     const newObject = {text, project_id}

//     const ID = Project.get()
//     .then(item => {
//         item.find((element) => element.id == project_id)
//     })
//     .catch(error => {
//         console.log(EROOR, "ERROR")
//     })
//     console.log(ID)
    
//     if(!ID) {
//         res.status(404).json({message: "project_id doesn't exist"})
//     } else
//             Action.insert(newObject)
//             .then(item => {
//                     res.status(201).json(item)
//                 })
//         .catch(err =>{
//             res.status(500).json("Error adding the action")
//         }) 
// })

router.post("")

router.put("/:id", (req, res) => {
    Project.update(req.params.id, req.body)
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
    Project.remove(req.params.id)
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

//custom middleware

function validateProjectId(req,res,next){
    Project.get(req.params.id)
    .then(project => {
        if(project){
            req.project = project
            next();
        } else {
            res.status(400).json({message: "Invalid User id from middleware"})
        }
    })
}


module.exports = router