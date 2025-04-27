import re
from transformers import pipeline
from json import dump

# Load the RoBERTa model fine-tuned for emotions
emotion_analyzer = pipeline(
    "text-classification",
    model="SamLowe/roberta-base-go_emotions",
    return_all_scores=True,
)


def analyze_emotion(conversation):
    """
    Analyze the emotion in a text

    Args:
        text (str): Text to analyze

    Returns:
        dict: Emotion analysis data with scores for different emotions
    """
    # In a real implementation, you would use an emotion analysis API or model
    # Examples include:
    # - Custom trained models using transformers (BERT, RoBERTa, etc.)
    # - Sentiment analysis APIs (Google Cloud NLP, Azure Text Analytics, etc.)
    # - Open-source emotion detection libraries

    emotion_list = []
    sentences = re.split(r"[.?!]", conversation.strip())

    # Remove any empty sentences (if conversation ends with a dot)
    sentences = [sentence for sentence in sentences if sentence]

    # Analyze each sentence separately

    for i, sentence in enumerate(sentences, 1):
        user_message = sentence
        result = emotion_analyzer(user_message)
        emotion_list.append({sentence: result[0]})

    return emotion_list


convo = "Woke up late today, kinda lazy morning lol. Had coffee, scrolled Insta for a while. Then rushed to college 'cause I had a project meeting. Afternoon was chill, just hung out with friends at the canteen. Evening was crazy tho — went for a walk and got caught in the rain! 😂 Now just lying in bed, feeling grateful for small moments like these."
data = analyze_emotion(convo)

with open("output.json", "w") as file:
    dump(data, file, indent=4)
