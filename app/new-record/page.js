"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React, { useState, useEffect, useRef } from "react";
import { SiteHeader } from "@/components/site-header";

const Record = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleRecording = async () => {
    if (!isRecording) {
      // Start Recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            setAudioChunks((prev) => [...prev, e.data]);
          }
        };

        recorder.start();
        setMediaRecorder(recorder);
        setAudioChunks([]);
        setRecordingTime(0);
        setIsRecording(true);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    } else {
      // Stop Recording
      if (mediaRecorder) {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach((track) => track.stop()); // Close the microphone access
      }
      setIsRecording(false);

      // After a small delay to ensure `ondataavailable` fires
      setTimeout(() => {
        sendAudioToBackend();
      }, 500);
    }
  };

  const sendAudioToBackend = () => {
    const blob = new Blob(audioChunks, { type: "audio/wav" });

    const formData = new FormData();
    formData.append("file", blob, "recording.wav");

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Audio uploaded successfully!");
        } else {
          console.error("Failed to upload audio.");
        }
      })
      .catch((error) => {
        console.error("Error uploading audio:", error);
      });
  };

  return (
    <SidebarProvider className="bg-transparent dark">
      <AppSidebar variant="inset" className="bg-transparent" />
      <SidebarInset className="bg-transparent dark">
        <SiteHeader />
        <div className="flex flex-col items-center justify-center w-full h-full bg-zinc-900 p-4 font-sans py-56">
          {/* Your full JSX like before, no change needed */}
          <div className="flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-zinc-800/80 mb-6">
            <div className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse"></div>
            <span className="text-zinc-300 text-sm font-medium">
              Ready to Record
            </span>
          </div>

          <div
            className={`relative flex flex-col items-center justify-center p-6 ${
              isRecording ? "bg-zinc-800/30 rounded-2xl" : ""
            }`}
          >
            <button
              onClick={toggleRecording}
              className={`relative flex items-center justify-center w-32 h-32 rounded-full bg-zinc-800 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 ${
                isRecording
                  ? "focus:ring-fuchsia-500 shadow-lg shadow-fuchsia-500/30"
                  : "focus:ring-teal-500 shadow-lg shadow-teal-500/30"
              }`}
            >
              <div
                className={`absolute inset-0 rounded-full ${
                  isRecording
                    ? "bg-fuchsia-500/10 animate-pulse shadow-[0_0_15px_5px_rgba(217,70,219,0.4)]"
                    : "bg-teal-500/10 animate-pulse shadow-[0_0_15px_5px_rgba(20,184,166,0.4)]"
                }`}
              ></div>
              {isRecording ? (
                <div className="w-8 h-8 rounded-sm bg-white"></div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-12 h-12 text-white"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" x2="12" y1="19" y2="22"></line>
                </svg>
              )}
            </button>

            <div className="mt-6 text-center">
              <h2 className="text-2xl font-medium text-white mb-2">
                {isRecording ? "Recording..." : "Ready to Record"}
              </h2>

              {isRecording && (
                <div className="text-3xl font-mono tracking-wider text-white mb-4 font-semibold">
                  {formatTime(recordingTime)}
                </div>
              )}

              <p className="text-zinc-400 text-center max-w-md mb-2">
                {isRecording
                  ? "Your voice is being captured. Click the button again to stop recording."
                  : "Click the microphone button to start recording your voice journal entry."}
              </p>
              <p className="text-zinc-400 text-center max-w-md">
                Your voice entry will be securely stored in your vault
              </p>
              <p className="text-zinc-400 text-center max-w-md mt-4">
                Use the microphone button to start and stop recording
              </p>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Record;
