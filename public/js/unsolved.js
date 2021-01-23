

const unsolvedform=document.querySelector('#unsolvedform')
const frominput=document.querySelector('#from')
const toinput=document.querySelector('#to')
const userinput=document.querySelector('#userinput')

const unsolvedlist=document.getElementById('unsolvedList')
const notfoundmessage=document.querySelector('#notfoundmessage')
const nfm=document.getElementById('notfoundmessage')
const usl=document.querySelector('#unsolvedList')

unsolvedform.addEventListener('submit',(e) => {
    e.preventDefault()
    const user=userinput.value
    console.log(user)
    const from=frominput.value
    const to=toinput.value
    
    fetch('http://localhost:3000/unsolvedproblem?search='+ user + '&from=' + from + '&to=' + to).then((response) => {
        response.json().then((data) => {
            if(data.error){
                notfoundmessage.textContent=data.error
                nfm.style.visibility="visible" 
                usl.textContent=''  
            }
            else{
                nfm.style.visibility="hidden"  
                unsolvedproblem=data.unsolvedproblem
                usl.textContent='' 
                for(var p in unsolvedproblem){
                    var prob=unsolvedproblem[p]
                    var a=prob.split('+')
                    var contestid=a[0]
                    var problem=a[1]
                    const url="https://codeforces.com/contest/" + contestid + "/problem/" + problem
                    $('#unsolvedList').append(
                        '<div class="col-md-3 col-lg-3 text-center" ><a href="' + url + '" target="_blank"><div class="unsolvedlink">' + contestid + problem + '</div></a></div>'
                    )
                }
                console.log(unsolvedproblem)
            }
        })
    })
})