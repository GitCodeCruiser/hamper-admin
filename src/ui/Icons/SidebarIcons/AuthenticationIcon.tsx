import { ICustomIconProps } from '@/types/interface/icons.interface';

export default function AuthenticationIcon({ IconColor, IconHeight, IconWidth }: ICustomIconProps) {
  return (
    <svg
      width={IconWidth || '24'}
      height={IconHeight || '24'}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.4899 2.22859L5.49991 4.10859C4.34991 4.53859 3.40991 5.89859 3.40991 7.11859V14.5486C3.40991 15.7286 4.18991 17.2786 5.13991 17.9886L9.43991 21.1986C10.8499 22.2586 13.1699 22.2586 14.5799 21.1986L18.8799 17.9886C19.8299 17.2786 20.6099 15.7286 20.6099 14.5486V7.11859C20.6099 5.88859 19.6699 4.52859 18.5199 4.09859L13.5299 2.22859C12.6799 1.91859 11.3199 1.91859 10.4899 2.22859Z"
        stroke={IconColor || '#6F6F6F'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.05005 11.8697L10.66 13.4797L14.96 9.17969"
        stroke={IconColor || '#6F6F6F'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
