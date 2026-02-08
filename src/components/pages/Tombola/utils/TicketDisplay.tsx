import { TOMBOLA_INFO_TEXT } from "../../../../constants/tombolaConstants";

interface TicketDisplayProps {
  ticketCount: number;
}

export const TicketDisplay = ({ ticketCount }: TicketDisplayProps) => {
  return (
    <div className="bg-[rgba(0,0,0,0.3)] p-3 sm:p-4 mb-4 sm:mb-5 border-2 border-[#e8a314] text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <i className="fa-solid fa-ticket text-[#e8a314] text-xl sm:text-2xl" aria-hidden="true"></i>
        <span className="text-[#f2e69f] text-lg sm:text-xl font-bold">
          Verfügbare Tickets: {ticketCount}
        </span>
      </div>
      <p className="text-xs sm:text-sm text-[#f2e69f]">
        {TOMBOLA_INFO_TEXT.dailyTicketsInfo}
      </p>
    </div>
  );
};
