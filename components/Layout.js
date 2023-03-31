import Head from "next/head";

export default function Layout({ children, title = "Default title" }) {
  return(
    <div className="flex justify-center items-center flex-col min-h-screen text-white font-mono bg-gray-600">
      <Head>{title}</Head>
      <main className="flex flex-1 justify-center items-center flex-col">
        {children}
      </main>
      <footer className="flex w-full h-6 justify-center items-center text-gray-400 text-sm ">
        © {new Date().getFullYear()}, Built with
      </footer>
    </div>
  )
}