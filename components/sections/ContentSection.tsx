// components/sections/ContentSection.tsx
"use client";

import Image from "next/image";
import { CTAButton } from "../ui/CTAButton";

export function ContentSection() {
  return (
    <section className="bg-[#1a1a2e] py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-56 items-center">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <h2 className="font-darker-grotesque text-white text-5xl lg:text-[88px] font-medium lg:leading-[.75]">
              Lorem ipsum dolor donec sed odio.
            </h2>
            <p className="text-white text-base leading-6">
              Donec sed odio dui. Fusce dapibus, tellus ac cursus commodo,
              tortor mauris condimentum nibh, ut fermentum massa justo sit amet
              risus. Nullam quis risus eget urna mollis ornare vel eu leo.
            </p>
            {/* CTA with separate SVG part animations */}
            <div className="pt-4">
              <CTAButton href="#" text="Découvrir" />
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative aspect-[471/672]">
            <Image
              src="/images/bg-contentsection.png"
              alt="Description"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
