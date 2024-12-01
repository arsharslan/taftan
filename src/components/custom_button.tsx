export function CustomButton({ onClick, text }: { onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined, text?: string } = {}) {
    return <header className="header" data-header>
        <div className="container">
            <button
                onClick={onClick}
                className="btn btn-secondary"
            >
                <span className="text text-1 text-sm font-normal">{text}</span>

                <span className="text text-2 text-sm font-normal" aria-hidden="true">{text}</span>
            </button>
        </div>
    </header>;
}

export function SleekButton({ onClick, text, type }: { onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined, text?: string, type?: "submit" | "reset" | "button" } = {}) {
    return <button
        type={type}
        onClick={onClick}
        className="inline-flex w-full justify-center rounded-md bg-golden ring-golden ring-2 text-black hover:text-white px-3 py-2 text-sm font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  sm:col-start-2"
    >
        {text}
    </button>;
}