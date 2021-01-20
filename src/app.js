const request = require('request')
const path = require('path')
const express = require('express')
const hbs = require('hbs')


const app = express()


app.set('view engine', 'hbs')

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const publicDirectoryPath = path.join(__dirname, '../public')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


const langmap=require('./utils/lang.js')




app.get('',(req,res) => {
    res.render('index')
})


app.get('/info',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error:'you must provide User'
        })
    }
    const user=req.query.search
    
    langmap(user,(error,response) => {
        if(error){
            return res.send({
                error:error,
            })
        }
        
        res.send({
            langarr:response.langarr,
            ratingarr:response.ratingarr,
            diffarr:response.diffarr,
            tagarr:response.tagarr
        })
    })
    
})



app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
