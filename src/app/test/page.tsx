"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Shield } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
const questions = ["Merasa gugup, cemas, atau tegang", "Tidak bisa berhenti atau mengontrol rasa khawatir", "Terlalu banyak mengkhawatirkan berbagai hal", "Kesulitan untuk rileks", "Begitu gelisah sehingga sulit untuk duduk diam", "Mudah kesal atau gampang marah", "Merasa takut seolah-olah sesuatu yang buruk akan terjadi"];

const options = [
	{ value: 0, label: "Tidak sama sekali" },
	{ value: 1, label: "Beberapa hari" },
	{ value: 2, label: "Lebih dari setengah hari" },
	{ value: 3, label: "Hampir setiap hari" },
];

export default function GADQuestion() {
	const router = useRouter();

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState<(number | null)[]>(Array(7).fill(null));
	const [isFinished, setIsFinished] = useState(false);

	const handleOptionSelect = (value: number) => {
		const updatedAnswers = [...answers];
		updatedAnswers[currentQuestion] = value;
		setAnswers(updatedAnswers);
	};

	const handleNext = () => {
		if (currentQuestion < questions.length - 1) {
			setCurrentQuestion(currentQuestion + 1);
		} else {
			const totalScore: number = answers.reduce((acc: number, curr: number | null) => acc + (curr ?? 0), 0);
			localStorage.setItem("gad7_answers", JSON.stringify(answers));
			localStorage.setItem("gad7_totalScore", totalScore.toString());
			setIsFinished(true);
		}
	};

	const handlePrev = () => {
		if (currentQuestion > 0) {
			setCurrentQuestion(currentQuestion - 1);
		}
	};

	const isAnswered = answers[currentQuestion] !== null;
	const progressPercent = ((currentQuestion + 1) / questions.length) * 100;

	if (isFinished) {
		router.push("/tell-your-story");
	}

	return (
		<div className="min-h-screen py-8 bg-gradient-to-br from-base-100 to-base-200">
			<div className="container mx-auto px-4 max-w-2xl">
				<div className="text-center mb-8">
					<Link href="/" className="inline-flex items-center space-x-2">
						<Shield className="w-6 h-6" />
						<span className="font-semibold">RuangAman</span>
					</Link>
					<h1 className="text-3xl font-bold">Tes GAD-7</h1>
					<p className="mt-2">Seberapa sering Anda terganggu oleh masalah berikut dalam 2 minggu terakhir?</p>
				</div>

				{/* Progress */}
				<div className="mb-8">
					<div className="flex justify-between text-sm mb-2">
						<span>
							Pertanyaan {currentQuestion + 1} dari {questions.length}
						</span>
						<span>{Math.round(progressPercent)}% selesai</span>
					</div>
					<div className="w-full h-2 rounded-full overflow-hidden bg-base-200">
						<div className="h-full transition-all bg-primary" style={{ width: `${progressPercent}%` }} />
					</div>
				</div>

				{/* Card */}
				<div className="rounded-lg border border-base-300 shadow-lg mb-8 bg-base-100 ">
					<div className="p-6 space-y-4">
						<h2 className="text-xl font-semibold">{questions[currentQuestion]}</h2>
						<div className="space-y-3">
							{options.map((opt) => (
								<div
									key={opt.value}
									onClick={() => handleOptionSelect(opt.value)}
									className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer border border-base-300 transition-colors
                ${answers[currentQuestion] === opt.value ? "bg-base-200 hover:bg-opacity-30" : "hover:bg-base-200 hover:bg-opacity-10"}`}
								>
									<div
										className={`h-4 w-4 rounded-full border transition-colors
                ${answers[currentQuestion] === opt.value ? "bg-primary border-primary" : "bg-base-100 border-primary"}`}
									/>
									<label className="text-sm font-medium text-primary-content">{opt.label}</label>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="flex justify-between">
					<button
						onClick={handlePrev}
						disabled={currentQuestion === 0}
						className={`font-semibold flex items-center gap-2 text-sm px-4 py-2 rounded-md border text-primary transition-colors
          ${currentQuestion === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-base-200 cursor-pointer"}`}
					>
						<ArrowLeft className="w-4 h-4" />
						Sebelumnya
					</button>
					<button
						onClick={handleNext}
						disabled={!isAnswered}
						className={`font-semibold flex items-center gap-2 text-sm px-4 py-2 rounded-md text-primary-content bg-primary transition-colors
          ${!isAnswered ? "opacity-50 cursor-not-allowed" : "hover:bg-primary/90 cursor-pointer"}`}
					>
						{currentQuestion === questions.length - 1 ? "Selesai" : "Selanjutnya"}
						<ArrowRight className="w-4 h-4" />
					</button>
				</div>
			</div>
		</div>
	);
}
