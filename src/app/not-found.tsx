import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-2xl font-semibold text-brand-purple">
            404
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-black sm:text-5xl">Page not found</h1>
          <p className="mt-6 text-base leading-7 text-brand-black">Sorry, we couldn’t find the page/data you’re looking for.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-brand-black bg-brand-text-brand-purple px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-golden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-text-brand-purple"
            >
              Go back home
            </Link>
            <a href="#" className="text-sm font-semibold text-brand-black">
              if this problem persists please contact support <span aria-hidden="true">
                internal advisor team one outlook
              </span>
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
