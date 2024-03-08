async function scrape(kw){
    let url = "http://localhost:3000/api/scrape?keyword="+kw
    console.log(url)
    let response = await fetch(url)

    if (response.ok) {
        let json = await response.json()
        let result = "" //<div class='products-container'>
        for (let i=0;i<json.length;++i){
            result+="<div class=''>"+json[i].title+"</div>"
            result+="<div class=''>"+json[i].rating+"</div>"
            result+="<div class=''>"+json[i].reviews+"</div>"
            result+='<img src="'+json[i].image+'>'
        }

        $("#result").html(result)
        console.log(json)
    } else {
        alert("HTTP-Error: " + response.status)
    }
}    