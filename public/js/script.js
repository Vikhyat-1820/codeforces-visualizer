
const form=document.querySelector('form')
const search = document.querySelector('input')

const message1=document.querySelector('#notfindmsg')

const langpiechart=document.querySelector('#langpiechart')
const ratinghist=document.querySelector('#ratinghist')
const diffchart=document.querySelector('#diffchart')
const tagchart=document.querySelector('#tagchart')





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
                tagchart.textContent=''

            }
            else{
                var langarr=data.langarr
                var ratingarr=data.ratingarr
                var diffarr=data.diffarr
                var tagarr=data.tagarr
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
                        bar: {groupWidth: "50%"},
                        legend: { position: "none" },
                        backgroundColor:'white',
                        color:['red'],
                        hAxis:{gridlines:{color:'red',minSpacing:40,count:0},slantedText:true,textPosition:'out',slantedTextAngle:60,isStacked:true},
                        vAxis:{gridlines:{color:'red',minSpacing:50,count:0}}


                        
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
                google.charts.load('current', {'packages':['corechart']});
                google.charts.setOnLoadCallback(langdrawChart);
                google.charts.setOnLoadCallback(ratingdrawChart);
                google.charts.setOnLoadCallback(diffdrawChart);
                google.charts.setOnLoadCallback(tagdrawChart);


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
