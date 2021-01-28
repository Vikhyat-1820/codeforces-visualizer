const request=require('request')

const UserRating=(user,callback) => {
    const url="https://codeforces.com/api/user.rating?handle=" + user

    request({url,json:true},(error,response) => {
       
        if(error){
            callback('Unable to connect to the network',undefined)
        }
        else if(response.body.status==='FAILED'){
            callback('Unable to find the user',undefined)
        }
        else{
            var ratingchange=[]
            ratingchange.push(['contestId','newRating'])
            var res=response.body.result
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
       
        if(error){
            callback('Unable to connect to the network',undefined)
        }
        else if(response.body.status==='FAILED'){
            callback('Unable to find the user',undefined)
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
module.exports={
    UserRating,
    UserRank
}