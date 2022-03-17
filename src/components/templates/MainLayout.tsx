import {FC, PropsWithChildren} from "react";

interface MainLayoutProps {
    backgroundColor?: `#${string}` | `bg-${string}`
}

export const MainLayout: FC<PropsWithChildren<MainLayoutProps>> = ({
    children,
    backgroundColor
}) => {

    return (
        // Allows only "bg-somecolor-somestroke" or "#somecolor"
        <div className={`
            flex items-center justify-center min-h-screen min-w-full 
            ${backgroundColor?.startsWith('bg-') ? backgroundColor : `bg-[${backgroundColor}]`}
        `}>
            {children}
        </div>
    )
}