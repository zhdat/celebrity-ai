import {Header} from "@/components/Header.tsx";
import * as React from "react";

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout = ({children}: LayoutProps) => {
    return (
        <div className="min-h-screen overflow-y-auto">
            <Header/>
            <main>{children}</main>
        </div>
    )
}