import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { KeyboardEvent } from 'react';

import { baseUrlMedia } from '@/api/endpoints';
import { COOKIE_SECRET_KEY, HUMAN_READABLE_DATE_TIME_FORMAT } from '@/constant';
import { TEachAirportDataListing } from '@/types/apps/airport-data/index.type';

dayjs.extend(customParseFormat);

/**
 *
 * This helps to only type Alpha Keys
 * @param event KeyboardEvent<HTMLInputElement>
 */
export const handleAlphaKeys = (event: KeyboardEvent<HTMLInputElement>) => {
  const allowedAlphaKeys = Array.from('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  const allowedControlKeys = [
    'Backspace',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
    'Tab',
    'Enter',
    'Space',
    ' ',
  ];

  const isAlphabetic = allowedAlphaKeys.includes(event.key);
  const isControl = allowedControlKeys.includes(event.key);

  if (!isAlphabetic && !isControl) {
    event.preventDefault();
  }
};

/**
 *
 * This helps to only type Number Keys
 * @param event KeyboardEvent<HTMLDivElement>
 */
// export const handlePhoneNumberKeys = (event: KeyboardEvent<HTMLDivElement>) => {
//   const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
//   const allowedControlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

//   const isNumeric = allowedKeys.includes(event.key);
//   const isControl = allowedControlKeys.includes(event.key);

//   if (!isNumeric && !isControl) {
//     event.preventDefault();
//   }
// };

/**
 * This helps to only type Number Keys and allow + for international prefix
 * @param e KeyboardEvent<HTMLInputElement>
 */
export const handlePhoneNumberKeys = (e: KeyboardEvent<HTMLInputElement>) => {
  const allowedKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'Home',
    'End',
  ];
  // Allow Ctrl/Cmd shortcuts (A, C, V, X)
  if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
    return;
  }
  // Allow digits and + for international prefix
  if (/^[0-9+]$/.test(e.key)) {
    return;
  }
  if (allowedKeys.includes(e.key)) {
    return;
  }
  e.preventDefault();
};

/**
 *
 * This helps to only type an Experience Key like 2.5 etc
 * @param event KeyboardEvent<HTMLDivElement>
 */
export const handleExperienceKeys = (event: KeyboardEvent<HTMLDivElement>) => {
  const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const allowedControlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', '.'];

  const isNumeric = allowedKeys.includes(event.key);
  const isControl = allowedControlKeys.includes(event.key);

  if (!isNumeric && !isControl) {
    event.preventDefault();
  }
};

/**
 *
 * This helps to only type Amount Key like 123, 2.5 etc
 * @param event KeyboardEvent<HTMLDivElement>
 */
export const handleAmountKeys = (event: KeyboardEvent<HTMLDivElement>) => {
  const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  const allowedControlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

  const isNumeric = allowedKeys.includes(event.key);
  const isControl = allowedControlKeys.includes(event.key);

  // Allow only one decimal point in the input field
  const isSingleDecimal = event.key === '.' && !event.currentTarget.innerText.includes('.');

  if (!isNumeric && !isControl && !isSingleDecimal) {
    event.preventDefault();
  }
};

/**
 *
 * This helps to only type SSN Number Keys
 * @param event KeyboardEvent<HTMLDivElement>
 */
export const handleSSNNumberKeys = (event: KeyboardEvent<HTMLDivElement>) => {
  const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const allowedControlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', '-'];

  const isNumeric = allowedKeys.includes(event.key);
  const isControl = allowedControlKeys.includes(event.key);

  if (!isNumeric && !isControl) {
    event.preventDefault();
  }
};

export const handleIntegerKeys = (event: KeyboardEvent<HTMLDivElement>) => {
  const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const allowedControlKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];

  const isNumeric = allowedKeys.includes(event.key);
  const isControl = allowedControlKeys.includes(event.key);

  if (!isNumeric && !isControl) {
    event.preventDefault();
  }
};

type TPhoneEmailLinkType = 'tel' | 'mailto';

/**
 *
 * @param type "tel" | "mailto"
 * @param value string
 * @returns The proper link to navigate as per the type
 */
export const phoneEmailLink = (type: TPhoneEmailLinkType, value: string) => {
  const formattedValue = value || '#';

  return type === 'tel' ? `tel:${formattedValue}` : `mailto:${formattedValue}`;
};

