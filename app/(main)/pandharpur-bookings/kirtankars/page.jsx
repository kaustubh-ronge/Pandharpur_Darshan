import { getAllKirtankarsQuery } from "@/sanity/lib/queries";
import { Mic } from "lucide-react";
import { BlueBackground } from "@/components/BlueSharedBackGround";
import KirtankarCard from "./_components/KirtankarCard";
import { sanityFetch } from "@/sanity/lib/fetch";
import { Suspense } from "react";
import { ListingSkeleton } from "@/components/ListingSkeleton";

/**
 * Kirtankars Listing Page - Optimized for Performance & Streaming.
 */

import KirtankarListClient from "./_components/KirtankarListClient";

/**
 * Kirtankars Listing Page - Optimized for Performance & Streaming.
 */

function PageHeader({ title, subtitle }) {
    return (
        <div className="text-center mb-16 md:mb-20 mt-[50px]">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-slate-800">{title}</h1>
            <p className="max-w-3xl mx-auto text-lg text-slate-500">{subtitle}</p>
            <div className="mt-6 w-24 h-1 bg-orange-500 mx-auto rounded-full" />
        </div>
    );
}

async function KirtankarList() {
    const kirtankars = await sanityFetch({
        query: getAllKirtankarsQuery,
        tags: ['kirtankar']
    });

    return <KirtankarListClient kirtankars={kirtankars} />;
}

export default async function KirtankarsPage() {
    return (
        <div className="min-h-screen">
            <BlueBackground />
            <div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <PageHeader
                        title="Kirtankars of Pandharpur"
                        subtitle="Invite the sacred tradition of Kirtan into your home. Find and inquire with renowned Kirtankars for your events."
                    />

                    <Suspense fallback={<ListingSkeleton />}>
                        <KirtankarList />
                    </Suspense>

                    <article className="max-w-4xl mx-auto mt-16 text-lg text-slate-700 dark:text-slate-300 space-y-4 text-center bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-slate-100">
                        <p>
                            <strong>Kirtan</strong> is a deeply emotional and powerful form of devotional storytelling, combining spiritual singing, philosophical teachings, and poetic recitation. In the Warkari tradition, kirtan is not just a performance; it is a sacred medium passed down by great saints like Dnyaneshwar, Tukaram, and Eknath to spread the message of love, equality, and devotion to Lord Vitthal.
                        </p>
                        <p>
                            Hiring a respected Kirtankar brings this profound spiritual energy directly to your community or family. Kirtankars are typically invited for home events, private yatra groups, housewarmings (Vastu Shanti), naming ceremonies, and large public gatherings during auspicious months like Chaturmas.
                        </p>
                        <p>
                            Pandharpur is home to some of the most learned and deeply devoted Kirtankars in Maharashtra. Through this directory, you can connect directly with experienced practitioners to schedule a kirtan session that will elevate your spiritual event and inspire all who attend.
                        </p>
                    </article>
                </div>
            </div>
        </div>
    );
}