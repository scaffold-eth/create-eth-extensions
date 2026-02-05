export const fullContentOverride = `import Link from "next/link";
import type { NextPage } from "next";
import { ArrowTopRightOnSquareIcon, CogIcon, DocumentTextIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col grow pt-10">
        <div className="px-5 max-w-5xl w-full">
          <h1 className="text-center mb-8">
            <span className="block text-5xl font-bold">x402 SE-2 Extension</span>
          </h1>

          <div className="text-center mb-12">
            <p className="text-xl mb-4 leading-relaxed">
              <a href="https://scaffoldeth.io" className="underline" target="_blank" rel="noopener noreferrer">
                Scaffold-ETH 2
              </a>{" "}
              supercharged with <strong>HTTP 402</strong> payment-gated routes.
            </p>
            <p className="text-lg text-base-content/70 mb-6 leading-relaxed">
              Monetize your APIs and pages with micropayments using the x402 protocol. All the power of Scaffold-ETH 2
              with seamless payment middleware integration.
            </p>
          </div>
        </div>

        <div className="bg-base-300 w-full px-8 py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              <LockClosedIcon className="h-8 w-8 inline-block mr-2" />
              Protected Routes Demo
            </h2>

            <p className="text-center mb-8 text-base-content/70">
              Try accessing these protected routes - payment required to view content
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Link
                href="/payment/builder"
                className="flex flex-col bg-base-100 px-8 py-8 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold">Frontend Route</h3>
                  <span className="badge badge-secondary">$0.01</span>
                </div>
                <code className="text-sm bg-base-300 p-3 rounded mb-3 font-mono">/payment/builder</code>
                <p className="text-sm text-base-content/70 mb-4">
                  Protected page route - requires payment to access content
                </p>
                <div className="mt-auto flex items-center text-primary font-semibold">
                  Try it now <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-2 text-primary" />
                </div>
              </Link>

              <div className="flex flex-col bg-base-100 px-8 py-8 rounded-2xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold">API Route</h3>
                  <span className="badge badge-secondary">$0.01</span>
                </div>
                <code className="text-sm bg-base-300 p-3 rounded mb-3 font-mono">/api/payment/builder</code>
                <p className="text-sm text-base-content/70 mb-4">
                  Protected API endpoint - requires payment to access data
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold mb-2">1. Get a 402 payment required response:</p>
                    <code className="text-xs bg-base-300 p-2 rounded block font-mono">
                      curl http://localhost:3000/api/payment/builder
                    </code>
                  </div>
                  <div>
                    <p className="text-sm font-semibold mb-2">2. Send a crafted 402 response:</p>
                    <code className="text-xs bg-base-300 p-2 rounded block font-mono">yarn send402request</code>
                    <p className="text-xs text-base-content/60 mt-1">
                      (check{" "}
                      <code className="bg-base-300 px-1 rounded">packages/hardhat/scripts/send402request.ts</code>)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Configuration Note */}
            <div className="alert bg-base-100 border-2 border-base-content/20">
              <CogIcon className="h-6 w-6" />
              <div>
                <h4 className="font-bold">Configure Protected Routes</h4>
                <p className="text-sm mb-2">
                  Edit <code className="bg-base-300 px-2 py-1 rounded">middleware.ts</code> to add or modify protected
                  routes, set pricing, and configure payment options.
                </p>
                <p className="text-sm">
                  Tweak <code className="bg-base-300 px-2 py-1 rounded">.env.development</code> as needed (or copy it to{" "}
                  <code className="bg-base-300 px-2 py-1 rounded">.env.local</code> and fill in your data).
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full px-8 py-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              <DocumentTextIcon className="h-8 w-8 inline-block mr-2" />
              Resources & Documentation
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <a
                href="https://docs.cdp.coinbase.com/x402/welcome"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start bg-base-200 px-6 py-6 rounded-2xl hover:shadow-lg transition-all"
              >
                <div>
                  <h3 className="text-lg font-bold mb-2 flex items-center">
                    x402 Protocol Documentation
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-2" />
                  </h3>
                  <p className="text-sm text-base-content/70">
                    Learn about HTTP 402 payment protocol and how to implement it
                  </p>
                </div>
              </a>

              <a
                href="https://docs.scaffoldeth.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start bg-base-200 px-6 py-6 rounded-2xl hover:shadow-lg transition-all"
              >
                <div>
                  <h3 className="text-lg font-bold mb-2 flex items-center">
                    Scaffold-ETH 2 Docs
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-2" />
                  </h3>
                  <p className="text-sm text-base-content/70">Complete guide to building with Scaffold-ETH 2</p>
                </div>
              </a>

              <a
                href="https://www.npmjs.com/package/@x402/next"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start bg-base-200 px-6 py-6 rounded-2xl hover:shadow-lg transition-all"
              >
                <div>
                  <h3 className="text-lg font-bold mb-2 flex items-center">
                    @x402/next Package
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-2" />
                  </h3>
                  <p className="text-sm text-base-content/70">Next.js middleware for payment-gated routes (v2)</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;`;