/**
 *
 * @param dateString string date
 * @returns This will return the YYYY-MM-DD date value
 */
export const removeTimeFromDate = (dateString: string) => {
  if (dateString?.length > 0) {
    const date = new Date(dateString);

    return date.toISOString().split('T')[0];
  } else {
    return;
  }
};

/**
 *
 * @param time24hr string time
 * @returns This will return the formatted 12 hour clock time
 */
export const convertTo12HourFormatDayjs = (time24hr: string) => {
  const parsed = dayjs(time24hr, 'HH:mm');

  return parsed.isValid() ? parsed.format('hh:mm A') : 'Invalid time';

  // return dayjs(time24hr, "HH:mm").format("hh:mm A");
};

/**
 *
 * @param url Image URL or any URL
 * @returns The URL without baseURL
 */
export const removeBaseUrl = (url: string) => {
  const baseUrl = `${baseUrlMedia}/`;

  return url.replace(baseUrl, '');
};

/**
 *
 * @param minutes take minutes as number
 * @returns The hourly text converted the minute like : "1 hour" etc
 */
export const convertMinutesToTimeString = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  let timeString = '';

  if (hours > 0) {
    timeString += `${hours} hour${hours > 1 ? 's' : ''}`;
  }

  if (remainingMinutes > 0) {
    if (timeString) {
      timeString += ' ';
    }
    timeString += `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
  }

  return timeString;
};

/**
 *
 * @param value The raw string to do in proper case
 * @returns The Proper Case String
 */
export const formatProperCase = (value: string): string => {
  if (value?.trim().length > 0) {
    return value[0].toUpperCase() + value.slice(1).toLowerCase();
  }

  return value ?? '';
};

/**
 *
 * @param param0 pass the date
 * @returns Check the date if valid pass the date otherwise NA
 */
export const validateDateAndShow = (date: string, format = HUMAN_READABLE_DATE_TIME_FORMAT) => {
  if (dayjs(date).isValid()) {
    return dayjs(date).format(format);
  } else {
    return 'NA';
  }
};

// Function to convert hours and minutes to total minutes
export const toMinutes = (hours: number, minutes: number) => hours * 60 + minutes;

export const generateScheduleInterval = ({
  startTime,
  endTime,
}: {
  startTime: string;
  endTime: string;
}) => {
  const GENERATE_SCHEDULE_INTERVAL = [];
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  // Calculate start and end times in minutes
  let currentMinutes = toMinutes(startHours, startMinutes);
  const endMinutesTotal = toMinutes(endHours, endMinutes);

  // Loop until the current time reaches the end time
  while (currentMinutes <= endMinutesTotal) {
    const currentHours = Math.floor(currentMinutes / 60);
    const currentMins = currentMinutes % 60;

    // Format hours and minutes to ensure two digits
    const formattedHours = currentHours.toString().padStart(2, '0');
    const formattedMinutes = currentMins.toString().padStart(2, '0');
    GENERATE_SCHEDULE_INTERVAL.push(`${formattedHours}:${formattedMinutes}`);

    // Increment the time by 30 minutes
    currentMinutes += 30;
  }

  return { GENERATE_SCHEDULE_INTERVAL };
};

export const sanitizeArray = (arr: any[]) => {
  return arr.includes(null) ? [] : arr;
};

// Function for masking

export function maskString(value: string): string {
  if (!value) return '';

  // Check if it's an email
  if (value.includes('@')) {
    const [localPart, domain] = value.split('@');

    // Keep first 4 chars of localPart, mask the rest
    const visible = localPart.slice(0, 4);
    const masked = '*'.repeat(Math.max(localPart.length - 4, 0));

    return `${visible}${masked}@${domain}`;
  }

  // For a phone number
  const last4 = value.slice(-4);
  const masked = '*'.repeat(Math.max(value.length - 4, 0));

  return `${masked}${last4}`;
}

/**
 * Formats a number with comma separation and 2 decimal places.
 * Default locale is 'en-IN' (Indian numbering system: 4,10,000.00).
 * Use 'en-US' for international format (410,000.00).
 */
export const formatNumber = (
  num: number | string | undefined | null,
  options: {
    showCurrency?: boolean;
    currencySymbol?: string;
    locale?: string;
    decimalPlaces?: number;
  } = {},
): string => {
  const {
    showCurrency = false,
    currencySymbol = '$',
    locale = 'en-US',
    decimalPlaces = 2,
  } = options;

  if (num === undefined || num === null) return '0.00';

  const val = typeof num === 'string' ? Number.parseFloat(num) : num;
  if (Number.isNaN(val)) return '0.00';

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(val);

  return showCurrency ? `${currencySymbol}${formatted}` : formatted;
};

/**
 * Converts a given string to Proper Case (Title Case).
 * Example: "hElLo wOrLd" -> "Hello World"
 *
 * @param text The input string to be converted
 * @param replacePattern Optional regex to be replaced
 * @param replaceWith Optional string to replace with
 * @returns The proper cased string, or empty string if input is falsy
 */
export const toProperCase = (
  text: string | undefined | null,
  replacePattern?: RegExp | string,
  replaceWith: string = ' ',
): string => {
  if (!text) return '';
  let processedText = text;
  if (replacePattern !== undefined) {
    processedText = processedText.replace(replacePattern, replaceWith);
  }
  return processedText.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
  );
};

/**
 * Replaces a given pattern in a string and returns the modified string, without modifying the case.
 *
 * @param text The input string to be processed
 * @param replacePattern Optional regex or string to be replaced
 * @param replaceWith Optional string to replace with
 * @returns The processed string, or empty string if input is falsy
 */
export const replacePattern = (
  text: string | undefined | null,
  replacePattern?: RegExp | string,
  replaceWith: string = ' ',
): string => {
  if (!text) return '';
  let processedText = text;
  if (replacePattern !== undefined) {
    processedText = processedText.replace(replacePattern, replaceWith);
  }
  return processedText;
};

/**
 * Formats bytes into a human-readable string.
 * @param bytes Number of bytes.
 * @param decimals Number of decimal places to show.
 * @returns Formatted size string (e.g., "1.23 MB").
 */
export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const getAirportLabel = (airport?: TEachAirportDataListing | string | null): string => {
  if (!airport) return '';
  if (typeof airport === 'string') return airport;
  const codes: string[] = [];
  if (airport.icao) codes.push(airport.icao.toUpperCase());
  if (airport.iata) codes.push(airport.iata.toUpperCase());
  const codeStr = codes.join('/');

  const parts: string[] = [];
  if (codeStr) parts.push(codeStr);
  if (airport.title) parts.push(airport.title);
  if (airport.city?.name) parts.push(airport.city.name);
  if (airport.state?.name) parts.push(airport.state.name);
  if (airport.country?.name) parts.push(airport.country.name);

  return parts.join(', ');
};

// ===============================================================================
// -----------------------  Encryption Functions below----------------------------
// ===============================================================================
const IV = randomBytes(16);

/**
 *
 * Encrypt function using AES
 *
 * @param data Value to Encode
 * @returns Encoded value or empty string if data is invalid
 */
export const encryptData = (data: string): string => {
  if (!data || data.length <= 0) {
    // console.error("Invalid data to encrypt");

    return '';
  }

  try {
    const cipher = createCipheriv('aes-128-cbc', Buffer.from(COOKIE_SECRET_KEY), IV);

    let encrypted = cipher.update(data, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    return `${IV.toString('hex')}:${encrypted}`;
  } catch (error) {
    // console.error("Error during encryption:", error);

    return '';
  }
};

/**
 *
 * Decrypt function using AES
 * @param encryptedData Encrypted value
 * @returns Decoded value or empty string if data is invalid or decryption fails
 */
export const decryptData = (encryptedData: string): string => {
  if (!encryptedData || encryptedData.length <= 0) {
    // console.error("Invalid data to decrypt");

    return '';
  }

  try {
    const [ivHex, encryptedText] = encryptedData.split(':');

    if (!ivHex || !encryptedText) {
      // console.error("Invalid encrypted data format");

      return '';
    }

    const ivBuffer = Buffer.from(ivHex, 'hex');

    const decipher = createDecipheriv('aes-128-cbc', Buffer.from(COOKIE_SECRET_KEY), ivBuffer);

    let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
  } catch (error) {
    // console.error("Error during decryption:", error);

    return '';
  }
};
