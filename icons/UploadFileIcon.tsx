export default function UploadFileIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* File outline */}
      <path
        d="M10.5 1.5H5.25C4.85218 1.5 4.47064 1.65804 4.18934 1.93934C3.90804 2.22064 3.75 2.60218 3.75 3V15C3.75 15.3978 3.90804 15.7794 4.18934 16.0607C4.47064 16.342 4.85218 16.5 5.25 16.5H12.75C13.1478 16.5 13.5294 16.342 13.8107 16.0607C14.092 15.7794 14.25 15.3978 14.25 15V5.25L10.5 1.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Folded corner */}
      <path
        d="M10.5 1.5V5.25H14.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Upload arrow */}
      <path d="M9 13.5V8.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M6.75 10.5L9 8.25L11.25 10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
