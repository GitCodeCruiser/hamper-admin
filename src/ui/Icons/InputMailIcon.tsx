import { ICustomIconProps } from '@/types/interface/icons.interface';

export default function InputMailIcon({ IconColor }: ICustomIconProps) {
  return (
    <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15.5834 19.3646H6.41671C3.66671 19.3646 1.83337 17.9896 1.83337 14.7812V8.36458C1.83337 5.15625 3.66671 3.78125 6.41671 3.78125H15.5834C18.3334 3.78125 20.1667 5.15625 20.1667 8.36458V14.7812C20.1667 17.9896 18.3334 19.3646 15.5834 19.3646Z"
        stroke={IconColor || 'white'}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.5833 8.82324L12.7141 11.1149C11.77 11.8666 10.2208 11.8666 9.27662 11.1149L6.41663 8.82324"
        stroke={IconColor || 'white'}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
