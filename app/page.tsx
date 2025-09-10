import { Button } from "@/components/ui/button"
import { Play, Info, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
  const featuredContent = [
    {
      id: 1,
      title: "The Dark Knight",
      description:
        "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      backdrop: "/placeholder-jaf0f.png?key=57152",
      logo: "/dark-knight-movie-logo.jpg",
    },
  ]

  const trendingMovies = [
    { id: 1, title: "Stranger Things", image: "/stranger-things-inspired-poster.png" },
    { id: 2, title: "The Office", image: "/the-office-poster.png" },
    { id: 3, title: "Breaking Bad", image: "/breaking-bad-inspired-poster.png" },
    { id: 4, title: "Inception", image: "/inception-movie-poster.png" },
    { id: 5, title: "Pulp Fiction", image: "/pulp-fiction-poster.png" },
    { id: 6, title: "The Matrix", image: "/matrix-movie-poster.png" },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-8">
            <h1 className="text-red-600 text-3xl font-bold">NETFLIXCLONE</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-white hover:text-red-500">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="bg-red-600 hover:bg-red-700 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src={featuredContent[0].backdrop || "/placeholder.svg"}
            alt="Featured content backdrop"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20">
          <div className="max-w-2xl">
            <Image
              src={featuredContent[0].logo || "/placeholder.svg"}
              alt="Featured content logo"
              width={400}
              height={200}
              className="mb-6"
            />
            <p className="text-lg text-gray-200 mb-8 leading-relaxed">{featuredContent[0].description}</p>
            <div className="flex items-center space-x-4">
              <Link href="/auth/sign-up">
                <Button size="lg" className="bg-white text-black hover:bg-gray-200 flex items-center space-x-2">
                  <Play className="w-5 h-5 fill-current" />
                  <span>Get Started</span>
                </Button>
              </Link>
              <Button
                size="lg"
                variant="secondary"
                className="bg-gray-600/70 text-white hover:bg-gray-600 flex items-center space-x-2"
              >
                <Info className="w-5 h-5" />
                <span>More Info</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-5xl font-bold mb-6 text-balance">Unlimited movies, TV shows, and more</h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">Watch anywhere. Cancel anytime.</p>
              <p className="text-lg text-gray-400 leading-relaxed">
                Ready to watch? Enter your email to create or restart your membership.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/netflix-streaming-on-tv-and-devices.jpg"
                alt="Streaming on multiple devices"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="order-2 md:order-1 relative">
              <Image
                src="/download-shows-offline-mobile-phone.jpg"
                alt="Download your shows"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-5xl font-bold mb-6 text-balance">Download your shows to watch offline</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Save your favorites easily and always have something to watch.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6 text-balance">Watch everywhere</h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/watch-on-multiple-devices-laptop-tablet-phone.jpg"
                alt="Watch on multiple devices"
                width={600}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <Button variant="ghost" className="text-red-500 hover:text-red-400 flex items-center space-x-1">
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingMovies.map((movie) => (
              <div key={movie.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg transition-transform group-hover:scale-105">
                  <Image
                    src={movie.image || "/placeholder.svg"}
                    alt={movie.title}
                    width={300}
                    height={400}
                    className="object-cover w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {movie.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl font-bold mb-6 text-balance">
            Ready to watch? Enter your email to create or restart your membership.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-4 text-lg bg-black/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
            />
            <Link href="/auth/sign-up">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-red-600 text-xl font-bold mb-4">NETFLIXCLONE</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your ultimate streaming destination for movies and TV shows.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Legal Notices
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 NetflixClone. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
