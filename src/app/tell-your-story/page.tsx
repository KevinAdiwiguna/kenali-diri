"use client";
import React, { useState, useEffect } from "react";
import { FiPenTool, FiArrowRight } from "react-icons/fi";
import { aiAnalysis } from "./action/ai-response";
import { useRouter } from "next/navigation";

const Page = () => {
	const router = useRouter();

	const [narasi, setNarasi] = useState("");
	const [aiResponse, setAiResponse] = useState();

	const [aiLoading, setAiLoading] = useState(false);
	const [gad7TotalScore, setGad7TotalScore] = useState<string | null>(null);

	useEffect(() => {
		const score = localStorage.getItem("gad7_totalScore");
		setGad7TotalScore(score);
	}, []);

	const minKarakter = 50;
	const jumlahKarakter = narasi.trim().length;
	const isValid = jumlahKarakter >= minKarakter;

	const handleSubmit = async () => {
		console.log("clicked");
		if (isValid) {
			setAiLoading(true);
			try {
				const response = await aiAnalysis(narasi, gad7TotalScore);
				if (response) {
					setAiResponse(response);
					localStorage.setItem("ai_response", JSON.stringify(response));
					router.push("/result");
				}
			} catch (error) {
				console.error("Error saat memanggil AI analysis:", error);
			} finally {
				setAiLoading(false);
			}
		}
	};

	console.log(aiResponse);

	return (
		<div className="container mx-auto px-4 max-w-3xl mt-12">
			<div className="text-center mb-8">
				<h1 className="text-3xl font-bold">Ceritakan Perasaan Anda</h1>
				<p className="mt-2">Bagikan pengalaman dan perasaan Anda dalam seminggu terakhir</p>
			</div>

			<div className="rounded-lg border bg-base-100 border-base-300 shadow-lg">
				<div className="flex flex-col space-y-1.5 p-6">
					<div className="text-2xl font-semibold leading-none tracking-tight flex items-center space-x-3">
						<FiPenTool className="w-6 h-6" />
						<span>Narasi Pribadi</span>
					</div>
					<p>Tuliskan dengan bebas tentang perasaan, pikiran, atau pengalaman yang Anda alami dalam seminggu terakhir. Informasi ini akan membantu AI memberikan analisis yang lebih personal dan akurat.</p>
				</div>

				<div className="p-6 pt-0 space-y-6">
					<div className="space-y-4">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="p-4 bg-info/20 rounded-lg">
								<h4 className="font-semibold mb-2">💭 Contoh yang bisa Anda ceritakan:</h4>
								<ul className="text-sm space-y-1 text-base-content">
									<li>• Situasi yang membuat Anda cemas</li>
									<li>• Perubahan pola tidur atau makan</li>
									<li>• Perasaan yang dominan akhir-akhir ini</li>
									<li>• Hal-hal yang membantu Anda merasa lebih baik</li>
								</ul>
							</div>
							<div className="p-4 bg-success/20 rounded-lg">
								<h4 className="font-semibold mb-2">🔒 Privasi Terjamin:</h4>
								<ul className="text-sm text-base-content space-y-1">
									<li>• Data tidak disimpan permanen</li>
									<li>• Tidak ada identitas yang tercatat</li>
									<li>• Hanya digunakan untuk analisis AI</li>
									<li>• Anda bisa mengunduh hasilnya</li>
								</ul>
							</div>
						</div>

						<textarea value={narasi} onChange={(e) => setNarasi(e.target.value)} className="flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[300px] border-blue-200 focus:border-blue-400 focus:ring-blue-400" placeholder="Ceritakan perasaan dan pengalaman Anda dalam seminggu terakhir..." />

						<div className="flex justify-between items-center text-sm">
							<span>Minimal 50 karakter untuk analisis yang optimal</span>
							<span>{jumlahKarakter} karakter</span>
						</div>
					</div>

					<div className="pt-6 border-t">
						<div className="flex flex-col sm:flex-row gap-4">
							<button onClick={handleSubmit} disabled={!isValid || aiLoading} className={`cursor-pointer bg-primary inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 flex-1 py-3 text-lg rounded-xl ${isValid ? "text-white" : "opacity-50"}`}>
								Dapatkan Analisis AI
								<FiArrowRight className="w-5 h-5 ml-2" />
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="rounded-lg border bg-base-100 border-base-300 shadow-lg mt-8">
				<div className="p-6">
					<h3 className="font-semibold mb-4">💡 Tips Menulis Narasi yang Efektif</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-base-content">
						<div>
							<h4 className="font-medium mb-2">Yang Sebaiknya Ditulis:</h4>
							<ul className="space-y-1">
								<li>✓ Perasaan spesifik yang Anda alami</li>
								<li>✓ Situasi pemicu kecemasan</li>
								<li>✓ Perubahan dalam rutinitas harian</li>
								<li>✓ Dampak pada aktivitas sehari-hari</li>
							</ul>
						</div>
						<div>
							<h4 className="font-medium mb-2">Tidak Perlu Khawatir:</h4>
							<ul className="space-y-1">
								<li>✓ Tidak ada jawaban yang salah</li>
								<li>✓ Tulis dengan bahasa Anda sendiri</li>
								<li>✓ Boleh menyebutkan hal positif juga</li>
								<li>✓ Panjang narasi fleksibel</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Page;
