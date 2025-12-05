import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Clock } from "lucide-react";
import {
  formatDateTimeString,
} from "../utils/epochUtils";

interface CountdownProps {
  onCopy: (text: string) => void;
}

export const Countdown = ({ onCopy: _onCopy }: CountdownProps) => {
  // Y2038 problem: January 19, 2038 03:14:07 UTC (2^31 - 1 = 2,147,483,647 seconds)
  const Y2038_TIMESTAMP = 2147483647;
  // Year 2100 limit: January 1, 2100 00:00:00 UTC = 4102444800 seconds
  const YEAR_2100_TIMESTAMP = 4102444800;
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Validate timestamp is within safe integer range and year 2100 limit
  const isValidTimestamp = (epoch: number): boolean => {
    // Check if it's a valid number
    if (isNaN(epoch) || !isFinite(epoch)) return false;
    
    // Check if it's within JavaScript's safe integer range
    if (epoch > Number.MAX_SAFE_INTEGER) return false;
    
    // Check if it's positive
    if (epoch < 0) return false;
    
    // Check if it's within year 2100 limit
    if (epoch > YEAR_2100_TIMESTAMP) return false;
    
    // Check if the resulting date is valid (treat as seconds)
    const targetMs = epoch * 1000;
    const target = new Date(targetMs);
    return !isNaN(target.getTime());
  };

  // Get target from URL params or use default
  // Only use URL params if explicitly set (not on initial page load/refresh)
  const getTargetFromUrl = (params: URLSearchParams, isInitialLoad: boolean = false): number => {
    if (isInitialLoad) {
      // On initial load/refresh, always default to Y2038
      return Y2038_TIMESTAMP;
    }
    const targetParam = params.get("target");
    if (targetParam && targetParam.trim() !== "") {
      // Parse as integer, handling edge cases
      const parsed = parseInt(targetParam.trim(), 10);
      if (!isNaN(parsed) && isValidTimestamp(parsed)) {
        return parsed;
      }
    }
    return Y2038_TIMESTAMP;
  };

  const initialTarget = getTargetFromUrl(searchParams, true);
  const [targetEpoch, setTargetEpoch] = useState<number>(initialTarget);
  const [inputValue, setInputValue] = useState<string>(initialTarget.toString());
  const [countdown, setCountdown] = useState<number>(0);
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [error, setError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const isInternalUpdate = useRef(false);
  const lastSyncedUrlValue = useRef<string | null>(searchParams.get("target"));
  const processingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with URL params when they change (e.g., browser back/forward)
  // This only runs when searchParams changes, not when targetEpoch changes
  useEffect(() => {
    const currentUrlTarget = searchParams.get("target");
    
    // Skip if we just updated the URL ourselves
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      lastSyncedUrlValue.current = currentUrlTarget;
      return;
    }

    // Only sync if URL actually changed externally (not from our own update)
    if (currentUrlTarget !== lastSyncedUrlValue.current) {
      lastSyncedUrlValue.current = currentUrlTarget;
      const targetFromUrl = getTargetFromUrl(searchParams, false);
      setTargetEpoch(targetFromUrl);
      setInputValue(targetFromUrl.toString());
      // Scroll to top when URL changes
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchParams]);

  // Update URL when target changes (but skip if we're syncing from URL)
  useEffect(() => {
    const currentTarget = searchParams.get("target");
    const targetStr = targetEpoch.toString();
    
    // Only update URL if it's different
    if (targetStr !== currentTarget) {
      isInternalUpdate.current = true;
      lastSyncedUrlValue.current = targetStr;
      setSearchParams({ target: targetStr }, { replace: true });
    }
  }, [targetEpoch, searchParams, setSearchParams]);

  // Scroll to top on mount and when target changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Reset processing state when target actually changes
    setIsProcessing(false);
  }, [targetEpoch]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (processingTimeoutRef.current) {
        clearTimeout(processingTimeoutRef.current);
      }
    };
  }, []);

  // Calculate countdown and target date
  // Always treat input as seconds for countdown (not milliseconds/microseconds)
  useEffect(() => {
    // For countdown, always treat as seconds regardless of length
    // Check for potential overflow before multiplication
    if (targetEpoch > Number.MAX_SAFE_INTEGER / 1000) {
      setError("Timestamp too large for calculation");
      setTargetDate(null);
      setCountdown(0);
      return;
    }

    const targetMs = targetEpoch * 1000;

    // Validate the timestamp is within reasonable range (up to year 2100)
    if (targetEpoch > YEAR_2100_TIMESTAMP) {
      setError("Timestamp exceeds year 2100 limit");
      setTargetDate(null);
      setCountdown(0);
      return;
    }

    // Check if date is valid
    const target = new Date(targetMs);
    if (isNaN(target.getTime()) || !isFinite(targetMs)) {
      setError("Invalid Unix timestamp");
      setTargetDate(null);
      setCountdown(0);
      return;
    }

    setError("");
    setTargetDate(target);

    const updateCountdown = () => {
      const now = Date.now();
      // Check for edge case where calculation might overflow
      if (!isFinite(targetMs) || !isFinite(now)) {
        setCountdown(0);
        return;
      }
      const diff = Math.floor((targetMs - now) / 1000);
      // Handle edge case where diff might be Infinity
      setCountdown(isFinite(diff) ? diff : 0);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetEpoch]);

  const handleGo = () => {
    // Prevent rapid clicks - if already processing, ignore
    if (isProcessing) {
      return;
    }

    const cleaned = inputValue.replace(/\s/g, "").trim(); // Remove spaces and trim
    
    // Validate: check for empty input
    if (cleaned === "") {
      setError("Please enter a timestamp");
      return;
    }

    // Validate: only allow numeric characters
    if (!/^\d+$/.test(cleaned)) {
      setError("Please enter only numeric characters");
      return;
    }

    // Validate: check for numbers that are too large for safe integer handling
    if (cleaned.length > 15) {
      setError("Number is too large. Maximum safe value is 9,007,199,254,740,991");
      return;
    }

    const epoch = parseInt(cleaned, 10);

    if (isNaN(epoch) || !isFinite(epoch)) {
      setError("Please enter a valid number");
      return;
    }

    // Validate: check safe integer range
    if (epoch > Number.MAX_SAFE_INTEGER) {
      setError(`Number exceeds safe integer limit (max: ${Number.MAX_SAFE_INTEGER.toLocaleString()})`);
      return;
    }

    // Validate: limit to year 2100
    if (epoch > YEAR_2100_TIMESTAMP) {
      setError(`Timestamp exceeds year 2100 limit (max: ${YEAR_2100_TIMESTAMP.toLocaleString()})`);
      return;
    }

    // Validate: must be positive
    if (epoch < 0) {
      setError("Please enter a positive number");
      return;
    }

    // Validate: check if resulting date is valid
    const targetMs = epoch * 1000;
    const target = new Date(targetMs);
    if (isNaN(target.getTime())) {
      setError("Invalid Unix timestamp - resulting date is invalid");
      return;
    }

    // Set processing state to prevent rapid clicks
    setIsProcessing(true);
    setError("");

    // Clear any existing timeout
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
    }

    // Update state directly - this will trigger URL update via useEffect
    setTargetEpoch(epoch);
    
    // Scroll to top - use requestAnimationFrame to ensure it happens after render
    // Also try immediate scroll as fallback
    window.scrollTo({ top: 0, behavior: "smooth" });
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Reset processing state after a short delay to allow state updates to complete
    // This prevents rapid clicks while still allowing legitimate updates
    processingTimeoutRef.current = setTimeout(() => {
      setIsProcessing(false);
    }, 300);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleGo();
    }
  };

  const formatCountdown = (seconds: number): string => {
    return seconds.toLocaleString();
  };

  const getCountdownLabel = (seconds: number): string => {
    if (seconds < 0) {
      return `Time since ${
        targetDate
          ? formatDateTimeString(targetDate, true).replace(" UTC", " GMT")
          : ""
      }`;
    }
    return `Countdown to ${targetEpoch.toLocaleString()}, ${
      targetDate
        ? formatDateTimeString(targetDate, true).replace(" UTC", " GMT")
        : ""
    }`;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Clock className="w-6 h-6 text-blue-500" />
        Countdown to Unix Time {targetEpoch.toLocaleString()}
        {targetEpoch === Y2038_TIMESTAMP && (
          <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-2">
            (Y2038 Problem)
          </span>
        )}
      </h1>

      {/* Main Countdown Display */}
      <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-6 mb-6 bg-gray-50 dark:bg-gray-800">
        {targetDate && (
          <div className="text-center space-y-4">
            <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {formatDateTimeString(targetDate, true).replace(" UTC", " GMT")}
            </div>
            <div className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white font-mono">
              {formatCountdown(countdown)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 italic">
              {getCountdownLabel(countdown)}
            </div>
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 dark:text-red-400">
            {error}
          </div>
        )}
      </div>

      {/* Lorem Ipsum Section */}
      <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-6 mb-6 bg-gray-50 dark:bg-gray-800">
        <p className="text-gray-700 dark:text-gray-300">
          Countdown to{" "}
          <a
            href="https://blog.epoch-tools.com/posts/unix-timestamp/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200"
          >
            Unix Time
          </a>{" "}
          2,147,483,647 shows the exact seconds left until the critical Year
          2038 “Epochalypse” moment, when many 32‑bit Unix systems will no
          longer be able to represent time correctly. This page provides a live,
          always‑on{" "}
          <a
            href="https://en.wikipedia.org/wiki/Year_2038_problem"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200"
          >
            “countdown to Unix time”
          </a>{" "}
          timer targeting 2038‑01‑19 03:14:07 UTC, so developers and curious
          users can see precisely how long remains before this historic
          rollover.
          <br />
          Alongside the countdown, brief explanations of{" "}
          <a
            href="https://blog.epoch-tools.com/posts/unix-timestamp/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200"
          >
            Unix Time
          </a>{" "}
          and the Epochalypse help visitors understand why this single timestamp
          matters for legacy software, embedded devices, and infrastructure
          planning.
          <br />
        </p>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Countdown in seconds to any other Unix timestamp:
        </h2>

        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value;
              // Only allow numeric characters and spaces (for formatting)
              const cleaned = value.replace(/[^\d\s]/g, "");
              setInputValue(cleaned);
              setError("");
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter Unix timestamp"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleGo}
            disabled={isProcessing}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isProcessing ? "Processing..." : "GO"}
          </button>
        </div>

        {error && (
          <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
        )}

      </div>
    </div>
  );
};

export default Countdown;
