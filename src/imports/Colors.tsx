'use client'

function Caption() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-center justify-start leading-[0] not-italic overflow-clip relative shrink-0 text-[16px] text-nowrap w-[101px]" data-name="Caption">
      <div className="font-['Inter:Bold',_sans-serif] font-bold relative shrink-0 text-[#092c4c]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">Weiß</p>
      </div>
      <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#828282]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">#FCFCFC</p>
      </div>
    </div>
  );
}

function Gray4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-4 items-start justify-start left-[541px] top-0" data-name="Gray 4">
      <div className="bg-[#fcfcfc] h-[100px] rounded-[10px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] shrink-0 w-[101px]" data-name="Box color" />
      <Caption />
    </div>
  );
}

function Caption1() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-center justify-start leading-[0] not-italic overflow-clip relative shrink-0 text-[16px] text-nowrap w-[101px]" data-name="Caption">
      <div className="font-['Inter:Bold',_sans-serif] font-bold relative shrink-0 text-[#092c4c]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">Hellgrau</p>
      </div>
      <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#828282]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">#BEBEBE</p>
      </div>
    </div>
  );
}

function Gray3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-4 items-start justify-start left-[360px] top-0" data-name="Gray 3">
      <div className="bg-[#bebebe] rounded-[10px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] shrink-0 size-[101px]" data-name="Box color" />
      <Caption1 />
    </div>
  );
}

function Caption2() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-center justify-start leading-[0] not-italic overflow-clip relative shrink-0 text-[16px] text-nowrap w-[100px]" data-name="Caption">
      <div className="font-['Inter:Bold',_sans-serif] font-bold relative shrink-0 text-[#092c4c]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">Dunkelgrau</p>
      </div>
      <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#828282]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">#484848</p>
      </div>
    </div>
  );
}

function Gray2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-4 items-start justify-start left-[180px] top-0" data-name="Gray 2">
      <div className="bg-[#484848] rounded-[10px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] shrink-0 size-[100px]" data-name="Box color" />
      <Caption2 />
    </div>
  );
}

function Caption3() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-center justify-start leading-[0] not-italic overflow-clip relative shrink-0 text-[16px] text-center text-nowrap w-[100px]" data-name="Caption">
      <div className="font-['Inter:Bold',_sans-serif] font-bold relative shrink-0 text-[#092c4c]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">Schwarz</p>
      </div>
      <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#828282]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">#0B0B0B</p>
      </div>
    </div>
  );
}

function Gray1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-4 items-center justify-start left-0 top-0" data-name="Gray 1">
      <div className="bg-[#0b0b0b] rounded-[10px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] shrink-0 size-[100px]" data-name="Box color" />
      <Caption3 />
    </div>
  );
}

function Gray() {
  return (
    <div className="absolute h-[167px] left-[365px] top-[1045px] w-[659px]" data-name="Gray">
      <Gray4 />
      <Gray3 />
      <Gray2 />
      <Gray1 />
    </div>
  );
}

function GrayColors() {
  return (
    <div className="absolute contents left-12 top-[1045px]" data-name="Gray Colors">
      <Gray />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[0] left-12 not-italic text-[#828282] text-[32px] text-nowrap top-[1045px]">
        <p className="leading-[35.2px] whitespace-pre">Grautöne</p>
      </div>
    </div>
  );
}

function Caption4() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-center justify-start leading-[0] not-italic overflow-clip relative shrink-0 text-[16px] text-nowrap w-[101px]" data-name="Caption">
      <div className="font-['Inter:Bold',_sans-serif] font-bold relative shrink-0 text-[#092c4c]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">Fehler</p>
      </div>
      <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#828282]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">#C8635D</p>
      </div>
    </div>
  );
}

function StateError() {
  return (
    <div className="absolute content-stretch flex flex-col gap-4 items-start justify-start left-[361px] top-0" data-name="State - Error">
      <div className="bg-[#c8635d] h-[100px] rounded-[10px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] shrink-0 w-[101px]" data-name="Box color" />
      <Caption4 />
    </div>
  );
}

