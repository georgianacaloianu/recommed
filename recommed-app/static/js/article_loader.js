// ============================ LINK - SUMMARY =================================
async function getSummaryArticles() {
    let url = './../static/data/final_link_summary_dictionary.json';

    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

let summPromise = getSummaryArticles();
let summaries = await summPromise;
localStorage.setItem("summaries", JSON.stringify(summaries));

// ============================= LINK - TITLE ===================================
async function getTitleArticles() {
    let url = './../static/data/final_link_title_without_bl_dictionary.json';

    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

let titlePromise = getTitleArticles();
let titles = await titlePromise;
localStorage.setItem("titles", JSON.stringify(titles));

// ============================= LINK - SUBCATEGORY ==============================
async function getSubcategsArticles() {
    let url = './../static/data/final_link_subcategory_without_bl_dictionary.json';

    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

let subcategPromise = getSubcategsArticles();
let subcategs = await subcategPromise;

// ============================= LINK - WORDCOUNT ================================
async function getWordCountArticles() {
    let url = './../static/data/final_link_wordcount_dictionary.json';

    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

let wordcountPromise = getWordCountArticles();
let wordcounts = await wordcountPromise;
localStorage.setItem("wordcounts", JSON.stringify(wordcounts));

// ============================= LINK - SCORE ==================================================
async function getRecommendedArticles() {
    let url = './../static/data/final_link_relevance_score_dictionary.json';

    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

let recommendedsPromise = getWordCountArticles();
let recommendeds = await recommendedsPromise;

// ============================ CURIOSITY SECTION =============================================

// declare curiositiy links
const curiosity_links = [
    'https://www.news-medical.net/health/Milk-Allergy.aspx',
    'https://www.news-medical.net/health/Diagnosis-of-Irritable-Bowel-Syndrome.aspx',
    'https://www.news-medical.net/health/Is-Daytime-Napping-in-Adults-Good-or-Bad.aspx',
    'https://www.news-medical.net/health/Stroke-Prevention.aspx',
    'https://www.news-medical.net/health/What-is-Toothache.aspx'
]

const curiosity_categories = [
    'https://www.news-medical.net/medical-a-z.aspx',
    'https://www.news-medical.net/medical-a-z.aspx?l=i',
    'https://www.news-medical.net/medical-a-z.aspx?l=s',
    'https://www.news-medical.net/medical-a-z.aspx?l=s',
    'https://www.news-medical.net/medical-a-z.aspx?l=t'
]

// set h2 (title of the article) and h3 (summary of the article) for curiosity articles section
let index = 0;
for (const link of curiosity_links) {
    console.log(link); // link
    document.getElementById(`a_curiosity_${index}`).href = link;
    document.getElementById(`h2_curiosity_${index}`).innerHTML = titles[link];
    document.getElementById(`h3_curiosity_${index}`).innerHTML = summaries[link];
    const readingtime = Math.round(wordcounts[link] / 200); // a person reads between 200 and 250 words per minute
    document.getElementById(`curiosity_reading_${index}`).innerHTML = readingtime;
    document.getElementById(`curiosity_subject_${index}`).innerHTML = `Show me more about ${subcategs[link]} →`;
    document.getElementById(`curiosity_subject_${index}`).href = curiosity_categories[index];
    index++;
}
