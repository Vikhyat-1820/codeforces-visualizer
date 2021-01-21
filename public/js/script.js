
const form=document.querySelector('form')
const search = document.querySelector('input')

const message1=document.querySelector('#notfindmsg')

const langpiechart=document.querySelector('#langpiechart')
const ratinghist=document.querySelector('#ratinghist')
const diffchart=document.querySelector('#diffchart')
const tagchart=document.querySelector('#tagchart')
const ratingchangegraph=document.querySelector('#ratingchangegraph')
const subheatmap=document.querySelector('#subheatmap')
const verdchart=document.querySelector('#verdchart')



form.addEventListener('submit',(e) => {
    console.log('form called')
    e.preventDefault()
    const user=search.value
    fetch('http://localhost:3000/info?search='+ user).then((response) => {
        response.json().then((data) => {
            if(data.error){
                message1.textContent=data.error
                langpiechart.textContent=''
                ratinghist.textContent=''
                diffchart.textContent=''
                ratingchangegraph.textContent=''
                tagchart.textContent=''
                subheatmap.textContent=''
                verdchart.textContent=''

            }
            else{
                var langarr=data.langarr
                var ratingarr=data.ratingarr
                var diffarr=data.diffarr
                var tagarr=data.tagarr
                var subarr=data.subarr
                var verdarr=data.verdarr
                var heatmaparr=[]
                var minyear=-1;
                var maxyear=-1;
                for(var d in subarr){
                    console.log(subarr[d])
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
                    heatmaparr.push([new Date(parseInt(subarr[d][0])),subarr[d][1]])
                }
                console.log(minyear,maxyear)
                // console.log(subarr)
                function langdrawChart(){
                    var data = google.visualization.arrayToDataTable(langarr);
                    var options = {
                        'title':'Languages Used', 
                        'width':1000, 
                        'height':1000,
                        'is3D': true
                    };            
                    var chart = new google.visualization.PieChart(document.getElementById('langpiechart'));
                    chart.draw(data, options);
                }
                function ratingdrawChart(){
                    var data = google.visualization.arrayToDataTable(ratingarr);
                    var options = {
                        title: "Count of Problem solved for each Rating",
                        width: 1200,
                        height: 400,
                        
                        


                        
                    };
                    var chart = new google.visualization.ColumnChart(document.getElementById("ratinghist"));
                    chart.draw(data, options);
                }
                function diffdrawChart(){
                    var data = google.visualization.arrayToDataTable(diffarr);
                    var options = {
                        title: "Count of Problem solved for each division",
                        width: 1200,
                        height: 400,
                        bar: {groupWidth: "50%"},
                        legend: { position: "none" },
                        backgroundColor:'white',
                        color:['red'],
                        hAxis:{gridlines:{color:'red',minSpacing:40,count:0},slantedText:false,textPosition:'out',slantedTextAngle:60,isStacked:true},
                        vAxis:{gridlines:{color:'red',minSpacing:50,count:0}}


                        
                    };
                    var chart = new google.visualization.ColumnChart(document.getElementById("diffchart"));
                    chart.draw(data, options);
                }
                function tagdrawChart(){
                    var data = google.visualization.arrayToDataTable(tagarr);
                    var options = {
                        width: 1600,
                        height: 700,
                        title: 'Tasks Completed',
                        pieHole: 0.5,
                        
                        pieSliceText: 'value',
                        sliceVisibilityThreshold :0,
                        fontSize: 17,
                        legend: {
                          position: 'labeled'
                        }
                    }         
                    var chart = new google.visualization.PieChart(document.getElementById('tagchart'));
                    chart.draw(data, options);
                }
                function subChart() {
                    var dataTable = new google.visualization.DataTable();
                    dataTable.addColumn({ type: 'date', id: 'Date' });
                    dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
                    // console.log(heatmaparr)
                    dataTable.addRows(heatmaparr);
                    var chart = new google.visualization.Calendar(document.getElementById('subheatmap'));
                    var options = {
                      title: "Submission HeatMap",
                      height: (maxyear-minyear+1)*200,
                    };
             
                    chart.draw(dataTable, options);
                }
                function verddrawChart(){
                    var data = google.visualization.arrayToDataTable(verdarr);
                    var options = {
                        'title':'Verdicts', 
                        'width':1000, 
                        'height':1000,
                        'is3D': true
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


            }
        })
    })
    fetch('http://localhost:3000/ratingchange?search='+ user).then((response) => {
        response.json().then((data) => {
            if(data.error){
                ratingchangegraph.textContent=''
            }
            else{
                var ratingchange=data.ratingchange
                // console.log(ratingchange)
                function ratingchangedrawChart() {
                    var data = google.visualization.arrayToDataTable(ratingchange);
                    var options = {
                        title: 'Company Performance',
                        width:1700,
                        height:700,
                        explorer: { actions: ['dragToZoom', 'rightClickToReset'] },
                        hAxis:{gridlines:{color:'red',minSpacing:40,count:0}},
                        vAxis:{gridlines:{color:'red',minSpacing:20,count:0}},
                        legend: { position: 'bottom' },
                        aggregationTarget: 'series',
                    };
                    var chart = new google.visualization.LineChart(document.getElementById('ratingchange'));
                    chart.draw(data, options);
                }
                google.charts.load('current', {'packages':['corechart']});
                google.charts.setOnLoadCallback(ratingchangedrawChart);
            }
        })
    })
})


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