function Caption5() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-center justify-start leading-[0] not-italic overflow-clip relative shrink-0 text-[16px] text-nowrap w-[101px]" data-name="Caption">
      <div className="font-['Inter:Bold',_sans-serif] font-bold relative shrink-0 text-[#092c4c]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">Achtung</p>
      </div>
      <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#828282]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">#E0AE57</p>
      </div>
    </div>
  );
}

function StateWarning() {
  return (
    <div className="absolute content-stretch flex flex-col gap-4 items-start justify-start left-[180px] top-0" data-name="State - Warning">
      <div className="bg-[#e0ae57] rounded-[10px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] shrink-0 size-[101px]" data-name="Box color" />
      <Caption5 />
    </div>
  );
}

function Caption6() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-center justify-start leading-[0] not-italic overflow-clip relative shrink-0 text-[16px] text-nowrap w-[100px]" data-name="Caption">
      <div className="font-['Inter:Bold',_sans-serif] font-bold relative shrink-0 text-[#092c4c]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">Erfolg</p>
      </div>
      <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#828282]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">#76AF77</p>
      </div>
    </div>
  );
}

function StateSuccess() {
  return (
    <div className="absolute content-stretch flex flex-col gap-4 items-start justify-start left-0 top-0" data-name="State - Success">
      <div className="bg-[#76af77] rounded-[10px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] shrink-0 size-[100px]" data-name="Box color" />
      <Caption6 />
    </div>
  );
}

function StateColors() {
  return (
    <div className="absolute h-[167px] left-[365px] top-[814px] w-[657px]" data-name="State Colors">
      <StateError />
      <StateWarning />
      <StateSuccess />
    </div>
  );
}

function StateColors1() {
  return (
    <div className="absolute contents left-12 top-[814px]" data-name="State Colors">
      <StateColors />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[0] left-12 not-italic text-[#828282] text-[32px] text-nowrap top-[814px]">
        <p className="leading-[35.2px] whitespace-pre">Zustände</p>
      </div>
    </div>
  );
}

function Caption7() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-center justify-start leading-[0] not-italic overflow-clip relative shrink-0 text-[16px] text-nowrap w-[100px]" data-name="Caption">
      <div className="font-['Inter:Bold',_sans-serif] font-bold relative shrink-0 text-[#092c4c]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">Akzent 2</p>
      </div>
      <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#828282]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">#E19B74</p>
      </div>
    </div>
  );
}

function StateSuccess1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-4 items-start justify-start left-[544px] top-[584px]" data-name="State - Success">
      <div className="bg-[#e19b74] rounded-[10px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] shrink-0 size-[100px]" data-name="Box color" />
      <Caption7 />
    </div>
  );
}

function Caption8() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-center justify-start leading-[0] not-italic overflow-clip relative shrink-0 text-[16px] text-nowrap w-[100px]" data-name="Caption">
      <div className="font-['Inter:Bold',_sans-serif] font-bold relative shrink-0 text-[#092c4c]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">Akzent 1</p>
      </div>
      <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#828282]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">#31A4AF</p>
      </div>
    </div>
  );
}

function StateInfo() {
  return (
    <div className="absolute content-stretch flex flex-col gap-4 items-center justify-start left-[364px] top-[584px]" data-name="State - Info">
      <div className="bg-[#31a4af] rounded-[10px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] shrink-0 size-[100px]" data-name="Box color" />
      <Caption8 />
    </div>
  );
}

function Group66() {
  return (
    <div className="absolute contents left-12 top-[584px]">
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium leading-[0] left-12 not-italic text-[#828282] text-[32px] text-nowrap top-[584px]">
        <p className="leading-[35.2px] whitespace-pre">Akzent</p>
      </div>
      <StateSuccess1 />
      <StateInfo />
    </div>
  );
}

function Caption9() {
  return (
    <div className="content-stretch flex flex-col gap-1 items-center justify-start leading-[0] not-italic overflow-clip relative shrink-0 text-[16px] text-nowrap w-[100px]" data-name="Caption">
      <div className="font-['Inter:Bold',_sans-serif] font-bold relative shrink-0 text-[#092c4c]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">Akzent 3</p>
      </div>
      <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#828282]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">#D476CD</p>
      </div>
    </div>
  );
}

function StateSuccess2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-4 items-start justify-start left-[724px] top-[584px]" data-name="State - Success">
      <div className="bg-[#d476cd] rounded-[10px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] shrink-0 size-[100px]" data-name="Box color" />
      <Caption9 />
    </div>
  );
}

