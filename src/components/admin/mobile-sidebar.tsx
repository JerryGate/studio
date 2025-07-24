
'use client'

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Logo from "../logo"
import { AdminNav } from "./admin-sidebar"

export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex flex-col">
                <div className="p-4 border-b">
                    <Logo textClassName="inline" />
                </div>
                <AdminNav isMobile />
            </SheetContent>
        </Sheet>
    )
}
