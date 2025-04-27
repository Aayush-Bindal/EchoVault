# Use official Python 3.13 slim image
FROM python:3.13-slim

# Set working directory inside container
WORKDIR /app

# Install system dependencies if needed (optional for now)
RUN apt-get update && apt-get install -y \
    ffmpeg \
    gcc \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first and install them (faster docker caching)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

# Copy everything else
COPY . .

# Set environment variable for Google credentials
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/secrets/speech-to-text.json

# Expose the Django port
EXPOSE 8000

# Run migrations and start server (optional you can change CMD)
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
