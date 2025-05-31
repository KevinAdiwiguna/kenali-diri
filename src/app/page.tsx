import { FaArrowRight } from "react-icons/fa6";
import { FiShield, FiUsers } from "react-icons/fi";
import { LuBrain, LuArrowRight } from "react-icons/lu";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";

export default function Home() {
	return (
		<>
			<div className="mx-auto px-6 py-12 max-w-4xl">
				<section className="p-4">
					<div className="flex justify-center">
						<div className="bg-base-300 mx-4 rounded-full flex justify-center items-center py-2 px-4 gap-x-3">
							<LuBrain size={25} className="text-base-content" />
							<p className="text-center text-sm font-semibold text-base-content">Platform Kesehatan Mental Terpercaya</p>
						</div>
					</div>

					<h1 className="text-4xl md:text-6xl font-bold text-center mt-8 text-base-content">
						Kenali Kondisi Mental Anda dengan <span className="text-info">Aman</span>
					</h1>

					<p className="mt-6 text-lg text-center text-base-content">Ruang Aman adalah tempat digital yang aman untuk mengecek kondisi kesehatan mental anda secara mandiri. Dapatkan pemahaman awal sebelum berkonsultasi dengan profesional.</p>

					<div className="w-full flex justify-center items-center flex-wrap mt-6 gap-4">
						<Link href="/test" className="cursor-pointer">
							<button className="flex justify-center items-center bg-primary hover:bg-primary-content hover:text-primary font-semibold px-4 py-2 rounded-xl gap-x-4 text-primary-content duration-300">
								<LuBrain className="w-5 h-5" />
								<span>Mulai Test Sekarang</span>
								<FaArrowRight className="w-5 h-5" />
							</button>
						</Link>

						<button className="px-4 py-3 rounded-xl font-semibold border border-base-300 bg-base-100 text-base-content hover:bg-base-200 transition duration-300">Pelajari Lebih Lanjut</button>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
						{/* Card 1 */}
						<div className="bg-base-100 border border-base-300 rounded-xl flex flex-col justify-center items-center gap-4 py-4 px-5 text-base-content">
							<div className="bg-base-content w-fit p-3 rounded-xl">
								<FiShield className="w-10 h-10 text-primary" />
							</div>
							<p className="font-semibold">100% Private</p>
							<p className="text-center text-sm">Tidak perlu daftar akun. Semua data Anda tetap privat dan aman.</p>
						</div>

						{/* Card 2 */}
						<div className="bg-base-100 border border-base-300 rounded-xl flex flex-col justify-center items-center gap-4 py-4 px-5 text-base-content">
							<div className="bg-base-content w-fit p-3 rounded-xl">
								<LuBrain className="w-10 h-10 text-primary" />
							</div>
							<p className="font-semibold">Berbasis Sains dan AI</p>
							<p className="text-center text-sm">Menggabungkan skrining klinis dan teknologi AI.</p>
						</div>

						{/* Card 3 */}
						<div className="bg-base-100 border border-base-300 rounded-xl flex flex-col justify-center items-center gap-4 py-4 px-5 text-base-content">
							<div className="bg-base-content w-fit p-3 rounded-xl">
								<FiUsers className="w-10 h-10 text-primary" />
							</div>
							<p className="font-semibold">Mudah Digunakan</p>
							<p className="text-center text-sm">Interface yang ramah dan mudah dipahami untuk semua kalangan.</p>
						</div>
					</div>
				</section>
			</div>

			{/* Tentang RuangAman */}
			<section id="tentang" className="py-20 bg-base-100 text-base-content">
				<div className="container mx-auto px-4 max-w-6xl">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-6">Tentang RuangAman</h2>
						<p className="text-xl max-w-3xl mx-auto">Kami memahami bahwa langkah pertama untuk mencari bantuan kesehatan mental bisa terasa menakutkan. RuangAman hadir sebagai jembatan yang aman dan nyaman.</p>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
						<div>
							<h3 className="text-2xl font-bold mb-6">Mengapa RuangAman?</h3>
							<div className="space-y-4">
								{[
									["Skrining Awal yang Akurat", "Menggunakan GAD-7 (Generalized Anxiety Disorder 7-item) yang telah terbukti secara klinis."],
									["Analisis AI yang Mendalam", "Mendapatkan insight personal berdasarkan jawaban dan narasi Anda."],
									["Laporan Lengkap", "Unduh hasil dalam format PDF untuk dibawa ke profesional."],
								].map(([title, desc], i) => (
									<div key={i} className="flex items-start space-x-3">
										<svg className="lucide lucide-circle-check-big w-6 h-6 text-success mt-1 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
											<path d="M21.801 10A10 10 0 1 1 17 3.335" />
											<path d="m9 11 3 3L22 4" />
										</svg>
										<div>
											<h4 className="font-semibold">{title}</h4>
											<p>{desc}</p>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="bg-base-200 rounded-2xl p-8 text-base-content">
							<div className="text-center">
								<div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 bg-neutral">
									<CiHeart className="w-10 h-10 text-primary" />
								</div>
								<h4 className="text-xl font-bold mb-4">Kesehatan Mental Itu Penting</h4>
								<p>1 dari 4 orang mengalami masalah kesehatan mental. Anda tidak sendirian, dan mencari bantuan adalah tanda kekuatan.</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section id="cara-kerja" className="py-20 bg-base-100">
				<div className="container mx-auto px-4 max-w-6xl">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold text-base-content mb-6">Cara Kerja</h2>
						<p className="text-xl text-base-content/70">Proses sederhana dalam 4 langkah</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{[
							{ step: 1, title: "Isi Kuesioner GAD-7", desc: "Jawab 7 pertanyaan tentang kecemasan dalam 2 minggu terakhir" },
							{ step: 2, title: "Ceritakan Perasaan", desc: "Tulis narasi bebas tentang kondisi mental Anda" },
							{ step: 3, title: "Analisis AI", desc: "Sistem AI akan menganalisis jawaban dan memberikan insight" },
							{ step: 4, title: "Unduh Laporan", desc: "Dapatkan laporan lengkap dalam format PDF" },
						].map(({ step, title, desc }) => (
							<div key={step} className="rounded-lg border bg-card text-card-foreground shadow-sm border-base-300 hover:shadow-lg transition-shadow">
								<div className="p-6 text-center">
									<div className="w-12 h-12 bg-primary text-primary-content rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">{step}</div>
									<h3 className="font-semibold text-base-content mb-2">{title}</h3>
									<p className="text-base-content/70 text-sm">{desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 bg-gradient-to-r from-primary to-secondary">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Siap Untuk Memulai Perjalanan Kesehatan Mental Anda?</h2>
					<p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">Langkah pertama adalah yang terpenting. Mari mulai dengan tes sederhana yang bisa membantu Anda memahami kondisi mental saat ini.</p>
					<Link href="/test">
						<button className="inline-flex items-center justify-center gap-2 bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
							<LuBrain className="w-5 h-5 mr-2" />
							Mulai Tes GAD-7 Sekarang
							<LuArrowRight className="w-5 h-5 ml-2" />
						</button>
					</Link>
				</div>
			</section>
		</>
	);
}
