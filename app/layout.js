import './globals.css';
import { Navbar, Footer } from "@/components";

export const metadata = {
  title: 'Car Hub',
  description: 'All cars are for you!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='relative'>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
