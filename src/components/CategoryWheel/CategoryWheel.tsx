import { useState } from "react";
import "./CategoryWheel.css";

// Color mapping for categories
const categoryColors: Record<string, string> = {
  Mixers: "#D946A6",
  "Private L2s": "#2563EB",
  "Alternative L1s": "#0F172A",
  Obfuscators: "#6B7280",
  "Stealth Addresses": "#1E3A5F",
  "Solana projects": "#14B8A6",
  "Shielded Pools (+DeFi)": "#10B981",
  zkWormholes: "#6366F1",
  Wallets: "#4B5563",
};

interface CategoryWheelProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

function CategoryWheel({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryWheelProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const totalCategories = categories.length;
  const anglePerCategory = 360 / totalCategories;
  const radius = 145;
  const innerRadius = 30;

  const createWedgePath = (index: number) => {
    const startAngle = (index * anglePerCategory - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * anglePerCategory - 90) * (Math.PI / 180);

    const x1 = 150 + radius * Math.cos(startAngle);
    const y1 = 150 + radius * Math.sin(startAngle);
    const x2 = 150 + radius * Math.cos(endAngle);
    const y2 = 150 + radius * Math.sin(endAngle);

    const x3 = 150 + innerRadius * Math.cos(endAngle);
    const y3 = 150 + innerRadius * Math.sin(endAngle);
    const x4 = 150 + innerRadius * Math.cos(startAngle);
    const y4 = 150 + innerRadius * Math.sin(startAngle);

    return `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`;
  };

  const getLabelPosition = (index: number) => {
    const angle = ((index + 0.5) * anglePerCategory - 90) * (Math.PI / 180);
    const labelRadius = (radius + innerRadius) / 2;
    const x = 150 + labelRadius * Math.cos(angle);
    const y = 150 + labelRadius * Math.sin(angle);
    // Rotate text 90 degrees so it reads along the radius (from edge to center)
    let rotation = (index + 0.5) * anglePerCategory + 90;

    // Flip text on the left side of the wheel to keep it readable
    if (rotation > 90 && rotation < 270) {
      rotation = rotation + 180;
    }

    return { x, y, rotation };
  };

  return (
    <div className="category-wheel-container">
      <svg
        className="category-wheel"
        viewBox="0 0 300 300"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
      >
        <defs>
          {categories.map((category) => (
            <filter
              key={`glow-${category}`}
              id={`glow-${category}`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}
        </defs>

        {/* Wheel segments */}
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category;
          const isHovered = hoveredCategory === category;
          const color = categoryColors[category] || "#4B5563";

          return (
            <g key={category}>
              <path
                d={createWedgePath(index)}
                fill={color}
                className={`wheel-segment ${isSelected ? "selected" : ""} ${isHovered ? "hovered" : ""}`}
                onClick={() => onCategoryChange(category)}
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
                style={{
                  opacity: isSelected || isHovered ? 1 : 0.7,
                  cursor: "pointer",
                  filter: isSelected ? `url(#glow-${category})` : "none",
                }}
              />
            </g>
          );
        })}

        {/* Labels */}
        {categories.map((category, index) => {
          const { x, y, rotation } = getLabelPosition(index);
          const displayName = category.replace(" (+DeFi)", "");

          return (
            <text
              key={`label-${category}`}
              x={x}
              y={y}
              className="wheel-label"
              transform={`rotate(${rotation}, ${x}, ${y})`}
              textAnchor="middle"
              dominantBaseline="middle"
              onClick={() => onCategoryChange(category)}
              onMouseEnter={() => setHoveredCategory(category)}
              onMouseLeave={() => setHoveredCategory(null)}
              style={{
                pointerEvents: "none",
                fontSize: totalCategories > 10 ? "8px" : "9px",
              }}
            >
              {displayName}
            </text>
          );
        })}

        {/* Center circle */}
        <circle
          cx="150"
          cy="150"
          r={innerRadius}
          fill="#0F172A"
          stroke="#14B8A6"
          strokeWidth="2"
        />
      </svg>

      {/* Selected category display */}
      {selectedCategory && (
        <div className="selected-category-display">
          <span className="category-label">Selected:</span>
          <span className="category-name">{selectedCategory}</span>
          <button
            className="clear-selection"
            onClick={() => onCategoryChange("")}
            aria-label="Clear selection"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoryWheel;
