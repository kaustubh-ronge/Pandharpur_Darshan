
'use client'

import { useState, useEffect } from "react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Languages, Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {
    Sheet, SheetContent, SheetTrigger, SheetClose,
    SheetHeader, SheetTitle, SheetDescription
} from "@/components/ui/sheet"
import { navItems, quickLinks } from "@/data/HeaderData/headerData"
import { supportedLanguages, getCurrentLanguageCode, getLanguageByCode } from "@/lib/languageUtils"

export function HeaderClient({ user }) {
    const pathname = usePathname()
    const [selectedLang, setSelectedLang] = useState(supportedLanguages[0])

    useEffect(() => {
        const code = getCurrentLanguageCode();
        const langObj = getLanguageByCode(code);
        setSelectedLang(langObj);
    }, []);

    // This function calls the global function from our GoogleTranslateManager
    const handleLanguageChange = (langObj) => {
        setSelectedLang(langObj);
        if (window.changeGoogleTranslateLanguage) {
            window.changeGoogleTranslateLanguage(langObj.code);
        }
    };

    return (
        <header className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm md:pb-1">
            <div className="w-full max-w-screen-2xl mx-auto flex h-20 items-center justify-between px-3 sm:px-5 lg:px-8">
                <Link href="/" className="flex items-center flex-shrink-0 group">
                    <div className="relative flex items-center justify-center rounded-full p-1 bg-white border-2 border-orange-500 shadow-sm group-hover:border-orange-600 group-hover:shadow-orange-500/20 transition-all duration-300">
                        <Image
                            src="/pandharpur-darshan-logo.jpeg"
                            alt="Pandharpur Darshan"
                            width={64}
                            height={64}
                            className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover"
                            priority
                        />
                    </div>
                </Link>

                <nav className="hidden lg:flex items-center gap-6 mx-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-2 whitespace-nowrap text-sm font-medium transition-colors ${pathname === item.href
                                ? "text-orange-600 border-b-2 border-orange-500 pb-1"
                                : "text-gray-700 hover:text-orange-600"
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <div className="hidden lg:flex items-center gap-3">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-gray-700 hover:bg-gray-100">
                                    Quick Access <ChevronDown className="h-4 w-4 ml-1" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {quickLinks.map((item) => (
                                    <DropdownMenuItem asChild key={item.name}>
                                        <Link href={item.href} className="flex items-center text-sm">{item.icon}{item.name}</Link>
                                    </DropdownMenuItem>
                                ))}
                                <DropdownMenuItem asChild>
                                    <Link href="/join-us" className="flex items-center text-sm">
                                        <span className="mr-2">🤝</span>Join Us
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* This dropdown controls the Google Translator without modifying language dropdown labels */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="gap-1 text-gray-700 hover:bg-gray-100 notranslate" translate="no">
                                    <Languages className="h-4 w-4" />
                                    <span className="notranslate" translate="no">{selectedLang.label}</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="notranslate" translate="no">
                                {supportedLanguages.map((lang) => (
                                    <DropdownMenuItem
                                        key={lang.code}
                                        className="notranslate"
                                        onClick={() => handleLanguageChange(lang)}
                                    >
                                        <span className="notranslate" translate="no">{lang.label}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Super Admin link (visible only to admins) */}
                        {user?.isSuperAdmin && (
                            <Link href="/super-admin">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-dashed border-slate-300 text-slate-700 hover:border-orange-400 hover:text-orange-600 px-3"
                                >
                                    Super Admin
                                </Button>
                            </Link>
                        )}

                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton>
                                <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">Sign In</Button>
                            </SignInButton>
                        </SignedOut>
                    </div>

                    {/* --- MOBILE MENU --- */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-gray-100">
                                    <Menu className="h-6 w-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[300px] bg-white shadow-lg px-4">
                                <SheetHeader>
                                    <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                                    <SheetDescription className="sr-only">
                                        A list of navigation links and quick access options.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="flex flex-col gap-y-4 mt-4 overflow-y-auto max-h-[calc(100vh-80px)]">
                                    <div className="pb-4 border-b">
                                        <SignedIn>
                                            <div className="flex items-center gap-4">
                                                <UserButton afterSignOutUrl="/" />
                                                <div className="text-sm">
                                                    <div className="font-semibold text-gray-800">Welcome, {user?.firstName || "User"}!</div>
                                                    <div className="text-xs text-gray-500">{user?.primaryEmailAddress?.emailAddress}</div>
                                                </div>
                                            </div>
                                        </SignedIn>
                                        <SignedOut>
                                            <SignInButton>
                                                <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">Sign In</Button>
                                            </SignInButton>
                                        </SignedOut>
                                    </div>
                                    <nav className="flex flex-col gap-y-2">
                                        {navItems.map((item) => (
                                            <SheetClose asChild key={item.href}>
                                                <Link href={item.href} className="flex items-center gap-3 py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100">
                                                    {item.icon}{item.name}
                                                </Link>
                                            </SheetClose>
                                        ))}
                                    </nav>
                                    {/* Super Admin link in mobile menu (visible only to admins) */}
                                    {user?.isSuperAdmin && (
                                        <SheetClose asChild>
                                            <Link
                                                href="/super-admin"
                                                className="flex items-center gap-3 py-2 px-3 rounded-md text-gray-700 hover:bg-gray-100"
                                            >
                                                <span className="font-medium">Super Admin</span>
                                            </Link>
                                        </SheetClose>
                                    )}
                                    <hr />
                                    <div className="flex flex-col gap-y-2 text-sm">
                                        <h3 className="font-semibold px-3 text-gray-500 text-xs uppercase">Quick Access</h3>
                                        {quickLinks.map((link) => (
                                            <SheetClose asChild key={link.href}>
                                                <Link href={link.href} className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                                                    {link.icon}{link.name}
                                                </Link>
                                            </SheetClose>
                                        ))}
                                        <SheetClose asChild>
                                            <Link href="/join-us" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                                                <span className="mr-2">🤝</span>Join Us
                                            </Link>
                                        </SheetClose>
                                    </div>
                                    <hr />
                                    {/* --- LANGUAGE DROPDOWN FOR MOBILE MENU --- */}
                                    <div className="flex flex-col gap-y-2 text-sm">
                                        <h3 className="font-semibold px-3 text-gray-500 text-xs uppercase">Language</h3>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-between items-center px-3 py-2 text-gray-600 hover:bg-gray-100 notranslate"
                                                    translate="no"
                                                >
                                                    <span className="flex items-center gap-3 notranslate" translate="no">
                                                        <Languages className="h-4 w-4" />
                                                        <span className="notranslate" translate="no">{selectedLang.label}</span>
                                                    </span>
                                                    <ChevronDown className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-[260px] notranslate" translate="no">
                                                {supportedLanguages.map((lang) => (
                                                    <DropdownMenuItem
                                                        key={lang.code}
                                                        className="notranslate"
                                                        onClick={() => handleLanguageChange(lang)}
                                                    >
                                                        <span className="notranslate" translate="no">{lang.label}</span>
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                <SheetClose asChild>
                                    <Button variant="outline" className="mt-4 w-full">
                                        Close
                                    </Button>
                                </SheetClose>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}