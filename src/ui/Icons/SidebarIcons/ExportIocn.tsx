import { ICustomIconProps } from '@/types/interface/icons.interface';

export default function ExportIocn({ IconColor, IconHeight, IconWidth }: ICustomIconProps) {
  return (
    <svg
      width={IconWidth || '24'}
      height={IconHeight || '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 11.0008L21.2 2.80078"
        stroke={IconColor || '#6F6F6F'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 6.8V2H17.2"
        stroke={IconColor || '#6F6F6F'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
        stroke={IconColor || '#6F6F6F'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
