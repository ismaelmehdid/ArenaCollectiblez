interface RarityBlockProps {
  title: string;
  chance: number;
  color: string;
  borderColor: string;
}

export const RarityBlock = ({
  title,
  chance,
  color,
  borderColor,
}: RarityBlockProps) => {
  return (
    <div
      className={`relative bg-gradient-to-br ${color} p-4 rounded-lg border ${borderColor} hover:scale-105 transition-all duration-300 hover:shadow-lg`}
    >
      <div className="absolute inset-0 bg-white/5 rounded-lg"></div>
      <div className="relative space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-white/80 uppercase tracking-wider">
            {title}
          </span>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-white">{chance}%</div>
          <div className="w-full bg-black/20 rounded-full h-1.5 mt-2">
            <div
              className="bg-white/60 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, chance * 2)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
