const GradientWrapper = ({ children, ...props }) => (
    <div
        {...props}
        className={`relative ${props.className || ""}`}>
        <div className={`absolute m-auto blur-[160px] ${props.wrapperClassName || ""}`}
            style={{
                background:
                    "linear-gradient(180deg, #57abd7 0%, rgba(87, 171, 215, 0.984375) 0.01%, rgba(87, 171, 215, 0.2) 100%)",
            }}>
        </div>
        <div className="relative">
            {children}
        </div>
    </div>
)

export default GradientWrapper;
