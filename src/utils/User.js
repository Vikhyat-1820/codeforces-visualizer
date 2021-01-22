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


module.exports=userInfo