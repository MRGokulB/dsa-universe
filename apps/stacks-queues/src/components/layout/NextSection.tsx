"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface NextSectionProps {
  href: string;
  title: string;
  description: string;
}

export function NextSection({ href, title, description }: NextSectionProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mt-20 mb-32 px-4">
      <Link href={href} className="group block w-full relative">
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12 transition-colors hover:bg-white/[0.04] hover:border-purple-500/30"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-white/40 text-sm font-mono mb-2 uppercase tracking-widest">Next Up</p>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{title}</h3>
              <p className="text-white/60 text-sm md:text-base">{description}</p>
            </div>
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-purple-500 group-hover:border-purple-400 group-hover:text-white text-white/40 transition-all duration-300 group-hover:translate-x-2">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
