import Image from "next/image"
import GTSlogo from "~/data"

export default function AuthLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 my-16">
      <div className="flex flex-col items-center rounded-2xl mt-12 py-4 px-8 bg-brand-purple gap-2">
        <div className="flex flex-col items-center  justify-center gap-4">
          <div className="flex flex-col items-center my-4  px-4 justify-center">
            <Image src={GTSlogo} sizes="100vw" className="h-14" alt="gts logo" />
            <h1 className="scroll-m-20 text-4xl text-brand-golden text-center font-extrabold capitalize tracking-tight lg:text-5xl">
              Commercial bank of ethiopia
            </h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
