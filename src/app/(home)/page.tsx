// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 text-foreground flex flex-col">
      <div
        id="border-wrapper"
        className="border-l-2 border-r-2 border-zinc-950 mx-10"
      >
        <section className="relative flex flex-col items-center justify-center mx-5 px-6 py-32 bg-zinc-50 text-zinc-950 w-full">
          <div className="text-center w-full max-w-4xl">
            <h1 className="text-7xl md:text-7xl font-heading font-medium leading-tight text-left">
              Protect classroom data with precision.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-800 mt-4 mr-15">
              A workspace for students and teachers powered by role-based access
              control.
            </p>
            <div className="flex justify-start gap-4 mt-6 font-body">
              <a
                href="#"
                className="px-8 py-4 bg-zinc-950 text-zinc-50 text-xl font-body transition hover:bg-zinc-50 hover:text-zinc-950"
              >
                Try now
              </a>
              <a
                href="#"
                className="px-8 py-4 border border-zinc-950 text-zinc-950 text-xl hover:bg-gray-800 hover:text-zinc-50 hover:rounded-full transition"
              >
                Request a Demo
              </a>
            </div>
          </div>
        </section>
      </div>
      <div id="border-wrapper" className="border-r-2 border-zinc-950 mx-10">
        <div id="border-wrapper" className=" border-r-2 border-zinc-950 mx-10">
          <section className="relative flex flex-col items-center justify-center mx-5 px-6 py-32 bg-zinc-50 text-zinc-950 w-full">
            <div className="text-center w-full max-w-4xl">
              <h2 className="text-4xl font-heading font-medium text-center">
                A workspace to transform your data
              </h2>
              <p className="text-xl mt-6 text-zinc-800 text-center">
                Modern, secure authentication and instant row-level security
                powered by Supabase.
              </p>
              <div className="grid md:grid-cols-2 gap-12 mt-16">
                <div className="flex flex-col items-start space-y-4">
                  <div className="p-4 bg-white border border-zinc-300">
                    <p className="text-zinc-700">
                      <strong>Add class to your record?</strong>
                    </p>
                    <p className="text-sm text-zinc-600">
                      You&apos;ve selected class 12C. Would you like to add to
                      record?
                    </p>
                    <button className="mt-2 px-4 py-2 bg-zinc-950 text-white text-sm rounded hover:bg-zinc-800 transition">
                      Add to record
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-start space-y-4">
                  <div className="p-4 bg-white border border-zinc-300">
                    <p className="text-zinc-700">
                      <strong>View through multiple rows powered by RLS</strong>
                    </p>
                    <p className="text-sm text-zinc-600">Check out the roles</p>
                    <div className="mt-2">
                      <div className="flex items-center mt-2">
                        <button className="px-2 py-1 bg-zinc-200 text-zinc-700 text-sm rounded hover:bg-zinc-300 transition">
                          Student
                        </button>
                        <button className="ml-2 px-2 py-1 bg-zinc-200 text-zinc-700 text-sm rounded hover:bg-zinc-300 transition">
                          Teacher
                        </button>
                        <button className="ml-2 px-2 py-1 bg-zinc-200 text-zinc-700 text-sm rounded hover:bg-zinc-300 transition">
                          Headteacher / Admin
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* Demo Accounts */}
      <div id="border-wrapper" className="border-l-2  border-zinc-950 mx-10">
        <section className="py-32 bg-zinc-50  border-gray-800">
          <div className="max-w-6xl mx-auto px-6 text-center space-y-12">
            <h2 className="text-4xl font-heading font-medium text-center">
              Try a demo using pre-made roles
            </h2>
            <p className="text-xl mt-4 text-zinc-800 text-center">
              Explore features offered by different roles.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-zinc-950 hover:text-zinc-50">
              <Link
                href="/login?demo=student"
                className="p-8 bg-zinc-50 hover:bg-zinc-800 border-1 border-zinc-950 transition"
              >
                <h3 className="text-xl font-body my-4 hover:text-zinc-50">
                  Student
                </h3>
                <div className="border-b-1 border-zinc-950 hover:border-zinc-50"></div>
                <p className="text-zinc-800 my-4">
                  View your own progress records.
                </p>
              </Link>
              <Link
                href="/login?demo=student"
                className="p-8 bg-zinc-50 hover:bg-zinc-800 border-1 border-zinc-950 transition"
              >
                <h3 className="text-xl font-body my-4 hover:text-zinc-50">
                  Teacher
                </h3>
                <div className="border-b-1 border-zinc-950 hover:border-zinc-50"></div>
                <p className="text-zinc-800 my-4">
                  Manage progress for your classes.
                </p>
              </Link>
              <Link
                href="/login?demo=student"
                className="p-8 bg-zinc-50 hover:bg-zinc-800 border-1 border-zinc-950 transition"
              >
                <h3 className="text-xl font-body my-4 hover:text-zinc-50">
                  Headteacher
                </h3>
                <div className="border-b-1 border-zinc-950 hover:border-zinc-50"></div>
                <p className="text-zinc-800 my-4">
                  View all classes in your school.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
