const request=require('request')

const userInfo=(user,callback) => {
    const url="https://codeforces.com/api/user.info?handles=" + user
    request({url,json:true},(error,response) => {
        if(error){
            callback('Unable to connect to the network',undefined)
        }
        else if(response.body.status==='FAILED'){
            callback('Unable to find the user',undefined)
        }
        else{
            
            callback(undefined,{
                rating:response.body.result[0].rating,
                maxrating:response.body.result[0].maxRating,
                rank:response.body.result[0].rank,
                maxrank:response.body.result[0].maxRank
            })
        }
    })
}


const usersInfo=(user1,user2,callback) => {
    const url="https://codeforces.com/api/user.info?handles=" + user1 + ";" + user2
    request({url,json:true},(error,response) => {
        if(error){
            callback('Unable to connect to the network',undefined)
        }
        else if(response.body.status==='FAILED'){
            callback('Unable to find the user',undefined)
        }
        else{
            console.log(response.body.result)
            callback(undefined,{
                rating1:response.body.result[0].rating,
                maxRating1:response.body.result[0].maxRating,
                rating2:response.body.result[1].rating,
                maxRating2:response.body.result[1].maxRating,
            })
        }
    })
}


module.exports={
    userInfo,
    usersInfo
}