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
    return emotion_list


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
