const cleanPercentage = (percentage) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0;
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

const Circle = ({ color, fill, opacity, percentage, radius, stroke }) => {
  const circ = 2 * Math.PI * radius;
  const strokePct = ((100 - percentage) * circ) / 100;
  return (
    <circle
      r={radius}
      opacity={opacity}
      cx={100}
      cy={100}
      fill={fill}
      stroke={strokePct !== circ ? color : ""}
      strokeWidth={stroke}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};

const Text = ({ percentage, color, font }) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={font}
      fill={color}
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

export const MovieRating = ({
  percentage,
  color,
  radius,
  stroke,
  svgSize,
  fontSize,
  transform
}) => {
  const pct = cleanPercentage(percentage);
  return (
    <svg width={svgSize} height={svgSize}>
      <g transform={`rotate(-90 ${transform})`}>
        <Circle
          color="#FFFFFF"
          fill="#FFFFFF"
          opacity={0.1}
          radius={radius}
          stroke={stroke}
        />
        <Circle
          color={color}
          percentage={pct}
          fill="transparent"
          opacity={1}
          radius={radius}
          stroke={stroke}
        />
      </g>
      <Text font={fontSize} percentage={pct} color={color} />
    </svg>
  );
};
