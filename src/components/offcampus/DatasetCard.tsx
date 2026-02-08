"use client";

import React from 'react';
import { Mail, MapPin, Database, CheckCircle, ArrowRight, Star } from "lucide-react";
import Image from 'next/image';

interface DatasetCardProps {
    title: string;
    companies: string;
    role: string;
    location: string;
    emailCount: number;
    price: string;
    topmateLink?: string | null;
    isVerified: boolean;
    imageUrl?: string | null;
}

export default function DatasetCard({ title, companies, role, location, emailCount, price, topmateLink, isVerified, imageUrl }: DatasetCardProps) {
    return (
        <div className="group relative flex flex-col rounded-3xl bg-neutral-900/40 border border-white/5 overflow-hidden hover:border-white/15 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 h-full">

            {/* Thumbnail Section */}
            <div className="relative h-48 w-full overflow-hidden bg-neutral-800">
                {imageUrl ? (
                    <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500">
                        <Image
                            src={imageUrl}
                            alt={title}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent opacity-60" />
                    </div>
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-800">
                        <Database className="w-12 h-12 text-neutral-600" />
                    </div>
                )}

                {/* Badges over image */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {isVerified && (
                        <div className="px-2 py-1 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30 flex items-center gap-1.5 shadow-sm">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            <span className="text-[10px] font-bold text-green-400 uppercase tracking-wide">Verified</span>
                        </div>
                    )}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 text-xs font-medium text-blue-200 bg-blue-500/20 backdrop-blur-md px-2 py-1 rounded-lg w-fit border border-blue-500/20 mb-2">
                        <Star className="w-3 h-3" />
                        {role}
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col gap-4 flex-1">
                <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                        {title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-400 line-clamp-2 h-10">
                        {companies}
                    </p>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 gap-3 py-3 border-t border-white/5 border-b">
                    <div className="flex items-center gap-2 text-sm text-neutral-300">
                        <Database className="w-4 h-4 text-neutral-500" />
                        <span>{emailCount} Verified Emails</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-neutral-300">
                        <MapPin className="w-4 h-4 text-neutral-500" />
                        <span>{location}</span>
                    </div>
                </div>

                {/* Footer / CTA */}
                <div className="mt-auto flex items-center justify-between pt-2">
                    <div>
                        <span className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">Price</span>
                        <div className="text-2xl font-bold text-white">{price}</div>
                    </div>

                    {topmateLink ? (
                        <a
                            href={topmateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-blue-400 hover:text-white transition-all transform active:scale-95 shadow-lg shadow-white/5"
                        >
                            Get Access <ArrowRight className="w-4 h-4" />
                        </a>
                    ) : (
                        <button disabled className="px-5 py-2.5 rounded-xl bg-neutral-800 text-neutral-500 font-bold text-sm cursor-not-allowed">
                            Sold Out
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
