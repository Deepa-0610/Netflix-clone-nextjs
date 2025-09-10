import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import Link from "next/link"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />

      {/* Logo */}
      <div className="absolute top-8 left-8">
        <Link href="/" className="text-red-600 text-3xl font-bold">
          NETFLIXCLONE
        </Link>
      </div>

      {/* Error Message */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-black/70 border-gray-700 backdrop-blur-sm">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-white">Authentication Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              {params?.error ? (
                <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-md">
                  <p className="text-sm font-medium">Error Code: {params.error}</p>
                </div>
              ) : (
                <p className="text-gray-300 text-sm">An unspecified authentication error occurred.</p>
              )}
              <p className="text-gray-400 text-sm">
                Please try signing in again or contact support if the problem persists.
              </p>
            </div>
            <div className="flex flex-col space-y-3">
              <Link href="/auth/login">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Try Again</Button>
              </Link>
              <Link href="/">
                <Button variant="ghost" className="w-full text-gray-400 hover:text-white">
                  Return to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
