const request=require('request')

const langmap=(user,callback) => {
    const url="https://codeforces.com/api/user.status?handle=" +user + "&from=1"
    
    request({url,json:true},(error,response) => {
        if(error){
            callback("Unable to connect to the network",undefined)
        }
        else if(response.body.status==="FAILED"){
            callback("Unable to find the user",undefined)
        }
        else{
            const res=response.body.result
            const size=response.body.result.length
            var lang = new Map();
            var rating = new Map();
            var diff =new Map();
            var tag = new Map();
            var sub=new Map();
            var verd=new Map();
            for(i=0;i<size;i++){
                if(res[i].verdict==='OK'){
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
                    if(rating.has(r)==true){
                        var a=rating.get(r)
                        a+=1
                        rating.set(r,a)
                    }
                    else{
                        rating.set(r,1)
                    }
                    var d=res[i].problem.index;
                    d=d[0];
                    if(diff.has(d)===true){
                        var a=diff.get(d)
                        a+=1
                        diff.set(d,a)
                    }
                    else{
                        diff.set(d,1)
                    }
                    var t=res[i].problem.tags
                    
                    for(j=0;j<t.length;j+=1){
                        if(tag.has(t[j])){
                            var a=tag.get(t[j]);
                            a+=1
                            tag.set(t[j],a)
                        }
                        else{
                            tag.set(t[j],1)
                        }
                    }

                }
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
            var ratingarr=[['data','value']]
            var diffarr=[['data','value']]
            var tagarr=[['data','value']]
            var verdarr=[['data','value']]
            var subarr=[]
            for (var key of lang.keys()){
                langarr.push([key,lang.get(key)])
            }
            for(var key of rating.keys()){
                ratingarr.push([key,rating.get(key)])
            }
            for(var key of diffmap.keys()){
                diffarr.push([key,diffmap.get(key)])
            }
            for(var key of tag.keys()){
                tagarr.push([key,tag.get(key)])
            }
            for(var key of sub.keys()){
                subarr.push([key,sub.get(key)])
            }
            for(var key of verd.keys()){
                verdarr.push([key,verd.get(key)])
            }
            callback(undefined,{
                langarr:langarr,
                ratingarr:ratingarr,
                diffarr:diffarr,
                tagarr:tagarr,
                subarr:subarr,
                verdarr:verdarr,
            })
        }
    })
}


module.exports=langmap