from crypt import methods
from flask import Flask, render_template, request, jsonify
from monkeylearn import MonkeyLearn # used to make requests to MonkeyLearn API
import json # used to get link - text content mapping stored into a .json file

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")
    # return "Congratulations, it's a web app!"

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/post")
def post():
    return render_template("post.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/demo", methods=['GET', 'POST'])
def demo():
    # save the input data
    input_text = request.form['inputText']
    print(input_text)
    print(input_text.split(" "))
    if len(input_text.split(" ")) < 10: # check for more words
        return ""

    # call MonkeyLearn API for the extraction of keywords-relevance from input text
    ml = MonkeyLearn('bcc76fc09d99c2db0d7b7b9ea126b561efc4d342') # API Key for kixixep808@dilanfa.com
    model_id = 'ex_YCya9nrn'
    # data = ["Elon Musk has shared a photo of the spacesuit designed by SpaceX. This is the second image shared of the new design and the first to feature the spacesuit’s full-body look."]
    data = []
    data.append(input_text)
    result = ml.extractors.extract(model_id, data)
    my_extractions_list = result.body[0]['extractions']

    keyword_relevance_json = {} # key = keyword, value = it`s relevance score inside the data text
    keywords_string_list = ""

    for extract in my_extractions_list:
        keyword_relevance_json[extract['parsed_value']] = extract['relevance']
        keywords_string_list = keywords_string_list + extract['parsed_value'] + ', '
    
    # remove the last comma
    keywords_string_list = keywords_string_list[:-2]

    print(keyword_relevance_json)

    # PROBLEMS WITH PERMISSION ON SERVER !
    # # write JSON with keywords-score of relevance mapping of the input data into a single .json file
    # with open('./static/data/input_keywords_dictionary.json', 'w') as f:
    #     json_string = json.dumps(keyword_relevance_json)
    #     f.write(json_string)

    return keywords_string_list

@app.route("/recommend", methods=['GET','POST'])
def recommend():
    # save the keywords_input data
    keywords_input = request.form['keywordsInput']
    print(keywords_input)
    print(keywords_input.split(", "))
    keywords_input_array = keywords_input.split(",")

    # # getting the JSON with ALL article links mapped to their text content from the .json file
    # with open('./static/data/input_keywords_dictionary.json', 'r') as f:
    #     keywords_input_json = json.loads(f.read())
    
    # getting the JSON with ALL article links mapped to their text content from the .json file
    with open('./static/data/final_link_keywords_without_fkw_dictionary.json', 'r') as f:
        link_keywords_json = json.loads(f.read())

    # create list of recommended links to be displayed in RecomMed App
    recommended_links_array = []

    # apply recommendation algorithm
    relevance_json = {}

    for link_article, keywords_article in link_keywords_json.items():
        for keyword_article in keywords_article.keys():
            count_matches = 0
            for keyword_input in keywords_input_array:
                if keyword_input == keyword_article or keyword_input in keyword_article or keyword_article in keyword_input:
                    print('keyword in article: ' + keyword_article)
                    print('keyword in input  : ' + keyword_input)
                    count_matches = count_matches + 1
            if count_matches > 0:    
                print(str(count_matches) + " Matches were found in article: " + link_article + "\n")
                if link_article in relevance_json.keys():
                    relevance_json[link_article] = relevance_json[link_article] + count_matches
                else: 
                    relevance_json[link_article] = count_matches

    # PROBLEMS WITH PERMISSION ON SERVER !
    # # write JSON with keywords-score of relevance mapping of the input data into a single .json file
    # with open('./static/data/final_link_relevance_score_dictionary.json', 'w') as f:
    #     json_string = json.dumps(relevance_json)
    #     f.write(json_string)

    # create list of recommended links to be displayed in RecomMed App
    recommended_links_array = []

    if relevance_json:
        # sort links by relevance score
        sorted_relevance_list = sorted(relevance_json.items(), key=lambda x: x[1], reverse=True)
        for relevant in sorted_relevance_list:
            print(relevant[0] + " with score = " + str(relevant[1]))
            # add link to recommended articles list
            recommended_links_array.append(relevant[0])
        return relevance_json # the view function should return a string, dict or tuple
    else:
        return "Sorry, cannot find some relevant articles!"

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)