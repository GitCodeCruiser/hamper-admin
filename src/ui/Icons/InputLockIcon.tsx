import { ICustomIconProps } from '@/types/interface/icons.interface';

export default function InputLockIcon({ IconColor }: ICustomIconProps) {
  return (
    <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.5 9.73958V7.90625C5.5 4.87208 6.41667 2.40625 11 2.40625C15.5833 2.40625 16.5 4.87208 16.5 7.90625V9.73958"
        stroke={IconColor || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 17.5316C12.2657 17.5316 13.2917 16.5056 13.2917 15.2399C13.2917 13.9743 12.2657 12.9482 11 12.9482C9.73439 12.9482 8.70837 13.9743 8.70837 15.2399C8.70837 16.5056 9.73439 17.5316 11 17.5316Z"
        stroke={IconColor || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5834 20.7402H6.41671C2.75004 20.7402 1.83337 19.8236 1.83337 16.1569V14.3236C1.83337 10.6569 2.75004 9.74023 6.41671 9.74023H15.5834C19.25 9.74023 20.1667 10.6569 20.1667 14.3236V16.1569C20.1667 19.8236 19.25 20.7402 15.5834 20.7402Z"
        stroke={IconColor || 'white'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
