import { CustomSize } from '@/components/SIngleComponent/CustomViewSize';
import { CustomIconProps } from '@/types/common/common.schema';

export default function AllLeadIcon({ IconColor, IconHeight, IconWidth }: CustomIconProps) {
  return (
    <svg
      width={IconWidth || `${CustomSize(15)}`}
      height={IconHeight || `${CustomSize(15)}`}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 13.125V11.875C10 11.212 9.73661 10.5761 9.26777 10.1072C8.79893 9.63839 8.16304 9.375 7.5 9.375H3.75C3.08696 9.375 2.45107 9.63839 1.98223 10.1072C1.51339 10.5761 1.25 11.212 1.25 11.875V13.125M10 1.955C10.5361 2.09398 11.0109 2.40704 11.3498 2.84504C11.6887 3.28304 11.8726 3.82118 11.8726 4.375C11.8726 4.92882 11.6887 5.46696 11.3498 5.90496C11.0109 6.34296 10.5361 6.65602 10 6.795M13.75 13.125V11.875C13.7496 11.3211 13.5652 10.783 13.2259 10.3452C12.8865 9.90741 12.4113 9.59473 11.875 9.45625M8.125 4.375C8.125 5.75571 7.00571 6.875 5.625 6.875C4.24429 6.875 3.125 5.75571 3.125 4.375C3.125 2.99429 4.24429 1.875 5.625 1.875C7.00571 1.875 8.125 2.99429 8.125 4.375Z"
        stroke={IconColor || 'white'}
        strokeWidth="0.9375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
