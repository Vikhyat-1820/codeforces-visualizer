// const { response } = require("express")


const inputform=document.querySelector('#inputform')
const handle1=document.querySelector('#handle1')
const handle2=document.querySelector('#handle2')
const ratingcompare=document.querySelector('#ratingcompare')

function compDate(d1,d2){
    var date1=new Date(parseInt(d1))
    var date2=new Date(parseInt(d2))
    
    console.log(date2)
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
                console.log(error)
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
            const ratingchange1=data.ratingchange
            console.log(ratingchange1)
            var len1=ratingchange1.length
            var maxratingchange1=0,minratingchange1=1000,p=1500
            for(i=1;i<len1;i+=1){
                console.log(ratingchange1[i][1])
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
                    var ratingchange2=data.ratingchange
                    var len2=ratingchange2.length
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
                })
            })
        })
    })
    fetch('http://localhost:3000/userRank?search=' + user1).then((response) => {
        response.json().then((data) => {
            const maxRank1=data.maxRank
            const minRank1=data.minRank
            fetch('http://localhost:3000/userRank?search=' +  user2).then((response) => {
                response.json().then((data) => {
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

                })
            })
        })
    })
    fetch('http://localhost:3000/ratingchange?search='+ user1).then((response) => {
        response.json().then((data) => {
            const ratingchange1=data.ratingchange
            fetch('http://localhost:3000/ratingchange?search='+ user2).then((response) => {
                response.json().then((data) => {
                    const ratingchange2=data.ratingchange
                    var i=1
                    var j=1
                    var combinedRatingChange=[['Time',user1,user2]]
                    while(i<ratingchange1.length && j<ratingchange2.length){
                        const h=compDate(ratingchange1[i][0],ratingchange2[j][0])
                        if(h===0){
                            combinedRatingChange.push([new Date(parseInt(ratingchange1[i][0])),ratingchange1[i][1],ratingchange2[j][1]])
                            i+=1
                            j+=1
                        }
                        else if(h===-1){
                            if(j===1)combinedRatingChange.push([new Date(parseInt(ratingchange1[i][0])),ratingchange1[i][1],null])
                            else combinedRatingChange.push([new Date(parseInt(ratingchange1[i][0])),ratingchange1[i][1],ratingchange2[j-1][1]])
                            i+=1
                        }
                        else{
                            if(i===1)combinedRatingChange.push([new Date(parseInt(ratingchange2[j][0])),null,ratingchange2[j][1]])
                            else combinedRatingChange.push([new Date(parseInt(ratingchange2[j][0])),ratingchange1[i-1][1],ratingchange2[j][1]])
                            j+=1
                        }
                    }
                    while(i<ratingchange1.length){
                        combinedRatingChange.push([new Date(parseInt(ratingchange1[i][0])),ratingchange1[i][1],null])
                        i+=1
                    }
                    while(j<ratingchange2.length){
                        combinedRatingChange.push([new Date(parseInt(ratingchange2[j][0])),null,ratingchange2[j][1]])
                        j+=1
                    }
                    function ratingChart() {
                        var data = google.visualization.arrayToDataTable(combinedRatingChange);
                
                        var options = {
                          title: 'Company Performance',
                          legend: { position: 'bottom' }
                        };
                
                        var chart = new google.visualization.LineChart(document.getElementById('RatingChart'));
                
                        chart.draw(data, options);
                    }
                    google.charts.load('current', {'packages':['corechart']});
                    google.charts.setOnLoadCallback(ratingChart);
                
                })
            })
        })
    })
})

