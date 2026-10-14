import { ICustomIconProps } from '@/types/interface/icons.interface';

export default function SelectDownIcon({ IconColor, IconHeight, IconWidth }: ICustomIconProps) {
  return (
    <svg
      width={IconWidth || '22'}
      height={IconHeight || '22'}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.2602 8.20312L12.2836 14.1798C11.5777 14.8856 10.4227 14.8856 9.7169 14.1798L3.74023 8.20312"
        stroke={IconColor || 'white'}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
