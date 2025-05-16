/**
 * dateUtils.js
 * Utility functions for date formatting and manipulation
 * Uses date-fns library for consistent date handling
 */

import { format } from 'date-fns';
import { it } from 'date-fns/locale'; // Import Italian locale for date formatting

/**
 * Format a date string into a human-readable format in Italian
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {string} Formatted date string (e.g., "15 Gennaio 2023")
 * 
 * If the date is invalid, returns the original string to prevent errors
 */
export const formatDate = (dateString) => {
  try {
    return format(new Date(dateString), 'dd MMMM yyyy', { locale: it });
  } catch (error) {
    return dateString;
  }
};
