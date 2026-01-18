import { useState, useEffect } from "react";
import { formatDateTimeString } from "../utils/epochUtils";
import { UnixCountdownSEOSection } from "../components/UnixCountdownSEOSection";

interface UnixCountdownProps {
  onCopy: (text: string) => void;
}

export const UnixCountdown = ({ onCopy: _onCopy }: UnixCountdownProps) => {
  const DEFAULT_TIMESTAMP = "1800000000";
  const [countdown, setCountdown] = useState<number>(0);
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>(DEFAULT_TIMESTAMP);
  const [inputError, setInputError] = useState<string | null>(null);
  // Current timestamp being displayed (independent of URL)
  const [currentTimestamp, setCurrentTimestamp] = useState<string>(DEFAULT_TIMESTAMP);

  // Update countdown based on currentTimestamp (independent of URL)
  useEffect(() => {
    if (!currentTimestamp) {
      // Don't show error if no timestamp - just show input field
      setIsValid(true);
      setError(null);
      setTargetDate(null);
      setCountdown(0);
      return;
    }

    // Parse the value as seconds
    const timestampSeconds = parseInt(currentTimestamp, 10);

    if (isNaN(timestampSeconds) || !isFinite(timestampSeconds)) {
      setIsValid(false);
      setError("Invalid timestamp value");
      return;
    }

    // Convert seconds to milliseconds for Date object
    const timestampMs = timestampSeconds * 1000;

    // Check if the timestamp is reasonable (not too far in the past or future)
    const minDate = new Date("1900-01-01").getTime();
    const maxDate = new Date("2100-12-31").getTime();

    if (timestampMs < minDate || timestampMs > maxDate) {
      setIsValid(false);
      setError("Timestamp is out of valid range (1900-2100)");
      return;
    }

    setIsValid(true);
    setError(null);
    const target = new Date(timestampMs);
    setTargetDate(target);

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.floor((timestampMs - now) / 1000);
      setCountdown(isFinite(diff) ? diff : 0);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [currentTimestamp]);

  // Update document title and meta description based on current timestamp
  useEffect(() => {
    if (currentTimestamp) {
      const timestampNum = parseInt(currentTimestamp, 10);
      if (!isNaN(timestampNum) && isFinite(timestampNum)) {
        const formattedValue = timestampNum.toLocaleString();
        const title = `Countdown to Unix Time ${formattedValue} | Unix Timestamp Countdown`;
        const description = targetDate
          ? `Live countdown to Unix timestamp ${formattedValue} seconds (${formatDateTimeString(targetDate, true).replace(" UTC", " GMT")}). See how much time is left until this Unix timestamp.`
          : `Live countdown to Unix timestamp ${formattedValue} seconds. See how much time is left until this Unix timestamp.`;

        // Update document title
        document.title = title;

        // Update meta description
        let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.name = 'description';
          document.head.appendChild(metaDesc);
        }
        metaDesc.content = description;

        // Update Open Graph tags
        let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
        if (!ogTitle) {
          ogTitle = document.createElement('meta');
          ogTitle.setAttribute('property', 'og:title');
          document.head.appendChild(ogTitle);
        }
        ogTitle.content = title;

        let ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
        if (!ogDesc) {
          ogDesc = document.createElement('meta');
          ogDesc.setAttribute('property', 'og:description');
          document.head.appendChild(ogDesc);
        }
        ogDesc.content = description;
      }
    }
  }, [currentTimestamp, targetDate]);


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
    return `Countdown to ${
      currentTimestamp ? parseInt(currentTimestamp, 10).toLocaleString() : ""
    }, ${
      targetDate
        ? formatDateTimeString(targetDate, true).replace(" UTC", " GMT")
        : ""
    }`;
  };

  const handleGo = () => {
    const trimmedValue = inputValue.trim();
    setInputError(null);

    if (!trimmedValue) {
      setInputError("Please enter a timestamp value");
      return;
    }

    const timestampSeconds = parseInt(trimmedValue, 10);
    if (isNaN(timestampSeconds) || !isFinite(timestampSeconds)) {
      setInputError("Invalid timestamp. Please enter a valid number.");
      return;
    }

    // Convert seconds to milliseconds for validation
    const timestampMs = timestampSeconds * 1000;

    // Check if the timestamp is reasonable (not too far in the past or future)
    const minDate = new Date("1900-01-01").getTime();
    const maxDate = new Date("2100-12-31").getTime();

    if (timestampMs < minDate || timestampMs > maxDate) {
      setInputError("Timestamp is out of valid range (1900-2100)");
      return;
    }

    // Check if the timestamp is in the past (would result in negative countdown)
    const now = Date.now();
    if (timestampMs < now) {
      const targetDate = new Date(timestampMs);
      const formattedDate = formatDateTimeString(targetDate, true).replace(" UTC", " GMT");
      setInputError(
        `This timestamp is in the past (${formattedDate}). Please enter a future timestamp for a countdown.`
      );
      return;
    }

    // All validations passed, update the countdown (without changing URL)
    setCurrentTimestamp(trimmedValue);
    setInputError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleGo();
    }
  };

  // Show error state only if there's an actual error (not just missing timestamp)
  if (!isValid && error && currentTimestamp) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Countdown to Unix time {currentTimestamp || "N/A"}
        </h1>
        <div className="border-2 border-red-300 dark:border-red-700 rounded-lg p-4 sm:p-6 bg-red-50 dark:bg-red-900/20">
          <p className="text-red-600 dark:text-red-400 font-medium">
            {error || "Invalid timestamp value"}
          </p>
          <p className="text-sm text-red-500 dark:text-red-500 mt-2">
            Please provide a valid Unix timestamp in seconds (e.g., 1733832800)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 transition-colors">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        Countdown to Unix time{" "}
        {currentTimestamp ? parseInt(currentTimestamp, 10).toLocaleString() : ""}
      </h1>

      {/* Main Countdown Display */}
      {currentTimestamp && targetDate ? (
        <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4 sm:p-6 mb-6 bg-gray-50 dark:bg-gray-800 overflow-hidden">
          <div className="text-center space-y-4">
            <div className="text-base sm:text-lg font-medium text-gray-700 dark:text-gray-300 break-words px-1">
              {formatDateTimeString(targetDate, true).replace(" UTC", " GMT")}
            </div>
            <div className="text-xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white font-mono break-all overflow-wrap-anywhere px-1 min-w-0">
              {formatCountdown(countdown)}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 italic break-words px-1">
              {getCountdownLabel(countdown)}
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4 sm:p-6 mb-6 bg-gray-50 dark:bg-gray-800 overflow-hidden">
          <div className="text-center space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Enter a Unix timestamp below to start the countdown
            </p>
          </div>
        </div>
      )}

      {/* Input Section */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Countdown in seconds to any other{" "}
          <span className="text-blue-500 dark:text-blue-400">
            Unix timestamp
          </span>
          :
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              // Clear error when user starts typing
              if (inputError) {
                setInputError(null);
              }
            }}
            onKeyPress={handleKeyPress}
            placeholder="Enter Unix timestamp in seconds (e.g., 1800000000)"
            className={`flex-1 px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent ${
              inputError
                ? "border-red-500 dark:border-red-500 focus:ring-red-500 dark:focus:ring-red-500"
                : "border-gray-300 dark:border-gray-700 focus:ring-blue-500 dark:focus:ring-blue-400"
            }`}
          />
          <button
            onClick={handleGo}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg border border-gray-300 dark:border-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            Go
          </button>
        </div>
        {inputError && (
          <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">
              {inputError}
            </p>
          </div>
        )}
      </div>

      {/* SEO Section */}
      <UnixCountdownSEOSection currentTimestamp={currentTimestamp} />
    </div>
  );
};

export default UnixCountdown;
