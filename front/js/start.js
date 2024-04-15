async function scrape(kw){
    
    //Makes a request to the API to perform web scraping
    let url = "http://localhost:3000/api/scrape?keyword="+kw
    console.log(url)
    let response = await fetch(url)

    //Checks if the response from the API request is successful
    if (response.ok) {
        /*processes the JSON data received from the response and generates HTML markup for each
          product contained in the JSON*/
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

        //Displays the result div in the HTML.
        const unhide_div = document.getElementById('result')
        unhide_div.removeAttribute('hidden')
        
        $("#result").html(result)
        console.log(json)
    } else {
        alert("HTTP-Error: " + response.status)
    }
}    