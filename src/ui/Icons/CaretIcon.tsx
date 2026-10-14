import { ICustomIconProps } from '@/types/interface/icons.interface';

export default function CaretIcon({ IconColor, IconHeight, IconWidth }: ICustomIconProps) {
  return (
    <svg
      width={IconWidth || '18'}
      height={IconHeight || '18'}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.81039 11.6893H13.1894C13.3377 11.6893 13.4827 11.6453 13.606 11.5629C13.7293 11.4805 13.8254 11.3634 13.8821 11.2263C13.9389 11.0893 13.9538 10.9385 13.9248 10.7931C13.8959 10.6476 13.8245 10.514 13.7196 10.4091L9.53014 6.21959C9.38949 6.07899 9.19876 6 8.99989 6C8.80101 6 8.61028 6.07899 8.46964 6.21959L4.28014 10.4091C4.17528 10.514 4.10388 10.6476 4.07495 10.7931C4.04602 10.9385 4.06088 11.0893 4.11763 11.2263C4.17438 11.3634 4.27049 11.4805 4.39379 11.5629C4.5171 11.6453 4.66207 11.6893 4.81039 11.6893Z"
        fill={IconColor || '#30B935'}
      />
    </svg>
  );
}
