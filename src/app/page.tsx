import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto min-h-[100dvh] grid grid-rows-[auto_1fr_auto]">
      <nav>
        <SiteHeader />
      </nav>
      <div>
        <section className="flex flex-col w-full items-center px-5 py-[5rem]">
          <h1 className="text-4xl font-bold">News Applied AI</h1>
          <p className="text-lg">
            Your source for AI innovations in applied AI.
          </p>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
