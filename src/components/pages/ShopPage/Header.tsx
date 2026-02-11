import { Link } from "react-router-dom";
import { Button } from "../../common/Button";
import { Icon } from "../../common/Icon";
import { useCart } from "../../../context/CartContext";
import { useUser } from "../../../context/UserContext";

export const Header = () => {
  const { getTotalItems } = useCart();
  const { drBalance } = useUser();
  const totalItems = getTotalItems();

  return (
    <div className="bg-transparent shadow-[0_1px_2px_#662d12] text-[#f2e69f] px-3 sm:px-4 md:px-5 md:pr-12 py-1.5 sm:py-2">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 h-10 sm:h-12">
        <div className="md:col-span-1">
          <div className="flex gap-1.5 sm:gap-2 md:gap-3">
            <div className="metin-logo w-full sm:w-32 md:w-44 items-center shrink-0"></div>

            <div className="flex flex-col text-[0.7em] sm:text-[0.8em] md:text-[0.857em] justify-center invisible sm:visible">
              <span className="whitespace-nowrap">
                <Icon icon="user" className="mr-1 sm:mr-1.5" />
                <p className="inline-block"><b><u>ArpyAge</u></b></p>
              </span>

              <span className="whitespace-nowrap">
                <Icon icon="earth-europe" className="mr-1 sm:mr-1.5" />
                <p className="inline-block">LowLevel</p>
              </span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end items-center gap-2 sm:gap-3 md:gap-4">
          <div className="flex items-center gap-1 sm:gap-1.5 invisible sm:visible">
            <Icon icon="coins" className="text-[#e8a314] text-base sm:text-lg" />
            <span className="text-[#f2e69f] text-xs sm:text-sm font-bold whitespace-nowrap">
              {drBalance} DR
            </span>
          </div>

          <Link to="/cart" className="relative">
            <button className="text-[#f2e69f] hover:text-[#e8a314] transition-colors relative">
              <Icon icon="shopping-cart" className="text-xl sm:text-2xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e8a314] text-[#3c1e16] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#662d12]">
                  {totalItems}
                </span>
              )}
            </button>
          </Link>

          <Link to="/tombola">
            <Button title="Gambeln" className="base-green-btn min-w-20 sm:min-w-28 md:min-w-40 uppercase h-7 sm:h-8 text-xs sm:text-sm md:text-base" />
          </Link>
        </div>
      </div>
    </div>
  );
};