"use client";

import React from "react";
import Image from "next/image";
import bg from "../../public/bg.png";

const Background = () => {
    return (
        <>
            {/* Background Image */}
            <Image
                src={bg}
                alt="Background"
                fill
                priority
                className="object-cover object-bottom-left 2xl:object-center -z-10"
            />

            {/* Overlay (optional, for readability) */}
            <div className="absolute inset-0 bg-black/50 -z-0" />
        </>
    );
};

export default Background;
