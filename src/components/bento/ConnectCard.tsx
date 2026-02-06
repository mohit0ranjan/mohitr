import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import BentoCard from "./BentoCard";

export default function ConnectCard() {
    return (
        <BentoCard className="col-span-1 md:col-span-1 h-full min-h-[180px] bg-gradient-to-br from-blue-900/10 to-transparent">
            <div className="flex flex-col justify-between h-full">

                <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono uppercase text-blue-300 tracking-widest">
                        Connect
                    </span>
                    <ArrowUpRight className="text-blue-300 opacity-50" size={16} />
                </div>

                <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                        Let's build <br /> something.
                    </h3>

                    <div className="flex gap-3">
                        <Link href="https://github.com" target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5">
                            <Github size={16} />
                        </Link>
                        <Link href="https://linkedin.com" target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5">
                            <Linkedin size={16} />
                        </Link>
                        <Link href="mailto:hello@example.com" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5">
                            <Mail size={16} />
                        </Link>
                    </div>
                </div>

            </div>
        </BentoCard>
    );
}
