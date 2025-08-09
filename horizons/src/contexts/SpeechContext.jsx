
import React, { createContext, useContext, useState, useEffect } from 'react';

const SpeechContext = createContext({});

export function SpeechProvider({ children }) {
  const [narrationEnabled, setNarrationEnabled] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState(null);
  const [speaking, setSpeaking] = useState(false);
  const [speechQueue, setSpeechQueue] = useState([]);
  const [lastSpokenTime, setLastSpokenTime] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSpeechSynthesis(window.speechSynthesis);
      const savedSpeechPreference = localStorage.getItem('speechEnabled');
      setNarrationEnabled(savedSpeechPreference === 'true');
    }
  }, []);

  const shouldSpeak = () => {
    const now = Date.now();
    const minDelay = 500; 
    
    if (now - lastSpokenTime < minDelay) {
      return false;
    }
    
    setLastSpokenTime(now);
    return true;
  };

  const speak = (text, priority = false) => {
    if (!narrationEnabled || !speechSynthesis || !text) return;

    if (!shouldSpeak() && !priority) return;

    speechSynthesis.cancel();
    setSpeaking(false);
    setSpeechQueue([]);

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0; 
    utterance.pitch = 1.0; 
    utterance.volume = 1.0; 

    utterance.onstart = () => {
      setSpeaking(true);
    };

    utterance.onend = () => {
      setSpeaking(false);
      if (speechQueue.length > 0) {
        const nextText = speechQueue.shift();
        setSpeechQueue([...speechQueue]);
        speak(nextText);
      }
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setSpeaking(false);
    };

    if (speaking && !priority) {
      setSpeechQueue([...speechQueue, text]);
      return;
    }

    try {
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.error('Failed to speak:', error);
      setSpeaking(false);
    }
  };

  const toggleSpeech = () => {
    const newValue = !narrationEnabled;
    setNarrationEnabled(newValue);
    localStorage.setItem('speechEnabled', newValue.toString());
    
    if (newValue) {
      speak("Narração ativada", true);
    } else {
      speechSynthesis?.cancel();
      setSpeaking(false);
      setSpeechQueue([]);
    }
  };

  const stopSpeech = () => {
    if (speechSynthesis) {
      speechSynthesis.cancel();
      setSpeaking(false);
      setSpeechQueue([]);
    }
  };

  const isNarrationEnabled = () => narrationEnabled;

  return (
    <SpeechContext.Provider value={{ 
      isNarrationEnabled, 
      toggleSpeech, 
      speak,
      stopSpeech,
      speaking 
    }}>
      {children}
    </SpeechContext.Provider>
  );
}

export const useSpeech = () => useContext(SpeechContext);

export const useSpeechHover = (text) => {
  const { speak, isNarrationEnabled } = useSpeech();
  const [lastHoverTime, setLastHoverTime] = useState(0);
  
  const handleMouseEnter = () => {
    if (!isNarrationEnabled() || !text) return;
    
    const now = Date.now();
    const minHoverDelay = 300; 
    
    if (now - lastHoverTime < minHoverDelay) {
      return;
    }
    
    setLastHoverTime(now);
    speak(text);
  };

  return handleMouseEnter;
};
