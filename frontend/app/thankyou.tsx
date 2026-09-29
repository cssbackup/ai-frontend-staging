"use client";

import Link from "next/link";
import { ArrowRight, Check, LifeBuoy } from "lucide-react";
import { UserAuthProvider } from "@/components/auth/UserAuthContext";
import HomeNav from "@/components/home/home-nav";


export default function ThankYouPage() {
    return (
        <UserAuthProvider>
            <div className="fixed inset-0 flex h-dvh flex-col overflow-hidden [&>header]:shrink-0 bg-white text-zinc-950">
                <HomeNav variant="light" />

                <main className="min-h-0 flex-1 [container-type:size]">
                    <section className="flex h-full items-center py-[clamp(12px,3cqh,40px)] relative isolate px-5 sm:px-8">
                        <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-gradient-to-b from-white via-blue-50 to-[#dcecff]"
                        />

                        <div className="flex flex-col gap-[clamp(12px,3cqh,28px)] [@container(max-height:320px)]:gap-2 mx-auto w-full max-w-[760px] text-center">
                            <div className="[@container(max-height:620px)]:size-[76px] [@container(max-height:480px)]:hidden relative mx-auto flex size-24 items-center justify-center rounded-full border border-blue-100 bg-white shadow-[0_12px_40px_-12px_rgba(45,123,255,0.35)] sm:size-28">
                                <div aria-hidden="true" className="absolute inset-2 rounded-full bg-blue-50" />
                                <div className="relative flex size-14 items-center justify-center rounded-full bg-blue-600 text-white sm:size-16">
                                    <Check aria-hidden="true" className="size-7 sm:size-8" strokeWidth={2.5} />
                                </div>
                            </div>

                            <p className="[@container(max-height:320px)]:hidden text-xs font-medium uppercase tracking-[0.2em] text-blue-600">
                                YOUR IDEA. YOUR WEBSITE. YOUR NEXT STEP.
                            </p>
                            <h1 className="text-[clamp(3rem,min(9vw,12cqh),6.5rem)] [@container(max-height:320px)]:text-[2.5rem] font-medium leading-[1.04] tracking-[-0.065em]">
                                Thank <span className="text-blue-600">you.</span>
                            </h1>
                            <p className="[@container(max-height:480px)]:text-sm [@container(max-height:480px)]:leading-[1.5] mx-auto max-w-[460px] text-base leading-7 text-neutral-600 sm:text-lg sm:leading-8">
                                Thanks for choosing Lestow. Start creating, redesigning, and customizing your website in minutes.
                            </p>

                            <div className="flex items-center justify-center">
                                <Link
                                    href="/"
                                    className="inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-black px-7 text-sm font-medium text-white transition hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:w-auto"
                                >
                                    Back to home
                                    <ArrowRight aria-hidden="true" className="size-4" />
                                </Link>

                            </div>

                            <div className="[@container(max-height:620px)]:px-4 [@container(max-height:620px)]:py-3 [@container(max-height:480px)]:px-3 [@container(max-height:480px)]:py-2 [@container(max-height:320px)]:border-0 [@container(max-height:320px)]:px-3 [@container(max-height:320px)]:py-0 [@container(max-height:320px)]:bg-transparent [@container(max-height:320px)]:shadow-none mx-auto flex w-full max-w-[500px] items-center gap-3 rounded-2xl border border-white bg-white/85 p-4 text-left shadow-[0_8px_30px_-20px_rgba(0,0,0,0.15)] sm:gap-5 sm:p-6">
                                <div className="[@container(max-height:480px)]:hidden flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                                    <LifeBuoy aria-hidden="true" className="size-5" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-sm font-medium">Need a hand along the way?</h2>
                                    <p className="[@container(max-height:480px)]:hidden mt-1 text-sm leading-6 text-neutral-500">
                                        Find answers in our help center.
                                    </p>
                                </div>
                                <Link
                                    href="/help-center"
                                    aria-label="Visit the help center"
                                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-blue-100 text-blue-600 transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                                >
                                    <ArrowRight aria-hidden="true" className="size-4" />
                                </Link>
                            </div>
                        </div>
                    </section>


                </main>

            </div>
        </UserAuthProvider>
    );
}
