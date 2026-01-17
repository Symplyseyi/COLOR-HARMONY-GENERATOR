const button = document.getElementById("generate-colors-btn");

const colorBoxes = [
  document.getElementById("first-color-box"),
  document.getElementById("second-color-box"),
  document.getElementById("third-color-box"),
  document.getElementById("fourth-color-box"),
  document.getElementById("fifth-color-box"),
];

const hexCodes = [
  document.getElementById("first-hex-code"),
  document.getElementById("second-hex-code"),
  document.getElementById("third-hex-code"),
  document.getElementById("fourth-hex-code"),
  document.getElementById("fifth-hex-code"),
];

function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function getContrastColor(hexColor) {
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#FFFFFF"; // WCAG contrast standard for readable text
}

function generateAnalogousColors() {
  const baseHue = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 20) + 70; // High saturation: 70-90%
  const l = Math.floor(Math.random() * 20) + 50; // Medium-High lightness: 50-70% for vibrant colors

  const colors = [];
  for (let i = 0; i < 5; i++) {
    // Shift hue by 30 degrees for each subsequent color to create analogous palette
    const hue = (baseHue + i * 30) % 360;
    colors.push(hslToHex(hue, s, l));
  }
  return colors;
}

function updateUI() {
  const colors = generateAnalogousColors();

  colors.forEach((color, index) => {
    colorBoxes[index].style.backgroundColor = color;
    hexCodes[index].textContent = color;
    hexCodes[index].style.color = getContrastColor(color);
  });
}

button.addEventListener("click", updateUI);

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert(`${text} copied to clipboard!`);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}

hexCodes.forEach((hexCode) => {
  hexCode.addEventListener("click", () => {
    copyToClipboard(hexCode.textContent);
  });
});

// Generate initial colors on load
updateUI();
