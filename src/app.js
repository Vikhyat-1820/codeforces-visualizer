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


const langmap=require('./utils/LDRT.js')
const {UserRating,UserRank}=require('./utils/UserRating.js')
const {userInfo,usersInfo} =require('./utils/User.js')
const unsolved=require('./utils/unsolved.js')
// const usersInfo=require('./utils/User.js')
// const { resolveSoa } = require('dns')



app.get('',(req,res) => {
    res.render('index')
})


app.get('/unsolved',(req,res) => {
    res.render('Unsolved')
})

app.get('/compare',(req,res) => {
    res.render('compare')
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
            tagarr:response.tagarr,
            subarr:response.subarr,
            verdarr:response.verdarr
        })
        
    })

    
})


app.get('/unsolvedproblem',(req,res)=>{
    if (!req.query.search  || !req.query.from  ||  !req.query.to) {
        return res.send({
            error:'you must provide correct data'
        })
    }
    const user=req.query.search
    const from=req.query.from
    const to=req.query.to
    unsolved(user,from,to,(error,response) => {
        //console.log(response)
        //console.log(error)
        if(error){
            return res.send({
                error:error,
            })
        }
        
        res.send({
            unsolvedproblem:response.unsolvedproblem,
        })
        
    })

    
})



app.get('/ratingchange',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error:'you must provide User'
        })
    }
    const user=req.query.search
    UserRating(user,(error,response) => {
        if(error){
            return res.send({
                error:error,
            })
        }
        res.send({
            ratingchange:response.ratingchange
        })
    })

    
})

app.get('/userinfo',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:"you must provide Username"
        })
    }
    const user=req.query.search
    console.log(user)
    userInfo(user,(error,response) => {
        console.log(response)
        if(error){
            return res.send({
                error:error,
            })
        }
        res.send({
            rating:response.rating,
            maxrating:response.maxrating,
            rank:response.rank,
            maxrank:response.maxrank
        })
    })

})


app.get('/usersInfo',(req,res) => {
    if(!req.query.search1 && !req.query.search2){
        return res.send({
            error:"you must provide Username"
        })
    }
    const user1=req.query.search1
    const user2=req.query.search2
    usersInfo(user1,user2,(error,response) => {
        console.log(response)
        if(error){
            return res.send({
                error:error,
            })
        }
        res.send({
            rating1:response.rating1,
            maxRating1:response.maxRating1,
            rating2:response.rating2,
            maxRating2:response.maxRating2
            
        })
    })

})

app.get('/userRank',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:"you must provide Username"
        })
    }
    const user=req.query.search
    UserRank(user,(error,response) => {
        if(error){
            return res.send({
                error:error,
            })
        }
        res.send({
            maxRank:response.maxRank,
            minRank:response.minRank
        })
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
