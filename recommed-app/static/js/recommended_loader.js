// =============================== RECOMMENDATION SECTION =========================================

// recommended_links can be passed through localStorage at success on /recommend response
// const recommended_links = [
//     'https://www.news-medical.net/health/Types-of-Pain.aspx',
//     'https://www.news-medical.net/health/Post-Infectious-Irritable-Bowel-Syndrome.aspx',
//     'https://www.news-medical.net/health/Pain-in-Children.aspx',
//     'https://www.news-medical.net/health/Cancer-Pain-Management.aspx',
//     'https://www.news-medical.net/health/Pain-After-Knee-Replacement-Surgery.aspx'
// ]

function loadRecommendedArticles() {

    const titles = JSON.parse(localStorage.getItem("titles"));
    const summaries = JSON.parse(localStorage.getItem("summaries"));
    const wordcounts = JSON.parse(localStorage.getItem("wordcounts"));
    const recommendeds = JSON.parse(localStorage.getItem("recommendeds"));

    // sort JSON by value
    let sortedArray = []
    for (let link in recommendeds) {
        // push each JSON obj entry in array by [value, key] = [score, link]
        sortedArray.push([recommendeds[link], link]);
    }
    sortedArray = sortedArray.sort(function (a, b) {
        // sort in descending order by article score (value) - meaning the first element in the array
        return b[0] - a[0];
    });

    // only first 5 links to be displayed in RecomMed App
    const recommended_links = [
        sortedArray[0][1],
        sortedArray[1][1],
        sortedArray[2][1],
        sortedArray[3][1],
        sortedArray[4][1]
    ];

    // set h2 (title of the article) and h3 (summary of the article) for recommended articles section
    let index = 0;
    for (const link of recommended_links) {
        console.log(link); // link
        document.getElementById(`a_recommended_${index}`).href = link;
        document.getElementById(`h2_recommended_${index}`).innerHTML = titles[link];
        document.getElementById(`h3_recommended_${index}`).innerHTML = summaries[link];
        const readingtime = Math.round(wordcounts[link] / 200); // a person reads between 200 and 250 words per minute
        document.getElementById(`recommended_reading_${index}`).innerHTML = readingtime;
        index++;
    }
}

function loadMoreRecommendends() {
    // TBD
}
