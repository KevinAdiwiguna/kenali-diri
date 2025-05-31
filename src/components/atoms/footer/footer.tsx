export const Footer = () => {
	return (
		<footer className="bg-base-200 text-base-content py-12">
			<div className="container mx-auto px-4">
				<div className="text-center">
					<div className="flex items-center justify-center space-x-3 mb-6">
						<div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-6 h-6 text-white">
								<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
							</svg>
						</div>
						<h3 className="text-2xl font-bold">RuangAman</h3>
					</div>
					<p className="text-base-content/70 mb-6 max-w-2xl mx-auto">Platform digital yang aman untuk skrining awal kesehatan mental. Ingat, hasil tes ini bukan diagnosis medis. Selalu konsultasikan dengan profesional kesehatan mental untuk penanganan yang tepat.</p>
					<div className="border-t border-base-300 pt-6">
						<p className="text-sm text-base-content/60">© 2024 RuangAman. Dibuat dengan ❤️ untuk kesehatan mental yang lebih baik.</p>
					</div>
				</div>
			</div>
		</footer>
	);
};
