import React, { FC } from 'react';
import cl from './Button.module.scss';

type buttonProps = {
  onClick: () => void;
};

export const DeleteButton: FC<buttonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className={cl.deleteButton} title='delete'>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="1280.000000pt"
        height="1280.000000pt"
        viewBox="0 0 1280.000000 1280.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" stroke="none">
          <path
            d="M8753 11805 c-324 -59 -602 -286 -709 -580 -58 -159 -69 -350 -29
-505 74 -286 302 -527 593 -626 542 -186 1123 129 1239 671 11 50 14 106 10
200 -4 114 -9 142 -39 231 -108 318 -383 549 -725 609 -103 18 -242 18 -340 0z"
          />
          <path
            d="M7962 9569 c-283 -37 -571 -190 -747 -396 -35 -41 -281 -405 -547
-809 l-482 -734 -736 0 c-794 0 -803 -1 -908 -54 -61 -31 -124 -94 -154 -154
-19 -39 -23 -63 -23 -142 0 -79 4 -103 23 -142 30 -60 93 -123 154 -154 109
-55 104 -55 1051 -52 l872 3 68 32 c42 20 87 52 120 85 32 33 209 289 462 670
226 340 412 618 415 618 3 0 5 -1639 5 -3642 0 -3461 1 -3646 18 -3700 67
-217 272 -367 504 -368 264 0 490 190 523 440 6 46 10 871 10 2163 l0 2087
240 0 240 0 0 -2123 c0 -2338 -4 -2175 61 -2298 40 -74 137 -168 217 -208 123
-62 251 -76 388 -41 187 48 334 198 373 378 8 39 11 1033 11 3687 l0 3635 245
0 245 0 0 -1375 c0 -1369 0 -1376 21 -1438 52 -155 180 -247 343 -247 184 0
320 119 356 310 14 76 14 2822 -1 2926 -21 153 -93 325 -195 471 -74 105 -235
259 -350 336 -161 107 -320 175 -516 220 -92 21 -110 21 -1168 23 -591 1
-1103 -2 -1138 -7z"
          />
          <path
            d="M3340 6962 c-173 -80 -316 -147 -318 -148 -2 -1 62 -143 142 -315 97
-210 151 -314 161 -314 19 0 625 278 625 287 0 7 -257 565 -281 609 l-14 26
-315 -145z"
          />
          <path
            d="M4200 5809 c-146 -105 -271 -196 -278 -203 -10 -10 25 -66 191 -298
l203 -286 287 205 c195 140 285 209 279 217 -5 6 -95 134 -201 284 -106 149
-198 272 -204 271 -7 0 -131 -86 -277 -190z"
          />
          <path
            d="M1687 5353 c-3 -5 1 -40 9 -78 7 -39 72 -389 144 -780 72 -390 153
-829 180 -975 46 -247 205 -1108 356 -1925 35 -192 81 -439 101 -547 l37 -198
1353 0 c744 0 1353 2 1353 5 0 2 36 197 80 432 45 235 130 690 190 1011 543
2886 570 3029 570 3046 0 14 -31 16 -315 16 l-315 0 -5 -22 c-3 -13 -29 -151
-59 -308 -75 -389 -222 -1159 -306 -1595 -38 -198 -119 -621 -180 -940 -61
-319 -130 -678 -153 -798 l-42 -217 -820 0 -820 0 -359 1918 c-198 1054 -363
1927 -367 1939 -8 22 -8 22 -318 23 -170 0 -312 -3 -314 -7z"
          />
          <path
            d="M3703 4717 c-56 -89 -321 -603 -314 -610 22 -22 605 -327 612 -320
23 23 329 607 322 614 -8 8 -443 243 -555 300 -43 22 -59 26 -65 16z"
          />
        </g>
      </svg>
    </button>
  );
};
