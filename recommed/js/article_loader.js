// ============================ LINK - TEXT CONTENT ===========================
async function getFullArticles() {
    let url = '../data/test_link_content_dictionary.json';

    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

let artPromise = getFullArticles();
let articles = await artPromise;
// console.log(articles); // {link1: content1, link2: content2, ...}
// console.log(typeof(articles)); // object

// for (const link in articles) {
//     console.log(link); // link
//     console.log(articles[link]) // content
// }

// ============================ LINK - SUMMARY =================================
async function getSummaryArticles() {
    let url = '../data/final_link_summary_dictionary.json';

    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

let summPromise = getSummaryArticles();
let summaries = await summPromise;

// ============================= LINK - TITLE ===================================
async function getTitleArticles() {
    let url = '../data/final_link_title_without_bl_dictionary.json';

    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

let titlePromise = getTitleArticles();
let titles = await titlePromise;

// declare curiositiy links
const curiosity_links = [
    'https://www.news-medical.net/health/Milk-Allergy.aspx',
    'https://www.news-medical.net/health/Diagnosis-of-Irritable-Bowel-Syndrome.aspx',
    'https://www.news-medical.net/health/Is-Daytime-Napping-in-Adults-Good-or-Bad.aspx',
    'https://www.news-medical.net/health/Stroke-Prevention.aspx',
    'https://www.news-medical.net/health/What-is-Toothache.aspx'
]

// set h2 (title of the article) and h3 (summary of the article) for curiosity articles section
let index = 0;
for (const link of curiosity_links) {
    console.log(link); // link
    document.getElementById(`h2_curiosity_${index}`).innerHTML = titles[link];
    if (summaries[link]) {
        document.getElementById(`h3_curiosity_${index}`).innerHTML = summaries[link];
    } else {
        console.log("Summary for this article is not available!");
        document.getElementById(`h3_curiosity_${index}`).innerHTML = "Summary for this article is not available!";
    }
    index++;
}

// document.getElementById("h2_curiosity_0").innerHTML = "Milk Allergy";
// document.getElementById("h3_curiosity_0").innerHTML = summaries[curiosity_links[0]];

// if click on title of the curiosity article
function gotoArticleLink(articleId) {
    console.log(curiosity_links[articleId]);
}

const recommended_links = [
    'https://www.news-medical.net/health/Types-of-Pain.aspx',
    'https://www.news-medical.net/health/Post-Infectious-Irritable-Bowel-Syndrome.aspx',
    'https://www.news-medical.net/health/Pain-in-Children.aspx',
    'https://www.news-medical.net/health/Cancer-Pain-Management.aspx',
    'https://www.news-medical.net/health/Pain-After-Knee-Replacement-Surgery.aspx'
]

// set h2 (title of the article) and h3 (summary of the article) for curiosity articles section
let indexRec = 0;
for (const link of recommended_links) {
    console.log(link); // link
    document.getElementById(`h2_recommended_${indexRec}`).innerHTML = titles[link];
    if (summaries[link]) {
        document.getElementById(`h3_recommended_${indexRec}`).innerHTML = summaries[link];
    } else {
        console.log("Summary for this article is not available!");
        document.getElementById(`h3_recommended_${indexRec}`).innerHTML = "Summary for this article is not available!";
    }
    indexRec++;
}

// if click on title of the recommended article
function gotoArticleRecLink(articleId) {
    console.log(recommended_links[articleId]);
}

// TODO: Verify if all articles have 10 keywords max, because some of them needs to be deleted (dr. x OR too long and irelevant - most of them links !!)