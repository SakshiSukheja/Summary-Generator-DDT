/**
 * Formats date strings to DD-MM-YYYY format for DDT Shoot Date and summaries.
 */
export function formatDateToDDMMYYYY(dateStr: string): string {
  if (!dateStr) return '';

  // Handle range like 'YYYY-MM-DD to YYYY-MM-DD'
  if (dateStr.includes(' to ')) {
    const parts = dateStr.split(' to ');
    return `${formatDateToDDMMYYYY(parts[0])} to ${formatDateToDDMMYYYY(parts[1])}`;
  }

  // Handle ISO format 'YYYY-MM-DD'
  const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const [, year, month, day] = isoMatch;
    return `${day}-${month}-${year}`;
  }

  // If already in DD-MM-YYYY format
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
    return dateStr;
  }

  // Try parsing JS date
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    const day = String(parsed.getDate()).padStart(2, '0');
    const month = String(parsed.getMonth() + 1).padStart(2, '0');
    const year = parsed.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return dateStr;
}

/**
 * Converts DD-MM-YYYY format back to YYYY-MM-DD for HTML <input type="date">
 */
export function formatDDMMYYYYToISO(dateStr: string): string {
  if (!dateStr) return new Date().toISOString().split('T')[0];

  if (dateStr.includes(' to ')) {
    return formatDDMMYYYYToISO(dateStr.split(' to ')[0]);
  }

  const ddmmMatch = dateStr.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (ddmmMatch) {
    const [, day, month, year] = ddmmMatch;
    return `${year}-${month}-${day}`;
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }

  return new Date().toISOString().split('T')[0];
}
