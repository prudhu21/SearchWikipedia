let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    //create div container for result item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add('result-item');

    searchResultsEl.appendChild(resultItemEl);

    //create anchor title
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";

    resultItemEl.appendChild(resultTitleEl);

    //adding break element
    let titleBreakEl = document.createElement("br");

    resultItemEl.appendChild(titleBreakEl);

    //anchor url
    let urlEl = document.createElement("a");
    urlEl.classList.add("result-url");
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;

    resultItemEl.appendChild(urlEl);

    //adding link break
    let lineBreakEl = document.createElement("br");

    resultItemEl.appendChild(lineBreakEl);

    //adding paragraph description
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-description");
    descriptionEl.textContent = description;

    resultItemEl.appendChild(descriptionEl);


}

function displayResults(searchResult) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResult) //for all search items
        //let result = searchResult[0]; //single search item resullt 
        createAndAppendSearchResult(result);
}

let searchWikipedia = function(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.toggle("d-none"); //toogle means if it present it will be removed otherwise it will be added
        searchResultsEl.textContent = ""; //clearing the previous search results
        let searchInput = searchInputEl.value;

        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
