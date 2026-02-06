import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { Award, CheckCircle } from "lucide-react";

export default function Certifications() {
    return (
        <div className="py-20 bg-black/30">
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <h2 className="text-3xl font-bold">Certifications & Knowledge</h2>
            </div>
            <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[150px]">
                <BentoCard className="p-6 flex items-start gap-4">
                    <Award className="w-8 h-8 text-yellow-500 shrink-0" />
                    <div>
                        <h3 className="font-bold">AWS Certified Solutions Architect</h3>
                        <p className="text-xs text-muted mt-1">Amazon Web Services • 2024</p>
                    </div>
                </BentoCard>

                <BentoCard className="p-6 flex items-start gap-4">
                    <Award className="w-8 h-8 text-blue-500 shrink-0" />
                    <div>
                        <h3 className="font-bold">Certified Kubernetes Administrator</h3>
                        <p className="text-xs text-muted mt-1">CNCF • 2023</p>
                    </div>
                </BentoCard>

                <BentoCard className="p-6 flex items-start gap-4">
                    <Award className="w-8 h-8 text-green-500 shrink-0" />
                    <div>
                        <h3 className="font-bold">Google Cloud Professional Engineer</h3>
                        <p className="text-xs text-muted mt-1">Google • 2023</p>
                    </div>
                </BentoCard>

                <BentoCard className="p-6 flex flex-col justify-center items-center text-center bg-white/5">
                    <div className="text-3xl font-bold mb-1">12+</div>
                    <div className="text-xs text-muted">Total Certifications</div>
                </BentoCard>
            </BentoGrid>
        </div>
    );
}
