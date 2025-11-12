// Utility: Debounce function
export function debounce<Func extends (...args: any[]) => void>(func: Func, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<Func>) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

// Improved skin tone mapping using perceived brightness
export const getSkinToneDetails= (hex: string) => {
  if (!hex) return { tone: "Unknown", season: "Unknown", suit: [], color: "#ccc" };

  const bigint = parseInt(hex.replace("#", ""), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

  let tone = "Unknown";
  let season = "Unknown";
  let suit: string[] = [];
  let color = "#ccc";

  if (brightness < 85) {
    tone = "Dark";
    season = "Winter";
    suit = ["Royal Blue", "Emerald Green", "Deep Purple"];
    color = "#4b3832";
  } else if (brightness < 125) {
    tone = "Medium";
    season = "Autumn";
    suit = ["Olive", "Mustard", "Rust Orange"];
    color = "#d2a679";
  } else if (brightness < 160) {
    tone = "Neutral";
    season = "Spring";
    suit = ["Peach", "Turquoise", "Coral"];
    color = "#e0c097";
  } else {
    tone = "Light";
    season = "Summer";
    suit = ["Soft Pink", "Lavender", "Sky Blue"];
    color = "#f2d6cb";
  }

  return { tone, season, suit, color };
};
