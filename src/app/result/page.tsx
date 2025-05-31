"use client"
import { useEffect, useState } from "react";

interface AIResponse {
	summary: string;
	emotional_state: string;
	possible_condition: {
		name: string;
		confidence_level: "low" | "moderate" | "high";
		description: string;
	};
	recommendations: string[];
	urgent: boolean;
}

const confidenceColor = (level: string) => {
	switch (level) {
		case "low":
			return "bg-warning text-warning-content";
		case "moderate":
			return "bg-info text-info-content";
		case "high":
			return "bg-success text-success-content";
		default:
			return "bg-neutral text-neutral-content";
	}
};

const Page = () => {
	const [gad7Score, setGad7Score] = useState<number | null>(null);
	const [aiResult, setAiResult] = useState<AIResponse | null>(null);

	useEffect(() => {
		const gad7Str = localStorage.getItem("gad7_totalScore");
		const aiJson = localStorage.getItem("ai_response");

		if (gad7Str) setGad7Score(Number(gad7Str));
		if (aiJson) {
			try {
				const parsed = JSON.parse(aiJson);
				setAiResult(parsed);
			} catch (error) {
				console.error("Failed to parse AI response:", error);
			}
		}
	}, []);

	const interpretGAD7 = (score: number | null): string => {
		if (score === null) return "Tidak tersedia";
		if (score <= 4) return "Minimal (Normal)";
		if (score <= 9) return "Ringan";
		if (score <= 14) return "Sedang";
		return "Parah";
	};

	return (
		<div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
			<h1 className="text-3xl font-bold text-center">Hasil Pemeriksaan Mental Health</h1>

			<section>
				<h2 className="text-2xl font-semibold mb-4 text-base-content">Tingkat Kecemasan</h2>
				<div className="bg-base-100 rounded-2xl shadow-md p-6 border border-primary">
					{gad7Score !== null ? (
						<div>
							<p className="text-lg text-base-content">
								Skor GAD-7 Anda: <strong>{gad7Score}</strong>
							</p>
							<p className="font-semibold mt-2">Tingkat: {interpretGAD7(gad7Score)}</p>
						</div>
					) : (
						<p className="text-neutral">Data GAD-7 tidak ditemukan.</p>
					)}
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-7 w-7"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M13 16h-1v-4h-1m1-4h.01M12 12v.01M12 18h.01M9 21h6a2 2 0 002-2v-6a2 2 0 00-2-2h-6a2 2 0 00-2 2v6a2 2 0 002 2z"
						/>
					</svg>
					Analisis AI
				</h2>

				{aiResult ? (
					<div className="bg-base-100 rounded-3xl shadow-lg p-8 border border-primary space-y-8 animate-fadeIn">
						<div className="bg-primary/10 rounded-xl p-5 border border-primary">
							<h3 className="font-semibold mb-2 flex items-center gap-2">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M9 12l2 2 4-4"
									/>
								</svg>
								Ringkasan
							</h3>
							<p className="text-base-content">{aiResult.summary}</p>
						</div>

						{/* Kondisi yang Mungkin */}
						<div className="bg-secondary/10 rounded-xl p-5 border border-secondary">
							<h3 className="font-semibold text-secondary mb-2">Kondisi yang Mungkin</h3>
							<div className="flex items-center justify-between mb-1">
								<p className="font-bold text-secondary">{aiResult.possible_condition.name}</p>
								<span
									className={`px-3 py-1 rounded-full text-sm font-semibold ${confidenceColor(
										aiResult.possible_condition.confidence_level
									)}`}
								>
									{aiResult.possible_condition.confidence_level.toUpperCase()}
								</span>
							</div>
							<p className="text-base-content">{aiResult.possible_condition.description}</p>
						</div>

						{/* Keadaan Emosional */}
						<div className="bg-info/10 rounded-xl p-5 border border-info">
							<h3 className="font-semibold text-info mb-2">Keadaan Emosional</h3>
							<p className="text-base-content">{aiResult.emotional_state}</p>
						</div>

						{/* Rekomendasi */}
						<div className="bg-success/10 rounded-xl p-5 border border-success">
							<h3 className="font-semibold text-success mb-2">Rekomendasi</h3>
							<ul className="list-disc list-inside text-base-content space-y-1">
								{aiResult.recommendations.map((rec, idx) => (
									<li key={idx}>{rec}</li>
								))}
							</ul>
						</div>

						{/* Urgent Warning */}
						{aiResult.urgent && (
							<div className="p-5 bg-error text-error-content border border-error rounded-2xl font-semibold flex items-center gap-3 text-lg shadow-lg animate-pulse">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-7 w-7"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									strokeWidth={2}
								>
									<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M12 5v.01M12 19v.01" />
									<path strokeLinecap="round" strokeLinejoin="round" d="M10 10l2 2 2-2" />
								</svg>
								⚠️ Disarankan untuk segera mencari bantuan profesional.
							</div>
						)}
					</div>
				) : (
					<p className="text-neutral">Analisis AI belum tersedia.</p>
				)}
			</section>
		</div>
	);
};

export default Page;
