export default {
  imports: `
  import SendNotification from "./SendNotification";
  import { BellAlertIcon, BoltIcon, CubeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
  import { InstallPWA } from "~~/components/InstallPWA";`,

  description: `
  <div className="flex flex-col items-center gap-4 mb-8">
    <SendNotification />
  </div>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <div className="text-primary"><BoltIcon className="h-8 w-8" /></div>
          <h2 className="card-title">Quick Start</h2>
        </div>
        <p>Get your Web3 project up and running in minutes with our pre-configured setup.</p>
      </div>
    </div>
  
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <div className="text-primary"><CubeIcon className="h-8 w-8" /></div>
          <h2 className="card-title">Smart Contracts</h2>
        </div>
        <p>Easily deploy and interact with Solidity smart contracts.</p>
      </div>
    </div>
  
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <div className="text-primary"><GlobeAltIcon className="h-8 w-8" /></div>
          <h2 className="card-title">PWA Support</h2>
        </div>
        <p>Built-in Progressive Web App capabilities for offline access and improved performance with{" "}
          <a href="https://serwist.pages.dev/" target="_blank" rel="noopener noreferrer" className="underline">
            Serwist
          </a>
          .</p>
      </div>
    </div>
  
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <div className="text-primary"><BellAlertIcon className="h-8 w-8" /></div>
          <h2 className="card-title">Web Push Notifications</h2>
        </div>
        <p>Engage users with push notifications, even when the app is closed.</p>
      </div>
    </div>
  </div>
  
  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 bg-base-100 rounded-lg p-4">
    <span className="text-lg font-semibold">Learn more:</span>
    <a href="https://serwist.pages.dev/" target="_blank" rel="noopener noreferrer" className="underline">Serwist</a>
    <a href="https://scaffoldeth.io" target="_blank" rel="noopener noreferrer" className="underline">Scaffold-ETH 2</a>
  </div>`,

  externalExtensionName: ["PWA"],
};
