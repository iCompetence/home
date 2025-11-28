'use client'

const imgAppScreen = "/442fa427a1570e4dbc7eeb134738344214155c1d.png";
const imgRectangle = "/430a5bd4809c38b60aa4446e81eded777f14bb67.png";

export default function DataGemsAppStore1() {
  return (
    <div className="relative size-full" data-name="Data Gems – App Store 1">
      <div className="absolute flex flex-col font-['SF_Pro:Medium',_sans-serif] font-[510] justify-end leading-none right-[640px] text-[#fffffe] text-[25.298px] text-center top-[283px] tracking-[-0.506px] translate-x-[50%] translate-y-[-100%] w-[940px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className="mb-0">Build your personal profile.</p>
        <p>Directly in the browser extension.</p>
      </div>
      <div className="absolute h-[477px] pointer-events-none rounded-tl-[12.649px] rounded-tr-[12.649px] translate-x-[-50%] translate-y-[-50%] w-[948.867px]" data-name="App screen" style={{ top: "calc(50% + 161.5px)", left: "calc(50% + 0.087px)" }}>
        <div className="absolute inset-0 overflow-hidden rounded-tl-[12.649px] rounded-tr-[12.649px]">
          <img alt="" className="absolute h-[131.6%] left-[-0.86%] max-w-none top-[-5.24%] w-[101.72%]" src={imgAppScreen} />
        </div>
        <div aria-hidden="true" className="absolute border-[16px_16px_0px] border-black border-solid bottom-0 left-[-16px] right-[-16px] rounded-tl-[28.649px] rounded-tr-[28.649px] top-[-16px]" />
      </div>
      <div className="absolute flex flex-col font-['SF_Compact:Regular',_sans-serif] font-[457.9] justify-center leading-[0] right-[22.5px] text-[#04214e] text-[18.974px] text-right top-[44.06px] tracking-[0.1897px] translate-y-[-50%] w-[500px]">
        <p className="leading-[0.9]">The Personal Context Provider for your AI</p>
      </div>
      <div className="absolute flex flex-col font-['SF_Compact:Semibold',_sans-serif] font-[656.2] h-[17.778px] justify-center leading-[0] right-[1196px] text-[#fddadb] text-[18.974px] top-[44.89px] tracking-[0.1897px] translate-x-[100%] translate-y-[-50%] w-[500px]">
        <p className="leading-[0.9]">Data Gems</p>
      </div>
      <div className="absolute left-0 size-[84.327px] top-0" data-name="Rectangle">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle} />
      </div>
    </div>
  );
}