const { response } = require('express')
const request=require('request')

const UserRating=(user,callback) => {
    const url="https://codeforces.com/api/user.rating?handle=" + user

    request({url,json:true},(error,response) => {
        // console.log(response.body)
        console.log("USERRATING",response.body.status)
        console.log(url)
        if(error){
            callback('Unable to connect to the network',undefined)
        }
        else if(response.body.status==='FAILED'){
            callback('Unable to find the user',undefined)
        }
        else if(response.body.result.length===0){
            callback("No contests",undefined)
        }
        else{
            var res=response.body.result
            
            var ratingchange=[]
            ratingchange.push(['contestId','newRating'])
            
            for(i=0;i<res.length;i+=1){
                var a=res[i].ratingUpdateTimeSeconds
                var date=new Date(a*1000)
                
                date.setHours(0,0,0,0)
                
                ratingchange.push([date.valueOf(),res[i].newRating])
            }
            //console.log(rarr)
            callback(undefined,{
                ratingchange:ratingchange
            })
        }
    })
}

const UserRank=(user,callback) => {
    const url="https://codeforces.com/api/user.rating?handle=" + user

    request({url,json:true},(error,response) => {
        console.log("USERRANK",response.body.status)
        console.log(url)
        if(error){
            callback('Unable to connect to the network',undefined)
        }
        else if(response.body.status==='FAILED'){
            callback('Unable to find the user',undefined)
        }
        else if(response.body.result.length===0){
            callback("No contests",undefined)
        }
        else{
            const res=response.body.result;
            var maxRank=0,minRank=40000
            for(i=0;i<res.length;i+=1){
                if(res[i].rank>maxRank){
                    maxRank=res[i].rank
                }
                if(res[i].rank<minRank){
                    minRank=res[i].rank
                }
            }
            callback(undefined,{
                maxRank:maxRank,
                minRank:minRank
            })
        }
    })
}

const ContestStat=(user,callback) => {
    const url="https://codeforces.com/api/user.rating?handle=" + user
    request.get({url,json:true},(error,response) => {
        console.log("CONTESTSTAT",response.body.status)
        console.log(url)
        if(error){
            callback("Unable to connect to the network",undefined)
        }
        else if(response.body.status==="FAILED"){
            callback("Unable to find the user",undefined)
        }
        else if(response.body.result.length===0){
            callback("No contests",undefined)
        }
        else{
            const res=response.body.result
            
            var conteststat=[]
            for(var i=0;i<res.length;i+=1){
                conteststat.push([res[i].contestName,res[i].rank])
            }
            
            callback(undefined,{
                conteststat:conteststat
            })
        }
    })
}
module.exports={
    UserRating,
    UserRank,
    ContestStat
}