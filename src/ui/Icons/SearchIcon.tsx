import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import { ICustomIconProps } from '@/types/interface/icons.interface';

export default function SearchIcon({ IconColor, IconHeight, IconWidth }: ICustomIconProps) {
  return (
    <svg
      width={IconWidth || `${CustomSize(15)}`}
      height={IconHeight || `${CustomSize(15)}`}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.9837 18.9837L15.0602 15.0602M17.1756 9.94329C17.1756 13.9376 13.9376 17.1756 9.94329 17.1756C5.94897 17.1756 2.71094 13.9376 2.71094 9.94329C2.71094 5.94897 5.94897 2.71094 9.94329 2.71094C13.9376 2.71094 17.1756 5.94897 17.1756 9.94329Z"
        stroke={IconColor || '#10212B'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
