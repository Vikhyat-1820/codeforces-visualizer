



const inputform=document.querySelector('#inputform')
const handle1=document.querySelector('#handle1')
const handle2=document.querySelector('#handle2')
const ratingcompare=document.querySelector('#ratingcompare')

function compDate(d1,d2){
    var date1=new Date(parseInt(d1))
    var date2=new Date(parseInt(d2))
    
    // console.log(date2)
    const year1=date1.getFullYear()
    const year2=date2.getFullYear()
    const day1=date1.getDate()
    const day2=date2.getDate()
    const month1=date1.getMonth()
    const month2=date2.getMonth()
    if(year1===year2){
        if(month1===month2){
            if(day1===day2){
                return 0;
            }
            else{
                if(day1>day2){
                    return 1
                }
                else{
                    return -1
                }
            }
        }
        else{
            if(month1<month2){
                return -1;
            }
            else{
                return 1
            }
        }
    }
    else{
        if(year1<year2){
            return -1;
        }
        else{
            return 1
        }
    }
    return 0;
}

inputform.addEventListener('submit',(e) => {
    e.preventDefault()
    const user1=handle1.value
    const user2=handle2.value
    console.log(user1,user2)
    fetch('http://localhost:3000/usersInfo?search1=' + user1 + '&search2=' + user2).then((response) =>{
        
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
            }
            else{
                const rating1=data.rating1
                const rating2=data.rating2
                const maxRating1=data.maxRating1
                const maxRating2=data.maxRating2
                function ratingCompareChart(){
                    var data = google.visualization.arrayToDataTable([
                        ['Handle', user1, user2],
                        ['Current Rating',rating1, rating2],
                        ['Max Rating', maxRating1,maxRating2]
                    ]);
                    var options = {
                        height:500,
                        width:800,
                        bar: {groupWidth: "10%"},
                        vAxis: {
                            minValue: 0
                          },
                        
                    };
                    var chart = new google.charts.Bar(document.getElementById('ratingcompare'));
                    chart.draw(data, google.charts.Bar.convertOptions(options));
                }
                google.charts.load('current', {'packages':['bar']});
                google.charts.setOnLoadCallback(ratingCompareChart);
                
            }
        })
    })
    fetch('http://localhost:3000/ratingchange?search=' + user1).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
            }
            else{
                const ratingchange1=data.ratingchange
                console.log(ratingchange1)
                var len1=ratingchange1.length
                var maxratingchange1=0,minratingchange1=1000,p=1500
                for(i=1;i<len1;i+=1){
                    // console.log(ratingchange1[i][1])
                    // ratingchange1[i][1]=parseInt(ratingchange1[i][1])
                    if(maxratingchange1<ratingchange1[i][1]-p){
                        maxratingchange1=ratingchange1[i][1]-p;
                    }
                    if(minratingchange1>ratingchange1[i][1]-p){
                        minratingchange1=ratingchange1[i][1]-p;
                    }
                    p=ratingchange1[i][1]

                }
                fetch('http://localhost:3000/ratingchange?search=' + user2).then((response) => {
                    response.json().then((data) => {
                        if(data.error){
                            console.log(data.error)
                        }
                        else{
                            const ratingchange2=data.ratingchange
                            console.log(ratingchange2)
                            var len2=ratingchange2.length;
                            var maxratingchange2=0,minratingchange2=1000,p=1500
                            for(i=1;i<len2;i+=1){
                                if(maxratingchange2<ratingchange2[i][1]-p){
                                    maxratingchange2=ratingchange2[i][1]-p;
                                }
                                if(minratingchange2>ratingchange2[i][1]-p){
                                    minratingchange2=ratingchange2[i][1]-p;
                                }
                                p=ratingchange2[i][1]
                
                            }
                            console.log(maxratingchange1,maxratingchange2,minratingchange1,minratingchange2)
                            function contestCompareChart(){
                                var data = google.visualization.arrayToDataTable([
                                    ['handle','contestCount'],
                                    [user1,len1-1],
                                    [user2,len2-1]
                                ]);
                                var options = {
                                    height:500,
                                    width:400,
                                    bar: {groupWidth: "10%"},
                                    vAxis: {
                                        minValue: 0
                                    },
                                    
                                };
                                var chart = new google.charts.Bar(document.getElementById('contestcompare'));
                                chart.draw(data, google.charts.Bar.convertOptions(options));
                            }
                            function rChangeCompareChart(){
                                var data = google.visualization.arrayToDataTable([
                                    ['handle',user1,user2],
                                    ['Max Up',maxratingchange1,maxratingchange2],
                                    ['Max Down',minratingchange1,minratingchange2]
                                ]);
                                var options = {
                                    height:500,
                                    width:400,
                                    bar: {groupWidth: "10%"},
                                    vAxis: {
                                        minValue: 0
                                    },
                                    
                                };
                                var chart = new google.charts.Bar(document.getElementById('rChangecompare'));
                                chart.draw(data, google.charts.Bar.convertOptions(options));
                            }
                            google.charts.load('current', {'packages':['bar']});
                            google.charts.setOnLoadCallback(contestCompareChart);
                            google.charts.setOnLoadCallback(rChangeCompareChart);
                        }
                    })
                })
            }
        })
    })

    setTimeout(function(){
        console.log("wait")
    },2000)
    fetch('http://localhost:3000/userRank?search=' + user1).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
            }
            else{
                const maxRank1=data.maxRank
                const minRank1=data.minRank
                fetch('http://localhost:3000/userRank?search=' +  user2).then((response) => {
                    response.json().then((data) => {
                        if(data.error){
                            console.log(data.error)
                        }
                        else{
                            const maxRank2=data.maxRank
                            const minRank2=data.minRank
                            function RankTable() {
                                var data = new google.visualization.DataTable();
                                data.addColumn('string', 'Worst and best');
                                data.addColumn('number', user1);
                                data.addColumn('number', user2);
                                data.addRows([
                                ['worst',maxRank1,maxRank2],
                                ['best',minRank1,minRank2],
                                ]);
                        
                                var table = new google.visualization.Table(document.getElementById('RankTable'));
                        
                                table.draw(data, {showRowNumber: true, width: '100%', height: '100%',showRowNumber:false});
                            }
                            google.charts.load('current', {'packages':['table']});
                            google.charts.setOnLoadCallback(RankTable);
                        }

                    })
                })
            }
        })
    })
    fetch('http://localhost:3000/ratingchange?search='+ user1).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
            }
            else{
                const rchange1=data.ratingchange
                fetch('http://localhost:3000/ratingchange?search='+ user2).then((response) => {
                    response.json().then((data) => {
                        if(data.error){
                            console.log(data.error)
                        }
                        else{
                            const ratingchange2=data.ratingchange
                            var i=1
                            var j=1
                            var combinedRatingChange=[['Time',user1,user2]]
                            while(i<rchange1.length && j<ratingchange2.length){
                                const h=compDate(rchange1[i][0],ratingchange2[j][0])
                                if(h===0){
                                    combinedRatingChange.push([new Date(parseInt(rchange1[i][0])),rchange1[i][1],ratingchange2[j][1]])
                                    i+=1
                                    j+=1
                                }
                                else if(h===-1){
                                    if(j===1)combinedRatingChange.push([new Date(parseInt(rchange1[i][0])),rchange1[i][1],null])
                                    else combinedRatingChange.push([new Date(parseInt(rchange1[i][0])),rchange1[i][1],ratingchange2[j-1][1]])
                                    i+=1
                                }
                                else{
                                    if(i===1)combinedRatingChange.push([new Date(parseInt(ratingchange2[j][0])),null,ratingchange2[j][1]])
                                    else combinedRatingChange.push([new Date(parseInt(ratingchange2[j][0])),rchange1[i-1][1],ratingchange2[j][1]])
                                    j+=1
                                }
                            }
                            while(i<rchange1.length){
                                combinedRatingChange.push([new Date(parseInt(rchange1[i][0])),rchange1[i][1],null])
                                i+=1
                            }
                            while(j<ratingchange2.length){
                                combinedRatingChange.push([new Date(parseInt(ratingchange2[j][0])),null,ratingchange2[j][1]])
                                j+=1
                            }
                            function ratingChangeChart() {
                                var data = google.visualization.arrayToDataTable(combinedRatingChange);
                        
                                var options = {
                                title: 'Company Performance',
                                legend: { position: 'bottom' }
                                };
                        
                                var chart = new google.visualization.LineChart(document.getElementById('RatingChangeChart'));
                        
                                chart.draw(data, options);
                            }
                            google.charts.load('current', {'packages':['corechart']});
                            google.charts.setOnLoadCallback(ratingChangeChart);
                        }
                    })
                })
            }
        })
    })
    setTimeout(function(){
        console.log("wait")
    },2000)
    fetch('http://localhost:3000/info?search=' + user1).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
            }
            else{
                const ratingarr1=data.ratingarr
                const diffarr1=data.diffarr
                const tagarr1=data.tagarr
                fetch('http://localhost:3000/info?search=' + user2).then((response) => {
                    response.json().then((data) => {
                        if(data.error){
                            console.log(data.error)
                        }
                        else{
                            const ratingarr2=data.ratingarr
                            const diffarr2=data.diffarr
                            const tagarr2=data.tagarr

                            //Ratingarr
                            var combinedratingarr=[['Rating',user1,user2]]
                            var i=1
                            var j=1
                            while(i<ratingarr1.length && j<ratingarr2.length){
                                if(ratingarr1[i][0]===ratingarr2[j][0]){
                                    combinedratingarr.push([ratingarr2[j][0],ratingarr1[i][1],ratingarr2[j][1]])
                                    i+=1;
                                    j+=1;
                                }
                                else if(ratingarr1[i][0]<ratingarr2[j][0]){
                                    combinedratingarr.push([ratingarr1[i][0],ratingarr1[i][1],0])
                                    i+=1
                                }
                                else{
                                    combinedratingarr.push([ratingarr2[j][0],0,ratingarr2[j][1]])
                                    j+=1;
                                }
                            }
                            while(i<ratingarr1.length){
                                combinedratingarr.push([ratingarr1[i][0],ratingarr1[i][1],0])
                                i+=1
                            }
                            while(j<ratingarr2.length){
                                combinedratingarr.push([ratingarr2[j][0],0,ratingarr2[j][1]])
                                j+=1
                            }
                            function ratingChart() {
                                var data = google.visualization.arrayToDataTable(combinedratingarr);
                        
                                var options = {
                                chart: {
                                    title: 'Rating',
                                }
                                };
                        
                                var chart = new google.charts.Bar(document.getElementById('RatingChart'));
                        
                                chart.draw(data, google.charts.Bar.convertOptions(options));
                            }

                            //diffarr
                            i=1
                            j=1
                            var combineddiffarr=[['Diff',user1,user2]]
                            while(i<diffarr1.length && j<diffarr2.length){
                                if(diffarr1[i][0]===diffarr2[j][0]){
                                    combineddiffarr.push([diffarr1[i][0],diffarr1[i][1],diffarr2[j][1]])
                                    i+=1
                                    j+=1
                                }
                                else if(diffarr1[i][0]<diffarr2[j][0]){
                                    combineddiffarr.push([diffarr1[i][0],diffarr1[i][1],0])
                                    i+=1
                                }
                                else{
                                    combineddiffarr.push([diffarr2[j][0],0,diffarr2[j][1]])
                                    j+=1
                                }
                            }
                            while(i<diffarr1.length){
                                combineddiffarr.push([diffarr1[i][0],diffarr1[i][1],0]);
                                i+=1
                            }
                            while(j<diffarr2.length){
                                combineddiffarr.push([diffarr2[j][0],0,diffarr2[j][1]])
                                j+=1
                            }

                            function diffChart() {
                                var data = google.visualization.arrayToDataTable(combineddiffarr);
                        
                                var options = {
                                chart: {
                                    title: 'Diff',
                                }
                                };
                        
                                var chart = new google.charts.Bar(document.getElementById('DiffChart'));
                        
                                chart.draw(data, google.charts.Bar.convertOptions(options));
                            }



                            //tag chart
                            var tagmap = new Map()
                            i=1
                            while(i<tagarr1.length){
                                tagmap.set(tagarr1[i][0],[tagarr1[i][1],0])
                                i+=1
                            }
                            i=1;
                            while(i<tagarr2.length){
                                if(tagmap.has(tagarr2[i][0])){
                                    var a=tagmap.get(tagarr2[i][0])
                                    a[1]=tagarr2[i][1]
                                    tagmap.set(tagarr2[i][0],a)
                                }
                                else{
                                    tagmap.set(tagarr2[i][0],[0,tagarr2[i][1]])
                                }
                                i+=1
                            }
                            var combinedtagarr=[['Topic',user1,user2]]
                            for(var key of tagmap.keys()){
                                var a=tagmap.get(key)
                                combinedtagarr.push([key,a[0],a[1]])
                            }


                            function tagChart() {
                                var data = google.visualization.arrayToDataTable(combinedtagarr);
                        
                                var options = {
                                chart: {
                                    title: 'Diff',
                                }
                                };
                        
                                var chart = new google.charts.Bar(document.getElementById('TagChart'));
                        
                                chart.draw(data, google.charts.Bar.convertOptions(options));
                            }
                            google.charts.load('current', {'packages':['bar']});
                            google.charts.setOnLoadCallback(ratingChart);
                            google.charts.setOnLoadCallback(diffChart);
                            google.charts.setOnLoadCallback(tagChart);
                        }
                    })
                })
            }
        })
    })
    fetch('http://localhost:3000/conteststat?search=' + user1).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
            }
            else{
                const conteststat1=data.conteststat
                fetch('http://localhost:3000/conteststat?search=' + user2).then((response) => {
                    response.json().then((data) => {
                        if(data.error){
                            console.log(data.error)
                        }
                        else{
                            const conteststat2=data.conteststat
                            var cmap=new Map()
                            for(i=0;i<conteststat1.length;i+=1){
                                cmap.set(conteststat1[i][0],conteststat1[i][1])
                            }
                            var combinedconteststat=[['Contest',user1,user2]]
                            for(i=0;i<conteststat2.length;i+=1){
                                if(cmap.has(conteststat2[i][0])){
                                    var a=cmap.get(conteststat2[i][0])
                                    combinedconteststat.push([conteststat2[i][0],a,conteststat2[i][1]])
                                }
                            }
                            console.log(combinedconteststat)
                            function contestTable() {
                                var data = google.visualization.arrayToDataTable(combinedconteststat);
                                var table = new google.visualization.Table(document.getElementById('ContestTable'));
                        
                                table.draw(data, {showRowNumber: true, width: '100%', height: '100%',showRowNumber:false});
                            }
                            google.charts.load('current', {'packages':['table']});
                            google.charts.setOnLoadCallback(contestTable);

                        }
                    })
                })
            }
        })
    })
    setTimeout(function(){
        console.log("wait")
    },2000)
    fetch('http://localhost:3000/substat?search=' +  user1).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.log(data.error)
            }
            else{
                const tried1=data.tried
                const solved1=data.solved
                const sub1=data.sub
                const maxsub1=data.maxsub
                const onesub1=data.onesub
                const unsolved1=data.unsolved
                fetch('http://localhost:3000/substat?search=' +  user2).then((response) => {
                    response.json().then((data) => {
                        if(data.error){
                            console.log(data.error)
                        }
                        else{
                            const tried2=data.tried
                            const solved2=data.solved
                            const sub2=data.sub
                            const maxsub2=data.maxsub
                            const onesub2=data.onesub
                            const unsolved2=data.unsolved
                            console.log(tried1,tried2)
                            console.log(solved1,solved2)
                            console.log(sub1,sub2)
                            console.log(maxsub1,maxsub2)
                            console.log(onesub1,onesub2)
                            console.log(unsolved1,unsolved2)
                        }
                    })
                })
            }
        })
    })
})

