async function scrape(kw){
    let url = "http://localhost:3000/api/scrape?keyword="+kw
    console.log(url)
    let response = await fetch(url)

    if (response.ok) {
        let json = await response.json()
        let result = ""
        for (let i=0;i<json.length;++i){
            result+="<div class=''>"+json[i].title+"</div>"
        }

        $("#result").html(result)
        console.log(json)
    } else {
        alert("HTTP-Error: " + response.status)
    }
}    