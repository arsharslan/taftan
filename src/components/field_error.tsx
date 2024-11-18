export default function FieldErrorDisplay({ error, className }: { error: string, className?: string }) {
    return <span className={`text-red-500 text-xs ${className ? className : ""}`}>
        {error}
    </span>
}