/**
 * Date formatting utility functions
 * Provides consistent date formatting across the application
 */

/**
 * Format a date to a readable string
 * @param {Date} date - The date to format
 * @param {string} format - The format to use (default: 'full')
 * @returns {string} - Formatted date string
 */
const formatDate = (date, format = 'full') => {
  if (!date) return '';
  
  const d = new Date(date);
  
  // Return empty string for invalid date
  if (isNaN(d.getTime())) return '';
  
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  
  switch (format) {
    case 'short':
      return `${day}/${month}/${year}`;
    case 'time':
      return `${hours}:${minutes}`;
    case 'datetime':
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    case 'iso':
      return d.toISOString();
    case 'full':
    default:
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
  }
};

/**
 * Get relative time string (e.g., "2 days ago")
 * @param {Date} date - The date to format
 * @returns {string} - Relative time string
 */
const getRelativeTimeString = (date) => {
  if (!date) return '';
  
  const d = new Date(date);
  
  // Return empty string for invalid date
  if (isNaN(d.getTime())) return '';
  
  const now = new Date();
  const diffTime = Math.abs(now - d);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  
  if (diffDays > 30) {
    return formatDate(date, 'short');
  } else if (diffDays > 0) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  } else if (diffHours > 0) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffMinutes > 0) {
    return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return 'Just now';
  }
};

module.exports = {
  formatDate,
  getRelativeTimeString
};
