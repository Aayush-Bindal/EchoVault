import re
import asyncio
from transformers import pipeline

# Load the RoBERTa model fine-tuned for emotions
emotion_analyzer = pipeline(
    "text-classification",
    model="SamLowe/roberta-base-go_emotions",
    return_all_scores=True,
)


async def analyze_emotion(conversation):
    """
    Analyze the emotion in a text asynchronously
    Args:
        text (str): Text to analyze
    Returns:
        dict: Emotion analysis data with scores for different emotions
    """
    # Split conversation into sentences
    sentences = re.split(r"[.?!]", conversation.strip())
    # Remove any empty sentences (if conversation ends with a dot)
    sentences = [sentence for sentence in sentences if sentence]

    # Create tasks for analyzing each sentence concurrently
    tasks = []
    for sentence in sentences:
        tasks.append(analyze_sentence(sentence))

    # Gather all results
    emotion_list = await asyncio.gather(*tasks)
    return calculate_average_emotions(emotion_list)


async def analyze_sentence(sentence):
    """
    Analyze a single sentence asynchronously
    """
    # Run the model inference in an executor to avoid blocking the event loop
    # This is necessary because the transformers pipeline is not natively async
    result = await asyncio.get_event_loop().run_in_executor(
        None, lambda: emotion_analyzer(sentence)
    )
    return {sentence: result[0]}


def calculate_average_emotions(emotion_list):
    """
    Calculate the average score for each emotion across all analyzed sentences

    Args:
        emotion_list (list): List of dictionaries containing emotion analysis results

    Returns:
        dict: Average scores for each emotion across all sentences
    """
    # Initialize counters and accumulators
    emotion_totals = {}
    sentence_count = len(emotion_list)

    # Process each sentence
    for sentence_data in emotion_list:
        # Get the first (and only) key from the dictionary
        sentence = list(sentence_data.keys())[0]
        # Get the emotion scores for this sentence
        emotions = sentence_data[sentence]

        # Add each emotion's score to our running totals
        for emotion in emotions:
            label = emotion["label"]
            score = emotion["score"]

            if label in emotion_totals:
                emotion_totals[label] += score
            else:
                emotion_totals[label] = score

    # Calculate averages
    emotion_averages = {
        emotion: score / sentence_count for emotion, score in emotion_totals.items()
    }

    # Sort emotions by average score (highest first)
    sorted_emotions = dict(
        sorted(emotion_averages.items(), key=lambda item: item[1], reverse=True)
    )

    return sorted_emotions
