
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
                <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
                <div className="p-4 border-b">
                    <Logo textClassName="inline" />
                </div>
                <AdminNav isMobile />
            </SheetContent>
        </Sheet>
    )
}
