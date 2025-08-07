interface BadgeProps {
  title: string;
}

const badgeConfig: Record<
  string,
  { textColor: string; bgColor: string; iconColor: string }
> = {
  viewer: {
    textColor: "text-blue-600",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  agent: {
    textColor: "text-green-600",
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
   pending: {
    textColor: "text-amber-600",
    bgColor: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  "on-going": {
    textColor: "text-sky-600",
    bgColor: "bg-sky-100",
    iconColor: "text-sky-600",
  },
  completed: {
    textColor: "text-green-800",
    bgColor: "bg-green-100",
    iconColor: "text-green-800",
  },
  default: {
    textColor: "text-gray-600",
    bgColor: "bg-gray-100",
    iconColor: "text-gray-600",
  },
};

export default function Badge({ title }: BadgeProps) {
  const normalizedKey = Object.keys(badgeConfig).find((key) =>
    title.toLowerCase().includes(key),
  ) ?? "default";

  const { textColor, bgColor, iconColor } = badgeConfig[normalizedKey];

  return (
    <div
      className={`flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full w-fit ${textColor} ${bgColor}`}
    >
      <svg
        className={`w-3 h-3 ${iconColor}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8a8 8 0 1116 0zm-8-3a1 1 0 100 2 1 1 0 000-2zm1 4a1 1 0 10-2 0v3a1 1 0 102 0v-3z"
          clipRule="evenodd"
        />
      </svg>
      {title}
    </div>
  );
}
