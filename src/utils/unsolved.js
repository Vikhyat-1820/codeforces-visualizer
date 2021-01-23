const request=require('request')


const unsolved=(user,from,to,callback) => {
    const url="https://codeforces.com/api/user.status?handle=" +user + "&from=1"

    request({url,json:true},(error,response) => {
        console.log(error)
        if(error){
            callback("unable to connect",undefined)
        }
        else if(response.body.status==='FAILED'){
            callback("unable to find the user",undefined)
        }
        else{
            const res=response.body.result
            const size=response.body.result.length
            //console.log(size)
            var ratingprob=new Map()
            

            for(i=0;i<size;i+=1){
                //console.log(i)
                if(res[i].verdict==='OK'){
                    var r=res[i].problem.rating;
                    var id=res[i].problem.contestId + '+' +  res[i].problem.index



                    //RATING
                    if(r){
                        if(ratingprob.has(r)===true){
                            var a=ratingprob.get(r)
                            if(a.has(id)===true){
                                h=a.get(id);
                                if(h===0){
                                    a.set(id,1);
                                }
                            }
                            else{
                                a.set(id,1)
                            }
                            ratingprob.set(r,a)
                        }
                        else{
                            var a=new Map()
                            a.set(id,1)
                            ratingprob.set(r,a)
                        }
                    
                    }


                }
                else{
                    var r=res[i].problem.rating;
                    var id=res[i].problem.contestId + '+' +  res[i].problem.index
                    if(r){
                        if(ratingprob.has(r)===true){
                            var a=ratingprob.get(r)
                            if(a.has(id)===true){
                                h=a.get(id);
                            }
                            else{
                                a.set(id,0)
                            }
                            ratingprob.set(r,a)
                        }
                        else{
                            var a=new Map()
                            a.set(id,0)
                            ratingprob.set(r,a)
                        }
                      
                    }
                }
            }
            var unsolvedproblem=[]
            //console.log(ratingprob)
            for(var key of ratingprob.keys()){
                if(key<=to && key>=from){
                    var a=ratingprob.get(key)
                    for(var k of a.keys()){
                        var b=a.get(k);
                        
                        if(b===0){
                            unsolvedproblem.push(k)
                        }
                    }
                }
            }
            //console.log(unsolvedproblem)
            callback(undefined,{
                unsolvedproblem:unsolvedproblem
            })
        }
    })

}

module.exports=unsolved