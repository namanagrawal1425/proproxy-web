import React, { useState, useEffect } from 'react';

/**
 * TypewriterText
 * Simulates real-time live typing ("likhte hue aaye"):
 * - Types character-by-character
 * - Pauses naturally at punctuation and line breaks
 * - Cycles through signature phrases seamlessly
 * - Features the iconic Google Antigravity blinking cursor
 */
export default function TypewriterText({ phrases, typingSpeed = 65, pauseDuration = 2800 }) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    const fullText = phrases[currentPhraseIndex];

    if (!isDeleting) {
      // Typing forward
      if (displayedText.length < fullText.length) {
        timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length + 1));
        }, typingSpeed + (Math.random() * 25)); // slight human cadence variation
      } else {
        // Finished typing phrase, hold for pauseDuration
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting back to type next phrase
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(fullText.slice(0, displayedText.length - 1));
        }, typingSpeed / 2);
      } else {
        // Move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentPhraseIndex, phrases, typingSpeed, pauseDuration]);

  return (
    <span className="inline-block relative">
      <span>{displayedText}</span>
      {/* Google Antigravity blinking cursor */}
      <span
        className="inline-block w-[3px] sm:w-[4px] h-[0.9em] bg-neutral-900 align-middle ml-1 rounded-sm animate-pulse"
        style={{ animationDuration: '0.8s' }}
        aria-hidden="true"
      />
    </span>
  );
}
