"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // <-- import icons
import { APP_CONFIG } from "@/lib/config";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: "/adventure", label: "Adventure" },
        { href: "/rewards", label: "Rewards" },
        { href: "/join", label: "Join" },
    ];

    return (
        <nav className="flex items-center justify-between w-full h-16 text-white">
            {/* Logo */}
            <Link href="/">
                <div className="flex items-center gap-3">
                    <Image src={APP_CONFIG.website.logo} alt="Logo" width={40} height={40} />
                    <p className="text-2xl font-bold">{APP_CONFIG.website.title}</p>
                </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex gap-8 text-lg">
                {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                        {link.label}
                    </Link>
                ))}
            </div>

            {/* Mobile Hamburger */}
            <button
                className="sm:block md:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Menu */}

            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-black/30 rounded-xl flex flex-col items-center gap-6 py-6 text-lg md:hidden z-50 animate-open">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
