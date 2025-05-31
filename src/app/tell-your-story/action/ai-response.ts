"use server";
import { GoogleGenAI, Type } from "@google/genai";

export const aiAnalysis = async (text: string, gad7TotalScore: string | null) => {
	try {
		const ai = new GoogleGenAI({
			apiKey: process.env.GEMINI_API_KEY!,
		});

		const config = {
			temperature: 0.7,
			responseMimeType: "application/json",
			responseSchema: {
				type: Type.OBJECT,
				required: ["summary", "possible_condition", "emotional_state", "recommendations", "urgent"],
				properties: {
					summary: {
						type: Type.STRING,
					},
					possible_condition: {
						type: Type.OBJECT,
						required: ["name", "confidence_level", "description"],
						properties: {
							name: {
								type: Type.STRING,
							},
							confidence_level: {
								type: Type.STRING,
								enum: ["low", "moderate", "high"],
							},
							description: {
								type: Type.STRING,
							},
						},
					},
					emotional_state: {
						type: Type.STRING,
					},
					recommendations: {
						type: Type.ARRAY,
						items: {
							type: Type.STRING,
						},
					},
					urgent: {
						type: Type.BOOLEAN,
					},
				},
			},
			systemInstruction: [
				{
					text: `Kamu adalah sistem analisis AI yang membantu pengguna memahami kondisi mentalnya berdasarkan skor GAD-7 dan narasi perasaan.

Tugasmu adalah:
- Memberikan ringkasan kondisi mental pengguna,
- Menginterpretasikan skor GAD-7,
- Menyebutkan gangguan mental yang mungkin dialami,
- Menjelaskan kondisi emosional pengguna,
- Memberikan saran yang bisa dilakukan pengguna,
- Menentukan apakah kondisi mendesak atau tidak.

Keluaran HARUS dalam format JSON **lengkap sesuai struktur** berikut, tanpa penjelasan tambahan:

\`\`\`json
{
  "summary": "...",
  "gad7_interpretation": "...",
  "possible_condition": {
    "name": "...",
    "confidence_level": "...",
    "description": "..."
  },
  "emotional_state": "...",
  "recommendations": [
    "...", "...", "..."
  ],
  "urgent": true
}

Jika informasi dalam narasi tidak cukup untuk mengisi salah satu elemen, isi dengan string "Tidak cukup informasi" (untuk string) atau null (jika tidak bisa ditentukan).

Jangan mengabaikan properti apa pun dari JSON.


---

### 🔁 Tambahan Tips Lain:

1. **Tambahkan contoh lengkap** (optional):
   - Kadang model “belajar” dari contoh dan mengikuti struktur dengan lebih akurat.
2. **Validasi manual responsenya**:
   - Jika kamu fetch dari API, bisa gunakan validator JSON untuk mengecek apakah semua property ada, lalu tampilkan pesan jika ada yang kosong.

---
`,
				},
			],
		};
		const model = "gemini-2.0-flash";
		const contents = [
			{
				role: "user",
				parts: [
					{
						text: `Skor GAD-7: ${gad7TotalScore}\nNarasi: ${text}`,
					},
				],
			},
		];

		const response = await ai.models.generateContent({
			model,
			config,
			contents,
		});
    if (!response || !response.candidates || response.candidates.length === 0) {
      throw new Error("No response from AI model");
    }
    if (!response.candidates[0].content || !response.candidates[0].content.parts || response.candidates[0].content.parts.length === 0) {
      throw new Error("Invalid response format from AI model");
    }

    return JSON.parse(response.candidates[0].content?.parts[0].text || "{}");
	} catch (error) {
		console.error("Error in AI analysis:", error);
		throw new Error("Failed to perform AI analysis");
	}
};
