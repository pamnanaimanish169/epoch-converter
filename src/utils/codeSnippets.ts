export const getJavaScriptSnippet = (epoch: number, unit: string): string => {
  const multiplier = unit === 'seconds' ? '* 1000' : unit === 'microseconds' ? '/ 1000' : '';
  return `// JavaScript
const epoch = ${epoch};
const date = new Date(epoch${multiplier});
console.log(date.toISOString());
console.log(date.toLocaleString());

// Convert back to epoch
const backToEpoch = Math.floor(date.getTime()${unit === 'seconds' ? ' / 1000' : unit === 'microseconds' ? ' * 1000' : ''});`;
};

export const getPythonSnippet = (epoch: number, unit: string): string => {
  const divider = unit === 'milliseconds' ? ' / 1000' : unit === 'microseconds' ? ' / 1000000' : '';
  return `# Python
from datetime import datetime

epoch = ${epoch}
dt = datetime.fromtimestamp(epoch${divider})
print(dt.strftime('%Y-%m-%d %H:%M:%S'))

# Convert back to epoch
back_to_epoch = int(dt.timestamp()${unit === 'milliseconds' ? ' * 1000' : unit === 'microseconds' ? ' * 1000000' : ''})`;
};

export const getSQLSnippet = (epoch: number, unit: string): string => {
  const conversion = unit === 'milliseconds'
    ? "FROM_UNIXTIME(epoch / 1000)"
    : unit === 'microseconds'
    ? "FROM_UNIXTIME(epoch / 1000000)"
    : "FROM_UNIXTIME(epoch)";

  return `-- SQL (MySQL)
SELECT ${conversion} as datetime_value
FROM your_table
WHERE epoch = ${epoch};

-- PostgreSQL
SELECT to_timestamp(${epoch}${unit === 'milliseconds' ? ' / 1000' : unit === 'microseconds' ? ' / 1000000' : ''})::timestamp;`;
};
