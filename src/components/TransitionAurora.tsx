'use client'

import { useState, useEffect } from 'react';

interface TransitionAuroraProps {
  transitionToAurora1?: boolean;
  continuousCycle?: boolean;
}

export default function TransitionAurora({ transitionToAurora1 = false, continuousCycle = false }: TransitionAuroraProps) {
  const [currentState, setCurrentState] = useState(transitionToAurora1); // Initialize with transitionToAurora1

  useEffect(() => {
    if (!continuousCycle) {
      // Set to the desired state when not cycling
      setCurrentState(transitionToAurora1);
      return;
    }

    // Start continuous cycling between Aurora states
    const cycleInterval = setInterval(() => {
      setCurrentState(prev => !prev);
    }, 12000); // Change every 12 seconds

    return () => clearInterval(cycleInterval);
  }, [continuousCycle, transitionToAurora1]);

  // Use currentState for continuous cycling, otherwise use transitionToAurora1 for initial transition
  const isAurora1 = continuousCycle ? currentState : transitionToAurora1;

  // Define colors for both states
  const colors = {
    aurora2: {
      color1: "#31A4AF",
      color2: "#3BC4FE", 
      color3: "#117FA9"
    },
    aurora1: {
      color1: "#D476CD",
      color2: "#E7B092",
      color3: "#C8635D"
    }
  };

  const currentColors = isAurora1 ? colors.aurora1 : colors.aurora2;

  return (
    <div className="relative size-full" data-name="Aurora_Transition">
      <svg
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        style={{ display: 'block' }}
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="filter0_f_2_22" x="-903" y="90" width="3938" height="1533" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="225" result="effect1_foregroundBlur_2_22"/>
          </filter>
          <filter id="filter1_f_2_22" x="-705" y="482" width="3330" height="1202" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_2_22"/>
          </filter>
          <filter id="filter2_f_2_22" x="-550" y="722" width="3030" height="902" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="75" result="effect1_foregroundBlur_2_22"/>
          </filter>
          
          {/* Gradient for main layer */}
          <linearGradient id="paint0_linear_transition" x1="-243.741" y1="926.833" x2="2525.05" y2="585.005" gradientUnits="userSpaceOnUse">
            <stop 
              stopColor={currentColors.color1}
              style={{ transition: 'stop-color 4s ease-in-out' }}
            />
            <stop 
              offset="0.663726" 
              stopColor={currentColors.color1}
              stopOpacity="0.9"
              style={{ transition: 'stop-color 4s ease-in-out' }}
            />
            <stop 
              offset="0.863927" 
              stopColor={currentColors.color1}
              style={{ transition: 'stop-color 4s ease-in-out' }}
            />
          </linearGradient>
          
          {/* Gradient for second layer */}
          <linearGradient id="paint1_linear_transition" x1="-216.956" y1="1149.89" x2="2275.14" y2="859.176" gradientUnits="userSpaceOnUse">
            <stop 
              stopColor={currentColors.color2}
              style={{ transition: 'stop-color 4s ease-in-out' }}
            />
            <stop 
              offset="0.663726" 
              stopColor={currentColors.color2}
              stopOpacity="0.9"
              style={{ transition: 'stop-color 4s ease-in-out' }}
            />
            <stop 
              offset="0.863927" 
              stopColor={currentColors.color2}
              style={{ transition: 'stop-color 4s ease-in-out' }}
            />
          </linearGradient>
          
          {/* Gradient for third layer */}
          <linearGradient id="paint2_linear_transition" x1="-211.956" y1="1239.89" x2="2280.14" y2="949.176" gradientUnits="userSpaceOnUse">
            <stop 
              stopColor={currentColors.color3}
              style={{ transition: 'stop-color 4s ease-in-out' }}
            />
            <stop 
              offset="0.663726" 
              stopColor={currentColors.color3}
              stopOpacity="0.9"
              style={{ transition: 'stop-color 4s ease-in-out' }}
            />
            <stop 
              offset="0.863927" 
              stopColor={currentColors.color3}
              style={{ transition: 'stop-color 4s ease-in-out' }}
            />
          </linearGradient>
          
          <clipPath id="clip0_2_22">
            <rect width="1920" height="1080" fill="white"/>
          </clipPath>
        </defs>

        <g id="Aurora_Transition" clipPath="url(#clip0_2_22)">
          <rect width="1920" height="1080" fill="#012332"/>
          
          {/* Main gradient layer */}
          <g id="Rectangle_109" filter="url(#filter0_f_2_22)">
            <path 
              d="M-453 540C-453 540 -118.345 676.886 130.074 690.337C378.494 703.789 633.243 540 867.422 540C1101.6 540 1322.33 724.361 1626.13 759.176C1929.93 793.991 2585 540 2585 540V1173H-453V540Z" 
              fill="url(#paint0_linear_transition)"
            />
          </g>
          
          {/* Secondary layer */}
          <g id="Rectangle_112" filter="url(#filter1_f_2_22)">
            <path 
              d="M-405 782C-405 782 -104.273 912.182 118.961 924.975C342.195 937.767 571.117 782 781.555 782C991.992 782 1190.34 957.332 1463.34 990.442C1736.34 1023.55 2325 782 2325 782V1384H-405V782Z" 
              fill="url(#paint1_linear_transition)"
            />
          </g>
          
          {/* Third layer */}
          <g id="Rectangle_113" filter="url(#filter2_f_2_22)">
            <path 
              d="M-400 872C-400 872 -152.234 1002.21 71 1015C294.234 1027.79 563.062 915 773.5 915C983.937 915 1166 1024.89 1439 1058C1712 1091.11 2330 872 2330 872V1474H-400V872Z" 
              fill="url(#paint2_linear_transition)"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}