


export default function FooterHome (){
    return(
        <footer className="bg-green-900 text-white py-10">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h2 className="text-xl font-bold mb-3">Smart Farm</h2>
                    <p className="text-sm">
                        Empowering farmers through innovative, AI-driven agriculture solutions. We bring technology closer to the soil.
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                       <li><a href="/" className="hover:underline">Home</a></li>
                       <li><a href="/auth/register" className="hover:underline">Register</a></li>
                       <li><a href="/auth/login" className="hover:underline">Login</a></li>
                       <li><a href="#" className="hover:underline">Services</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Contact</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Email: support@smartfarm.com</li>
                        <li>Phone: +254 712 345 678</li>
                        <li>Location: Nairobi, Kenya</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
                    <p className="text-sm mb-2">Stay updated with our latest features and insights.</p>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 rounded-md text-green-900 focus:outline-none"
                    />
                    <button className="mt-2 w-full bg-white text-green-900 font-semibold py-2 px-4 rounded-md hover:bg-gray-200 transition">
                        Subscribe
                    </button>
                </div>
            </div>
        
        </footer>
    )
}