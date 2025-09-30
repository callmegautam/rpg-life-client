"use client";

import { Button } from "pixel-retroui";
import Navbar from "@/components/landing/Navbar";
import Background from "@/components/landing/Background";
import { APP_CONFIG } from "@/lib/config";
import Link from "next/link";
import Image from "next/image";
import bottle from "../public/bottle.png";
import crown from "../public/crown.png";

export default function Home() {
    return (
        <div className="relative min-h-screen w-full ">
            <Background />
            {/* <Image src={bottle} alt="bottle" className="absolute top-140 -left-10 w-30 rotate-30 -z-10" />
            <Image src={crown} alt="crown" className="absolute top-60 left-1/2 w-30 -rotate-30 -z-10" /> */}

            <div className="relative flex flex-col justify-start items-center w-full h-screen z-10 gap-4 px-5 lg:px-10 font-minecraft">
                <Navbar />
                <div className="flex flex-col justify-center items-center w-full h-[80vh] gap-4  font-minecraft">
                    <p className="text-5xl sm:text-7xl font-bold text-white text-center">
                        {APP_CONFIG.website.title}
                    </p>
                    <p className=" sm:text-2xl text-white text-center">{APP_CONFIG.website.description}</p>
                    <div>
                        <Link href="/dashboard">
                            <Button bg="#4ccd61" textColor="#000000" borderColor="#000000" shadow="#21841f">
                                Coming soon
                            </Button>
                        </Link>
                        <Link href="https://github.com/callmegautam">
                            <Button bg="#00cddb" textColor="#000000" borderColor="#000000" shadow="#0091ad">
                                Github
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
