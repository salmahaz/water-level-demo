import Box from "./Box";

interface VoucherCardProps {
  current: number;
  total: number;
  orderType: string;
  voucherCode: string;
}

export default function VoucherCard({
  current,
  total,
  orderType,
  voucherCode,
}: VoucherCardProps) {
  const percentage = Math.min((current / total) * 100, 100);
  const unlocked = current >= total;


  const voucherTitle = `Get Free ${orderType=== "refill" ? "Water Refill" : "Tank Cleaner"} `;
  const voucherSubtitle = unlocked
    ? `Voucher unlocked! Use this code below 👇`
    : `Order ${total} water ${orderType}s & win 1 free`;

  return (
    <Box>
      <div>
        <h2 className="text-lg font-bold text-primary">{voucherTitle}</h2>
        <p className="text-sm text-gray-500">{voucherSubtitle}</p>
      </div>

      <div>
        <div className="flex justify-between items-center">
          <div className="text-sm font-semibold text-gray-700">
            {current}/{total}
          </div>
          <span className="text-sm font-semibold text-gray-600">Yeey 🎉</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2 text-sm font-medium text-gray-700">
        Your Voucher:
        <span className="font-bold tracking-wider">
          {unlocked ? (
            <span className="text-gray-900 select-all">{voucherCode}</span>
          ) : (
            <>
              <span className="text-gray-900">
                {orderType === "refill" ? "WR" : "TC"}-
              </span>
              <span className="text-gray-400 blur-sm select-none pointer-events-none">
                {"*".repeat(8)}
              </span>
            </>
          )}
        </span>
      </div>
    </Box>
  );
}
