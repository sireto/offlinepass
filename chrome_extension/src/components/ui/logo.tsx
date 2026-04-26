import cn from "classnames";

export default function Logo({ className }: { className?: string }) {
  return (
    <div
      aria-label="OfflinePass"
      className={cn("inline-flex items-center gap-2", className)}
    >
      <span className="relative inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-white shadow-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="h-3.5 w-3.5"
        >
          <path
            fillRule="evenodd"
            d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3h-.75A2.25 2.25 0 003.75 12v8.25A2.25 2.25 0 006 22.5h12a2.25 2.25 0 002.25-2.25V12A2.25 2.25 0 0018 9.75h-.75v-3A5.25 5.25 0 0012 1.5zm3.75 8.25v-3a3.75 3.75 0 00-7.5 0v3h7.5zM12 14.25a1.5 1.5 0 00-.75 2.8v1.7a.75.75 0 001.5 0v-1.7A1.5 1.5 0 0012 14.25z"
            clipRule="evenodd"
          />
        </svg>
        <span className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20" />
      </span>
      <span className="text-base font-semibold tracking-tight text-brand">
        OfflinePass
      </span>
    </div>
  );
}
