"use client";

import React, { useCallback, useEffect, useState } from "react";
import { BoltIcon } from "@heroicons/react/24/outline";
import { EntityInfo, getEventCounts, getRecentEvents, getSchemaEntities } from "~~/utils/graphql";

/**
 * Envio Indexer Page
 * This page will display indexed data from the Envio indexer
 */
const EnvioPage = () => {
  const [indexerStatus, setIndexerStatus] = useState<"checking" | "active" | "inactive">("checking");
  const [lastChecked, setLastChecked] = useState<Date | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<string | null>(null);
  const [eventCounts, setEventCounts] = useState<any>(null);
  const [recentEvents, setRecentEvents] = useState<any>(null);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [schemaEntities, setSchemaEntities] = useState<EntityInfo[]>([]);

  // Check indexer status by checking the console/state endpoint
  const checkIndexerStatus = async () => {
    console.log("🔍 Checking Envio indexer status...");
    try {
      // Check the console/state endpoint - this returns 200 when indexer is running
      // Using no-cors mode to bypass CORS restrictions
      console.log("📡 Making request to http://localhost:9898/console/state");
      const response = await fetch("http://localhost:9898/console/state", {
        method: "GET",
        mode: "no-cors",
        signal: AbortSignal.timeout(2000),
      });

      console.log("📊 Response status:", response.status);
      console.log("📊 Response ok:", response.ok);
      console.log("📊 Response type:", response.type);

      // With no-cors mode, we can't read the response, but if the request succeeds,
      // it means the endpoint is reachable and the indexer is running
      console.log("✅ Indexer is ACTIVE - endpoint reachable");
      setIndexerStatus("active");
    } catch (error) {
      // If we can't reach the endpoint, indexer is not running
      console.log("❌ Indexer is INACTIVE - error:", error);
      setIndexerStatus("inactive");
    }
    setLastChecked(new Date());
  };

  // Fetch events from the indexer
  const fetchEvents = useCallback(async () => {
    if (indexerStatus !== "active") return;

    setIsLoadingEvents(true);
    try {
      console.log("📊 Fetching events from indexer...");

      // First get the schema entities
      const entities = await getSchemaEntities();
      setSchemaEntities(entities);
      console.log("📊 Schema entities loaded:", entities);

      if (entities.length === 0) {
        console.warn("No entities found in schema");
        return;
      }

      const [counts, events] = await Promise.all([getEventCounts(), getRecentEvents(5)]);

      setEventCounts(counts);
      setRecentEvents(events);
      console.log("📊 Events loaded:", { counts, events });
    } catch (error) {
      console.error("❌ Error fetching events:", error);
    } finally {
      setIsLoadingEvents(false);
    }
  }, [indexerStatus]);

  // Update Envio config
  const updateEnvioConfig = async () => {
    setIsUpdating(true);
    setUpdateMessage(null);

    try {
      console.log("🔄 Updating Envio config...");
      const response = await fetch("/api/envio/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        setUpdateMessage(`✅ ${result.message}`);
        console.log("✅ Config updated successfully");

        // Auto-hide success message after 10 seconds
        setTimeout(() => {
          setUpdateMessage(null);
        }, 10000);
      } else {
        setUpdateMessage(`❌ ${result.message}`);
        console.error("❌ Config update failed:", result.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      setUpdateMessage(`❌ Failed to update config: ${errorMessage}`);
      console.error("❌ Error updating config:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleGenerateConfig = () => {
    if (
      confirm(
        "⚠️ Are you sure you want to regenerate?\n\n" +
          "This will rewrite these files with boilerplate code:\n" +
          "• config.yaml\n" +
          "• schema.graphql\n" +
          "• src/EventHandlers.ts\n\n" +
          "Custom modifications will be lost. Continue?",
      )
    ) {
      updateEnvioConfig();
    }
  };

  // Check status on component mount and every 30 seconds
  useEffect(() => {
    checkIndexerStatus();
    const interval = setInterval(checkIndexerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // Fetch events when indexer becomes active
  useEffect(() => {
    if (indexerStatus === "active") {
      fetchEvents();
    }
  }, [indexerStatus, fetchEvents]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8">
      <div className="max-w-4xl w-full px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img src="https://docs.envio.dev/img/envio-logo.png" alt="Envio Logo" className="h-16 w-auto" />
          </div>
          <p className="text-lg text-base-content/70">The fastest, most flexible way to get on-chain data.</p>
        </div>

        {/* Main Content */}
        <div className="bg-base-100 rounded-lg shadow-lg p-6">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Welcome to Envio</h2>
            <p className="text-sm text-base-content/70 mt-1">
              Make sure to read the Prerequisites and How to Use sections below!
            </p>

            {/* Status Card */}
            <div
              className={`rounded-lg p-4 mb-6 ${
                indexerStatus === "active"
                  ? "bg-success/10 border border-success/20"
                  : indexerStatus === "inactive"
                    ? "bg-error/10 border border-error/20"
                    : "bg-warning/10 border border-warning/20"
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <div
                  className={`w-3 h-3 rounded-full mr-2 ${
                    indexerStatus === "active"
                      ? "bg-success"
                      : indexerStatus === "inactive"
                        ? "bg-error"
                        : "bg-warning animate-pulse"
                  }`}
                ></div>
                <span
                  className={`font-semibold ${
                    indexerStatus === "active"
                      ? "text-success"
                      : indexerStatus === "inactive"
                        ? "text-error"
                        : "text-warning"
                  }`}
                >
                  Indexer Status:{" "}
                  {indexerStatus === "active" ? "Active" : indexerStatus === "inactive" ? "Inactive" : "Checking..."}
                </span>
              </div>
              <p className="text-sm text-base-content/70">
                {indexerStatus === "inactive" ? (
                  <>
                    Indexer is not running. Start the indexer by running <code>yarn envio:dev</code> from the project
                    root.
                    <br />
                    (be sure to generate it first if you haven&apos;t already)
                  </>
                ) : indexerStatus === "checking" ? (
                  "Checking indexer status..."
                ) : (
                  ""
                )}
              </p>
              {lastChecked && (
                <p className="text-xs text-base-content/50 mt-2">Last checked: {lastChecked.toLocaleTimeString()}</p>
              )}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs font-semibold">GraphQL Endpoint:</span>
                <code className="text-xs bg-base-300 px-2 py-1 rounded flex-1">http://localhost:8080/v1/graphql</code>
                <button
                  onClick={() => navigator.clipboard.writeText("http://localhost:8080/v1/graphql")}
                  className="btn btn-ghost btn-xs"
                  title="Copy to clipboard"
                >
                  📋
                </button>
              </div>
              {indexerStatus === "inactive" && (
                <button onClick={checkIndexerStatus} className="btn btn-sm btn-outline mt-2">
                  Retry Check
                </button>
              )}
            </div>

            {/* Generate Button */}
            <div className="bg-base-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-2 flex items-center">
                <BoltIcon className="h-5 w-5 mr-2 text-primary" />
                Generate Boilerplate Indexer
              </h3>
              <p className="text-sm text-base-content/70 mb-3">
                Generate the Envio configuration files based on your current deployed contracts (deployed via yarn
                deploy). This will overwrite the config.yaml, schema.graphql, and EventHandlers.ts files to set up a
                boilerplate indexer ready to index these contracts
              </p>
              <button
                onClick={handleGenerateConfig}
                disabled={isUpdating}
                className={`btn btn-primary btn-sm ${isUpdating ? "loading" : ""}`}
              >
                {isUpdating ? "Generating..." : "Generate"}
              </button>
              {updateMessage && (
                <div
                  className={`mt-3 p-2 rounded text-sm ${
                    updateMessage.startsWith("✅")
                      ? "bg-success/10 text-success border border-success/20"
                      : "bg-error/10 text-error border border-error/20"
                  }`}
                >
                  {updateMessage}
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-base-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-center flex items-center justify-center">
                  <BoltIcon className="h-5 w-5 mr-2 text-primary" />
                  Envio Console
                </h3>
                <p className="text-sm text-base-content/70 mb-3">View your indexer progress and analytics.</p>
                <a
                  href="https://envio.dev/console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Open Console
                </a>
              </div>

              <div className="bg-base-200 rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-center flex items-center justify-center">
                  <BoltIcon className="h-5 w-5 mr-2 text-primary" />
                  Hasura Console
                </h3>
                <p className="text-sm text-base-content/70 mb-3">View and query all your indexed data in Hasura.</p>
                <a
                  href="http://localhost:8080/console/data/manage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Open Hasura
                </a>
              </div>
            </div>

            {/* Events Display */}
            {indexerStatus === "active" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-base-200 rounded-lg p-4 relative">
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={fetchEvents}
                      disabled={isLoadingEvents}
                      className="btn btn-sm btn-ghost btn-circle"
                      title="Refresh Event Counts"
                    >
                      {isLoadingEvents ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <h3 className="font-semibold mb-2 text-center flex items-center justify-center">
                    <BoltIcon className="h-5 w-5 mr-2 text-primary" />
                    Event Counts
                  </h3>
                  {isLoadingEvents ? (
                    <div className="text-sm text-base-content/70">Loading events...</div>
                  ) : eventCounts ? (
                    <div className="space-y-2">
                      {Object.entries(eventCounts).map(([eventType, count]) => {
                        if (count === 0) return null;
                        return (
                          <div key={eventType} className="flex justify-between text-sm">
                            <span className="text-base-content/70">{eventType.replace(/_/g, " ")}</span>
                            <span className="font-semibold text-primary">{String(count)}</span>
                          </div>
                        );
                      })}
                      {Object.values(eventCounts).every(count => count === 0) && (
                        <div className="text-sm text-base-content/50">No events indexed yet</div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-base-content/70">Failed to load events</div>
                  )}
                </div>

                <div className="bg-base-200 rounded-lg p-4 relative">
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={fetchEvents}
                      disabled={isLoadingEvents}
                      className="btn btn-sm btn-ghost btn-circle"
                      title="Refresh Recent Events"
                    >
                      {isLoadingEvents ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <h3 className="font-semibold mb-2 text-center flex items-center justify-center">
                    <BoltIcon className="h-5 w-5 mr-2 text-primary" />
                    Recent Events
                  </h3>
                  {isLoadingEvents ? (
                    <div className="text-sm text-base-content/70">Loading recent events...</div>
                  ) : recentEvents ? (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {Object.entries(recentEvents).map(([eventType, events]: [string, any]) => {
                        if (!events || events.length === 0) return null;

                        // Find the entity info for this event type
                        const entityInfo = schemaEntities.find(e => e.name === eventType);

                        return events.map((event: any, index: number) => (
                          <div key={`${eventType}-${index}`} className="text-xs bg-base-300 p-2 rounded">
                            <div className="font-semibold text-primary mb-1">{eventType.replace(/_/g, " ")}</div>

                            {/* Dynamically render fields based on schema */}
                            {entityInfo &&
                              entityInfo.fields.map(field => {
                                const value = event[field.name];
                                if (value === undefined || value === null) return null;

                                return (
                                  <div key={field.name} className="text-left">
                                    <span className="font-bold text-base-content">{field.name}:</span>{" "}
                                    <span className="font-mono">
                                      {typeof value === "object" ? JSON.stringify(value) : value.toString()}
                                    </span>
                                  </div>
                                );
                              })}

                            {/* Fallback for unknown fields */}
                            {!entityInfo &&
                              Object.entries(event).map(([key, value]) => {
                                return (
                                  <div key={key} className="text-left">
                                    <span className="font-bold text-base-content">{key}:</span>{" "}
                                    <span className="font-mono">
                                      {typeof value === "object" ? JSON.stringify(value) : value?.toString()}
                                    </span>
                                  </div>
                                );
                              })}
                          </div>
                        ));
                      })}
                      {Object.values(recentEvents).every((events: any) => !events || events.length === 0) && (
                        <div className="text-sm text-base-content/50">No recent events</div>
                      )}
                    </div>
                  ) : (
                    <div className="text-sm text-base-content/70">Failed to load recent events</div>
                  )}
                </div>
              </div>
            )}

            {/* Prerequisites */}
            <div className="mt-8 p-4 bg-info/10 border border-info/20 rounded-lg">
              <h3 className="font-semibold text-info mb-3">Prerequisites</h3>
              <p className="text-sm text-base-content/70 mb-3">
                Make sure you have the following installed before using the Envio indexer:
              </p>
              <ul className="text-sm text-base-content/70 text-left space-y-1">
                <li>
                  • <strong>Node.js v20</strong> - Required for the development environment
                </li>
                <li>
                  • <strong>pnpm v8+</strong> - Package manager (use v8 or newer)
                </li>
                <li>
                  • <strong>Docker Desktop</strong> - Required for running the indexer locally
                </li>
              </ul>
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
              <h3 className="font-semibold text-success mb-3">How to Use</h3>
              <div className="text-sm text-base-content/70 space-y-3">
                <p>
                  <strong>Step 1:</strong> Deploy your smart contracts using{" "}
                  <code className="bg-base-200 px-1 rounded">yarn deploy</code>. This is required for the indexer to
                  detect your contracts.
                </p>
                <p>
                  <strong>Step 2:</strong> Click &quot;Generate&quot; above to generate a boilerplate indexer that is
                  ready to index all events from your deployed contracts. You can regenerate this at any time.
                </p>
                <p>
                  <strong>Step 3:</strong> Run <code className="bg-base-200 px-1 rounded">yarn envio:dev</code> from the
                  project root to start the indexer. This will begin indexing your contract events.
                </p>
                <p>
                  <strong>Step 4:</strong> Customize your indexer in the{" "}
                  <code className="bg-base-200 px-1 rounded">packages/envio</code> folder.
                  <br />
                  <strong>
                    *Note: Until the indexer has an event to process it will look like it&apos;s permanently loading.
                  </strong>
                </p>
                <p>
                  Need help? Check out the{" "}
                  <a
                    href="https://docs.envio.dev/docs/HyperIndex/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Envio documentation
                  </a>{" "}
                  for detailed guides and examples.
                </p>
                <p className="font-semibold text-success">Happy indexing! 🚀</p>
                <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                  <p className="text-sm text-base-content/80">
                    <strong>Note:</strong> If you regenerate the boilerplate indexer after making changes, you&apos;ll
                    need to stop the running indexer (Ctrl+C) and restart it with{" "}
                    <code className="bg-base-200 px-1 rounded">yarn envio:dev</code>
                    for the changes to take effect.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvioPage;
