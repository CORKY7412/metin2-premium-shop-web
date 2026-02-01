import { Button } from "../../common/Button"

export const Header = ({}) => {
    return (
        <div className="bg-transparent shadow-[0_1px_2px_#662d12] text-[#f2e69f] pl-5 pr-12 py-1.5">

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 h-10">

            <div className="md:col-span-1">
              <div className="flex gap-3">
                <div className="metin-logo w-44 items-center"></div>
                
                <div className="flex flex-col text-[0.857em] justify-center">
                  <span>
                    <i className="fa-solid fa-user mr-1.5" />
                    <p className="inline-block"><b><u>ArpyAge</u></b></p>
                  </span>

                  <span>
                    <i className="fa-solid fa-earth-europe mr-1.5"></i>
                    <p className="inline-block">LowLevel</p>
                  </span>
                </div>
              </div>
              
            </div>

            <div className="md:col-span-2 flex justify-end items-center">
              <div className="flex flex-col text-[0.857em]">
                
                  <span>
                    <p className="inline-block">5</p>
                  </span>

                  <span>
                    <p className="inline-block">1</p>
                  </span>
                </div>
                
              <Button title="Gambeln" className="base-green-btn min-w-40 uppercase h-8 ml-7" />
              
            </div>
          </div>


        </div>
    )
}