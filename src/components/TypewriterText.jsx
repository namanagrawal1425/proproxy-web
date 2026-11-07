import React, { useState, useEffect } from 'react';

/**
 * TypewriterText
 * Simulates real-time live typing ("likhte hue aaye"):
 * - Supports dual-tone styling: solid dark prefix + vibrant gradient highlight
 * - Types character-by-character with natural cadence
 * - Cycles through signature phrases seamlessly
 * - Features sleek blinking cursor matching the active theme
 */
export default function TypewriterText({ phrases, typingSpeed = 55, pauseDuration = 2800 }) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Normalize phrases into { prefix, highlight }
  const currentItem = typeof phrases[currentPhraseIndex] === 'string'
    ? { prefix: phrases[currentPhraseIndex], highlight: '' }
    : phrases[currentPhraseIndex];

  const prefix = currentItem?.prefix || '';
  const highlight = currentItem?.highlight || '';
  const fullText = prefix + highlight;
  const prefixLen = prefix.length;

  useEffect(() => {
    let timeout;

    if (!isDeleting) {
      if (charCount < fullText.length) {
        timeout = setTimeout(() => {
          setCharCount((prev) => prev + 1);
        }, typingSpeed + (Math.random() * 20));
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (charCount > 0) {
        timeout = setTimeout(() => {
          setCharCount((prev) => prev - 1);
        }, typingSpeed / 2);
      } else {
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charCount, isDeleting, currentPhraseIndex, fullText, phrases, typingSpeed, pauseDuration]);

  const displayedPrefix = fullText.slice(0, Math.min(charCount, prefixLen));
  const displayedHighlight = charCount > prefixLen ? fullText.slice(prefixLen, charCount) : '';

  return (
    <span className="inline-block relative">
      <span className="text-neutral-950 font-bold">{displayedPrefix}</span>
      {displayedHighlight && (
        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
          {displayedHighlight}
        </span>
      )}
      {/* Blinking cursor */}
      <span
        className="inline-block w-[3.5px] sm:w-[4.5px] h-[0.9em] bg-blue-600 align-middle ml-1.5 rounded-sm animate-pulse"
        style={{ animationDuration: '0.8s' }}
        aria-hidden="true"
      />
    </span>
  );
}
