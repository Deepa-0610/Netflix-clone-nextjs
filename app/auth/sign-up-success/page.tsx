import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function SignUpSuccessPage() {
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

      {/* Success Message */}
      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-black/70 border-gray-700 backdrop-blur-sm">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold text-white">Check Your Email</CardTitle>
            <CardDescription className="text-gray-400">
              We've sent you a confirmation link to complete your registration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                Please check your email and click the confirmation link to activate your account. Once confirmed, you'll
                be able to sign in and start streaming.
              </p>
              <div className="bg-gray-800/50 border border-gray-600 rounded-md p-4">
                <p className="text-gray-400 text-xs">
                  Didn't receive the email? Check your spam folder or contact support.
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <Link href="/auth/login">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Back to Sign In</Button>
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
