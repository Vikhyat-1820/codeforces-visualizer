
const userform=document.querySelector('#user')
const userinput = document.querySelector('#userinput')


const notFoundMessage=document.querySelector('#notfoundmessage')
const userRating=document.querySelector('#userRating')
const userRank=document.querySelector('#userRank')
const userMaxRating=document.querySelector('#userMaxRating')
const userMaxRank=document.querySelector('#userMaxRank')
const userRatingH=document.querySelector('#userRatingH')
const userRankH=document.querySelector('#userRankH')
const userMaxRatingH=document.querySelector('#userMaxRatingH')
const userMaxRankH=document.querySelector('#userMaxRankH')
const heatmapText=document.querySelector('#heatmap-text')


const userRatingdiv=document.getElementById('RatingH')
const userRankdiv=document.getElementById('RankH')
const userMaxRatingdiv=document.getElementById('MRating')
const userMaxRankdiv=document.getElementById('MRank')
const heatmapTextdiv=document.getElementById('heatmap-text')




const langpiediv=document.getElementById('langpiechart')
const verdchartdiv=document.getElementById('verdchart')
const ratinghistdiv=document.getElementById('ratinghist')
const diffchartdiv=document.getElementById('diffchart')
const tagchartdiv=document.getElementById('tagchart')
const ratingchangediv=document.getElementById('ratingchange')
const subheatmapdiv=document.getElementById('subheatmap')




