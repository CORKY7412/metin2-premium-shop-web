export const RewardInfoBox = () => {
  return (
    <div className="mt-4 sm:mt-5 p-3 sm:p-4 bg-[rgba(0,0,0,0.2)] border border-[#662d12]">
      <h3 className="text-[#e8a314] text-sm sm:text-base mb-2 font-bold">
        <i className="fa-solid fa-gift mr-2"></i>
        Belohnungen beim Kauf
      </h3>
      <ul className="text-xs sm:text-sm text-[#f2e69f] space-y-1">
        <li>
          <strong className="text-[#e8a314]">Garantiert:</strong> Yabbie-Münzen (10% des Kaufpreises)
        </li>
        <li>
          <strong className="text-[#e8a314]">10% Chance:</strong> Tombola-Ticket
        </li>
        <li>
          <strong className="text-[#e8a314]">10% Chance:</strong> DR-Gutschein (10-50 DR)
        </li>
        <li>
          <strong className="text-[#e8a314]">10% Chance:</strong> Zufälliges Bonus-Item
        </li>
      </ul>
    </div>
  );
};
