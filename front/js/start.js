async function scrape(kw){
    let url = "http://localhost:3000/api/scrape?keyword="+kw
    console.log(url)
    let response = await fetch(url)

    if (response.ok) {
        let json = await response.json()
        let result = ""
        for (let i=0;i<json.length;++i){
            result+="<img class='product-img' src='"+json[i].image+"'/>"
            result+="<div class='product-title'>"+json[i].title+"</div>"
            result+="<div class='product-rating'>"+json[i].rating+"</div>"
            result+="<div class='product-reviews'>"+json[i].reviews+"</div>"
            result+="<div class='product-price'>"+json[i].price+"</div>"
            console.log(result)

        }

        $("#result").html(result)
        console.log(json)
    } else {
        alert("HTTP-Error: " + response.status)
    }
}    