function Group67() {
  return (
    <div className="absolute contents left-12 top-[584px]">
      <Group66 />
      <StateSuccess2 />
    </div>
  );
}

function Caption10() {
  return (
    <div className="absolute content-stretch flex gap-1 items-center justify-start leading-[0] left-[74px] not-italic overflow-clip text-[16px] text-nowrap top-[323px]" data-name="Caption">
      <div className="font-['Inter:Bold',_sans-serif] font-bold relative shrink-0 text-[#092c4c]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">Primär Dunkel</p>
      </div>
      <div className="font-['Cera_Pro:Regular',_sans-serif] relative shrink-0 text-black">
        <p className="leading-[normal] text-nowrap whitespace-pre">/</p>
      </div>
      <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#828282]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">#012332</p>
      </div>
    </div>
  );
}

function Primary() {
  return (
    <div className="absolute h-[345.98px] left-[365px] top-[174.01px] w-[304px]" data-name="Primary">
      <Caption10 />
      <div className="absolute bg-[#092c4c] h-[307px] left-0 rounded-[10px] shadow-[0px_4px_24px_0px_rgba(9,44,76,0.4)] top-0 w-[304px]" data-name="Box color" />
      <div className="absolute bg-[#012332] h-[307px] left-0 rounded-[10px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] top-0 w-[304px]" data-name="Box color" />
    </div>
  );
}

function Caption11() {
  return (
    <div className="absolute content-stretch flex gap-1 items-center justify-start leading-[0] left-16 not-italic overflow-clip text-[16px] text-nowrap top-[323.02px]" data-name="Caption">
      <div className="font-['Inter:Bold',_sans-serif] font-bold relative shrink-0 text-[#092c4c]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">Primär Hell</p>
      </div>
      <div className="font-['Cera_Pro:Regular',_sans-serif] relative shrink-0 text-black">
        <p className="leading-[normal] text-nowrap whitespace-pre">/</p>
      </div>
      <div className="font-['Inter:Regular',_sans-serif] font-normal relative shrink-0 text-[#828282]">
        <p className="leading-[22.4px] text-nowrap whitespace-pre">#0B99CC</p>
      </div>
    </div>
  );
}

function Secondary() {
  return (
    <div className="absolute h-[346px] left-[733px] top-[174px] w-[304px]" data-name="Secondary">
      <Caption11 />
      <div className="absolute bg-[#0b99cc] h-[307.02px] left-0 rounded-[10px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.25)] top-0 w-[304px]" data-name="Box color" />
    </div>
  );
}

function BrandColors() {
  return (
    <div className="absolute contents left-12 top-[174px]" data-name="Brand Colors">
      <Primary />
      <Secondary />
      <div className="absolute font-['Inter:Medium',_sans-serif] font-medium h-[35.998px] leading-[0] left-12 not-italic text-[#828282] text-[32px] top-[174px] w-[199px]">
        <p className="leading-[35.2px]">Marke</p>
      </div>
    </div>
  );
}

export default function Colors() {
  return (
    <div className="bg-[#fcfcfc] relative size-full" data-name="Colors">
      <GrayColors />
      <StateColors1 />
      <Group67 />
      <BrandColors />
      <div className="absolute font-['Inter:Regular',_sans-serif] font-normal leading-[0] left-12 not-italic text-[#4f4f4f] text-[56px] text-nowrap top-12">
        <p className="leading-[61.6px] whitespace-pre">01. Farben</p>
      </div>
    </div>
  );
}