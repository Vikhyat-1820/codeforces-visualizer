const request=require('request')

const langmap=(user,callback) => {


    //URL
    const url="https://codeforces.com/api/user.status?handle=" +user + "&from=1"
    

    //API CALL
    request({url,json:true},(error,response) => {
        console.log(url)
        console.log("LANGMAP",response.body.status)
        //NO INTERNET
        if(error){
            callback("Unable to connect to the network",undefined)
        }

        //USER NOT FOUND
        else if(response.body.status==="FAILED"){
            callback("Unable to find the user",undefined)
        }
        else if(response.body.result.length===0){
            callback("No Submission",undefined)
        }
        else{


            const res=response.body.result
            const size=response.body.result.length
            


            var lang = new Map();
            var rating = new Map();
            var ratingprob=new Map()
            var diff =new Map();
            var tag = new Map();
            var sub=new Map();
            var verd=new Map();


            for(i=0;i<size;i++){

                if(res[i].verdict==='OK'){

                    //LANGUAGES
                    var l=res[i].programmingLanguage
                    if(lang.has(l)===true){
                        var a=lang.get(l)
                        a+=1
                        lang.set(l,a)
                    }
                    else{
                        lang.set(l,1)
                    }
                    var r=res[i].problem.rating;
                    var id=res[i].problem.contestId +  res[i].problem.index



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
                        if(rating.has(r)===true){
                            var a=rating.get(r)
                            rating.set(r,a)
                        }
                        else{
                            rating.set(r,[0,0])
                        }
                    }


                    //A,B,C COUNT
                    var d=res[i].problem.index;
                    var cId=res[i].problem.contestId
                    d=d[0];
                    if(diff.has(d)===true){
                        var a=diff.get(d)
                        if(a.includes(cId+d)==false){
                            a.push(cId+d)
                        }
                        diff.set(d,a)
                    }
                    else{
                        diff.set(d,[cId + d])
                    }


                    //TAGS COUNT
                    var t=res[i].problem.tags
                    d=res[i].problem.index;
                    for(j=0;j<t.length;j+=1){
                        if(tag.has(t[j])){
                            var a=tag.get(t[j]);
                            if(a.includes(cId+d)===false){
                                a.push(cId+d)
                            }
                            tag.set(t[j],a)
                        }
                        else{
                            tag.set(t[j],[cId+d])
                        }
                    }

                }
                else{

                    //RATING UNSOLVED COUNT
                    var r=res[i].problem.rating;
                    var id=res[i].problem.contestId +  res[i].problem.index
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
                        if(rating.has(r)===true){
                            var a=rating.get(r)
                            rating.set(r,a)
                        }
                        else{
                            rating.set(r,[0,0])
                        }
                    }
                }


                // HEATMAP 
                var t=res[i].creationTimeSeconds
                var t=t*1000
                var date=new Date(t)
                var month=date.toLocaleString("en-US", {month: "numeric"})
                var day=date.toLocaleString("en-US", {day: "numeric"})
                var year=date.toLocaleString("en-US", {year: "numeric"})
                var d=new Date(year,month,day)
                d.setHours(0, 0, 0, 0);
                if(sub.has(d.valueOf())===true){
                    var a=sub.get(d.valueOf());
                    a+=1
                    sub.set(d.valueOf(),a)
                }
                else{
                    sub.set(d.valueOf(),1)
                }
                if(verd.has(res[i].verdict)==true){
                    var a=verd.get(res[i].verdict)
                    a+=1
                    verd.set(res[i].verdict,a)
                }
                else{
                    verd.set(res[i].verdict,1)
                }


            }
            var diffmap=new Map([...diff.entries()].sort());

            var langarr=[['data','value']]
            
            var ratingarr=[['data','Solved','Unsolved']]
            
            var diffarr=[['data','value']]
            
            var tagarr=[['data','value']]
            
            var verdarr=[['data','value']]
            
            var subarr=[]
            //LANG

            for (var key of lang.keys()){
                langarr.push([key,lang.get(key)])
            }

            // RATING
            for(var key of ratingprob.keys()){
                var a=ratingprob.get(key)
                
                for(var k of a.keys()){
                    var b=a.get(k);
                    
                    if(b===1){
                        var c=rating.get(key)
                        c[0]+=1
                        rating.set(key,c)
                    }
                    else{
                        var c=rating.get(key)
                        c[1]+=1
                        rating.set(key,c)
                    }
                }
            }
            rating=new Map([...rating.entries()].sort(function(a,b){    
                return a[0]-b[0]
            }));
            
            for(var key of rating.keys()){
                var d=key.toString();
                var a=rating.get(key)
                ratingarr.push([d,a[0],a[1]])
            }


            //A,B,C COUNT
            for(var key of diffmap.keys()){
                var a=diffmap.get(key)

                diffarr.push([key,a.length])
            }


            //TAG COUNT
            for(var key of tag.keys()){
                var a=tag.get(key)
                tagarr.push([key,a.length])
            }


            //SUBMISSION HEATMAP
            for(var key of sub.keys()){
                subarr.push([key,sub.get(key)])
            }

            //VERDICT
            for(var key of verd.keys()){
                verdarr.push([key,verd.get(key)])
            }
            

            //CALLBACK
            callback(undefined,{
                langarr:langarr,
                ratingarr:ratingarr,
                diffarr:diffarr,
                tagarr:tagarr,
                subarr:subarr,
                verdarr:verdarr,
                ratingmap:ratingprob,
            })
        }
    })
}


const SubCount=(user,callback) => {
    const url="https://codeforces.com/api/user.status?handle=" +user + "&from=1"
    request({url,json:true},(error,response) => {
        console.log(url)
        console.log("SUBCOUNT",response.body.status)
        if(error){
            callback("unable to connect to the network",undefined);
        }
        else if(response.body.status==="FAILED"){
            callback("Unable to find the User",undefined)
        }
        else if(response.body.result.length===0){
            callback("No contests",undefined)
        }
        else{
            const res=response.body.result
            
            var submap=new Map()
            var firstsubmap=new Map()
            res.reverse()
            var tried=0
            var solved=0
            var sub=0;
            var maxsub=0;
            var onesub=0;
            for(i=0;i<res.length;i+=1){
                const problemname=res[i].problem.contestId + res[i].problem.index
                if(firstsubmap.has(problemname)===false){
                    firstsubmap.set(problemname,res[i].verdict)
                }
                if(submap.has(problemname)){
                    a=submap.get(problemname)
                    if(res[i].verdict==="OK"){
                        if(a[0]===0){
                            if(a[1]+1>maxsub){
                                maxsub=a[1]+1
                            }
                        }
                        a[0]+=1
                    }
                    else{
                        a[1]+=1
                    }
                    submap.set(problemname,a)
                }
                else{
                    var a=[0,0]
                    if(res[i].verdict==="OK"){
                        if(a[0]===0){
                            if(a[1]+1>maxsub){
                                maxsub=a[1]+1
                            }
                        }
                        a[0]+=1
                    }
                    else{
                        a[1]+=1
                    }
                    submap.set(problemname,a)
                }
            }
            
            for(var key of submap.keys()){
                tried+=1
                var a=submap.get(key)
                if(a[0]>0){
                    solved+=1
                }
                sub+=a[0]
                sub+=a[1]
                if(firstsubmap.get(key)==="OK"){
                    onesub+=1
                }
            }
            var unsolved=tried-solved
            callback(undefined,{
                tried:tried,
                solved:solved,
                sub:sub,
                maxsub:maxsub,
                onesub:onesub,
                unsolved:unsolved
            })
        }
    })
}

module.exports={
    langmap,
    SubCount
}
