export function LoadingIcon() {
  return (
    <svg
      className="animate-spin h-5 w-5 mr-3"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM12 20c-3.042 0-5.824-1.135-7.938-3l-3 2.647A8.003 8.003 0 0012 24v-4zm5.938-3A7.962 7.962 0 0120 12h-4a4.02 4.02 0 00-3.938-3H12v10h5.938z"
      ></path>
    </svg>
  )
}
