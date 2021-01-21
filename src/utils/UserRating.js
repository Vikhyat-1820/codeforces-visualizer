const request=require('request')

const UserRating=(user,callback) => {
    const url="https://codeforces.com/api/user.rating?handle=" + user

    request({url,json:true},(error,response) => {
        if(error){
            callback('Unable to connect to the network',undefined)
        }
        else if(response.status==='FAILED'){
            callback('Unable to find the user',undefined)
        }
        else{
            var ratingchange=[]
            ratingchange.push(['contestId','newRating'])
            var res=response.body.result
            for(i=0;i<res.length;i+=1){
                ratingchange.push([res[i].contestId,res[i].newRating])
            }
            //console.log(rarr)
            callback(undefined,{
                ratingchange:ratingchange
            })
        }
    })
}

module.exports=UserRating