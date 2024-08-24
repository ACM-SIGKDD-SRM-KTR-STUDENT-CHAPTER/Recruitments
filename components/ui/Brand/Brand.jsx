import Image from "next/image"

const Brand = ({ ...props }) => (
    <Image
        src="/acmnav.svg"
        alt="ACM logo"
        {...props}
        width={200}
        height={100}
        priority
    />
)
export default Brand