import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';

export default function CheckboxIcon() {
  return (
    <svg
      width={`${CustomSize(18)}`}
      height={`${CustomSize(18)}`}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.375"
        y="0.375"
        width="17.25"
        height="17.25"
        fill="#D4AF37"
        stroke="#D4AF37"
        strokeWidth="0.75"
      />
      <g clipPath="url(#clip0_3003_2)">
        <path
          d="M4.75 8.58L7.58 11.41L13.25 5.75"
          stroke="#762128"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_3003_2">
          <rect width="10" height="8" fill="white" transform="translate(4 5)" />
        </clipPath>
      </defs>
    </svg>
  );
}
