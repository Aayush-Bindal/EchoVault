import os
from google.cloud.speech import SpeechClient, RecognitionConfig, RecognitionAudio

client = SpeechClient()


def speech_to_text(audio_file_path) -> str:
    """
    Convert speech in an audio file to text

    Args:
        audio_file_path (str): Path to the audio file

    Returns:
        str: Transcribed text
    """
    text = ""
    if not os.path.exists(audio_file_path):
        raise FileNotFoundError("Audio file not found")

    with open(audio_file_path, "rb") as audio_file:
        content = audio_file.read()
    audio = RecognitionAudio(content=content)

    # Configure recognition settings (sample_rate_hertz set to 16000)
    config = RecognitionConfig(
        encoding=RecognitionConfig.AudioEncoding.LINEAR16,  # Ensure this matches your WAV file
        sample_rate_hertz=16000,  # Use 16000 Hz after resampling
        language_code="en-US",
        enable_automatic_punctuation=True,
    )

    # Make the synchronous recognize request
    response = client.recognize(config=config, audio=audio)

    # Print the transcription
    for result in response.results:
        text = text + result.alternatives[0].transcript

    return text