userform.addEventListener('submit',(e) => {
    console.log('form called')
    e.preventDefault()
    const user=userinput.value
    fetch('http://localhost:3000/info?search='+ user).then((response) => {
        response.json().then((data) => {
            if(data.error){
                
                document.getElementById('langpiechart').style.display="none"
                document.getElementById('verdchart').style.display="none"
                document.getElementById('ratinghist').style.display="none"
                document.getElementById('diffchart').style.display="none"
                document.getElementById('tagchart').style.display="none"
                document.getElementById('heatmap').style.display="none"
                notFoundMessage.textContent=data.error
            }
            else{
                document.getElementById('langpiechart').style.display="block"
                document.getElementById('verdchart').style.display="block"
                document.getElementById('ratinghist').style.display="block"
                document.getElementById('diffchart').style.display="block"
                document.getElementById('tagchart').style.display="block"
                document.getElementById('heatmap').style.display="block"
                notFoundMessage.textContent=''
                var langarr=data.langarr
                var ratingarr=data.ratingarr
                var diffarr=data.diffarr
                var tagarr=data.tagarr
                var subarr=data.subarr
                var verdarr=data.verdarr
                var heatmaparr=[]
                var minyear=-1;
                var maxyear=-1;
                var heatmapMax=0;
                for(var d in subarr){
                    // console.log(subarr[d])
                    var date=new Date(parseInt(subarr[d][0]))
                    var year=date.toLocaleString("en-US", {year: "numeric"})
                    
                    if(maxyear===-1){
                        maxyear=year
                    }
                    else{
                        maxyear=Math.max(maxyear,year)
                    }
                    if(minyear===-1){
                        minyear=year
                    }
                    else{
                        minyear=Math.min(minyear,year)
                    }
                    heatmapMax=Math.max(heatmapMax,subarr[d][1])
                    heatmaparr.push([new Date(parseInt(subarr[d][0])),subarr[d][1]])
                }
                // console.log(minyear,maxyear)
                // console.log(subarr)
                function langdrawChart(){
                    var data = google.visualization.arrayToDataTable(langarr);
                    var options = {
                        height:$('#langpiechart').width(),
                        'title':'Languages Used', 
                        is3D:true,
                        pieSliceText:'label',
                        fontName: 'Roboto',
                        legend: 'none',
                        fontSize:20,
                    };            
                    console.log(options.height)
                    var chart = new google.visualization.PieChart(document.getElementById('langpiechart'));
                    chart.draw(data, options);
                }
                function ratingdrawChart(){
                    var data = google.visualization.arrayToDataTable(ratingarr);
                    var options = {
                        title: "Rating",
                        height:($('#ratinghist').width())/2,
                        vAxis: { format: '0' },
                        fontSize:20,
                        hAxis:{gridlines:{color:'black',minSpacing:40,count:0},slantedText:true,textPosition:'out',slantedTextAngle:60,isStacked:true},
                    };
                    var chart = new google.visualization.ColumnChart(document.getElementById("ratinghist"));
                    chart.draw(data, options);
                }
                function diffdrawChart(){
                    var data = google.visualization.arrayToDataTable(diffarr);
                    var options = {
                        title: "Levels",
                        height:($('#diffchart').width())/2,
                        bar: {groupWidth: "50%"},
                        legend: { position: "none" },
                        backgroundColor:'white',
                        color:['red'],
                        fontSize:20,
                        hAxis:{gridlines:{color:'red',minSpacing:40,count:0},slantedText:false,textPosition:'out',slantedTextAngle:60,isStacked:true},
                        vAxis:{gridlines:{color:'red',minSpacing:50,count:0}}  
                    };
                    var chart = new google.visualization.ColumnChart(document.getElementById("diffchart"));
                    chart.draw(data, options);
                }
                function tagdrawChart(){
                    var data = google.visualization.arrayToDataTable(tagarr);
                    var options = {
                        title: 'Tags',
                        pieHole: 0.4,
                        height:$('#tagchart').width(),
                        pieSliceText: 'none',
                        sliceVisibilityThreshold:0,
                        fontSize: 20,

                        
                    }         
                    var chart = new google.visualization.PieChart(document.getElementById('tagchart'));
                    chart.draw(data, options);
                }
                function subChart() {
                    console.log(heatmapMax)
                    var dataTable = new google.visualization.DataTable();
                    dataTable.addColumn({ type: 'date', id: 'Date' });
                    dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
                    // console.log(heatmaparr)
                    console.log(heatmaparr)
                    dataTable.addRows(heatmaparr);
                    var chart = new google.visualization.Calendar(document.getElementById('subheatmap'));
                    var options = {
                      title: "",
                      height: (maxyear-minyear+1)*160,
                      noDataPattern: {
                        backgroundColor: 'white',
                        
                      },
                      colorAxis:{
                          minValue:0,
                          maxValue:Math.max(0,(heatmapMax)),
                          colors:['#d3c0f2','#a780e5','#6c2bd4'],
                      },
                      fontSize:20,
                      
                      
                    }
             
                    chart.draw(dataTable, options);
                }
                function verddrawChart(){
                    var data = google.visualization.arrayToDataTable(verdarr);
                    var options = {
                        height:$('#langpiechart').width(),
                        'title':'Verdicts', 
                        is3D:true,
                        pieSliceText:'label',
                        fontName: 'Roboto',
                        legend: 'none',
                        fontSize:20,
                    };            
                    var chart = new google.visualization.PieChart(document.getElementById('verdchart'));
                    chart.draw(data, options);
                }
                google.charts.load('current', {'packages':['corechart']});
                google.charts.load("current", {packages:["calendar"]});
                google.charts.setOnLoadCallback(langdrawChart);
                google.charts.setOnLoadCallback(ratingdrawChart);
                google.charts.setOnLoadCallback(diffdrawChart);
                google.charts.setOnLoadCallback(tagdrawChart);
                google.charts.setOnLoadCallback(subChart);
                google.charts.setOnLoadCallback(verddrawChart);
                heatmapText.textContent='Submission HeatMap'

            }
        })
    })
    fetch('http://localhost:3000/ratingchange?search='+ user).then((response) => {
        response.json().then((data) => {
            if(data.error){
                
                document.getElementById('ratingchange').style.display="none"
                notFoundMessage.textContent=data.error
            }
            else{
                document.getElementById('ratingchange').style.display="block"
                notFoundMessage.textContent=''
                var ratingchange=data.ratingchange
                var ratingchangearr=[]
                for(var d in ratingchange){
                    ratingchangearr.push([new Date(parseInt(ratingchange[d][0])),ratingchange[d][1]])
                }
                // console.log(ratingchangearr)
                // console.log(ratingchange)
                // console.log(ratingchange);
                function ratingchangedrawChart() {
                    var data = google.visualization.arrayToDataTable(ratingchangearr);
                    var options = {
                        title: 'Rating Change',
                        height:$('#ratingchange').width(),
                        explorer: { actions: ['dragToZoom', 'rightClickToReset'] },
                        hAxis:{gridlines:{color:'red',minSpacing:1,count:0}},
                        vAxis:{gridlines:{color:'red',minSpacing:40,count:0}},
                        legend: { position: 'bottom' },
                        aggregationTarget: 'series',
                        fontSize:20,
                    };
                    var chart = new google.visualization.LineChart(document.getElementById('ratingchange'));
                    chart.draw(data, options);
                }
                google.charts.load('current', {'packages':['corechart']});
                google.charts.setOnLoadCallback(ratingchangedrawChart);
            }
        })
    })
    fetch('http://localhost:3000/userinfo?search=' + user).then((response) => {
        response.json().then((data) => {
            if(data.error){
                
                document.getElementById('RatingH').style.display="none"
                document.getElementById('RankH').style.display="none"
                document.getElementById('MRating').style.display="none"
                document.getElementById('MRank').style.display="none"
                notFoundMessage.textContent=data.error
            }
            else{
                document.getElementById('RatingH').style.display="block"
                document.getElementById('RankH').style.display="block"
                document.getElementById('MRating').style.display="block"
                document.getElementById('MRank').style.display="block"
                notFoundMessage.textContent=''

                if(data.rating){
                    userRating.textContent=data.rating
                    userRank.textContent=data.rank
                    userMaxRating.textContent=data.maxrating
                    userMaxRank.textContent=data.maxrank
                }
                else{
                    userRating.textContent='Unrated'
                    userRank.textContent='Unrated'
                    userMaxRating.textContent='Unrated'
                    userMaxRank.textContent='Unrated'
                }
                userRatingH.textContent="Current Rating"
                userRankH.textContent="Current Rank"
                userMaxRatingH.textContent="Max Rating"
                userMaxRankH.textContent="Max Rank"
            }
        })
    })
})

// const unsolvedform=document.querySelector('#unsolved-form')
// const frominput=document.querySelector('#from')
// const toinput=document.querySelector('#to')

// unsolvedform.addEventListener('submit',(e) => {
//     console.log("unsolved form called")
//     e.preventDefault()
//     const from=frominput.value()
//     const to=toinput.value()
//     console.log(from)
//     console.log(to)
// })


// var arr=[]
// fetch('http://localhost:3000/info').then((response) => {
//     response.json().then((data)=>{
//         if(data.error){
//             console.log("error")
//         }
//         else{
//             console.log('doneee')
//             arr=data.arr;
            
//         }
//     })
// })


// function drawChart() {
    
// }




// google.charts.load('current', {'packages':['corechart']});
// google.charts.setOnLoadCallback(drawChart);
