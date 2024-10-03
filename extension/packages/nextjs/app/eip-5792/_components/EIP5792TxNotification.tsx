import { useShowCallsStatus } from "wagmi/experimental";

export const EIP5972TxNotification = ({ message, statusId }: { message: string; statusId?: string }) => {
  const { showCallsStatusAsync } = useShowCallsStatus();
  return (
    <div className="flex flex-col ml-1 cursor-default space-y-2 overflow-hidden">
      <p className="my-0">{message}</p>
      {statusId && (
        <button
          className="btn btn-primary btn-sm"
          onClick={async () => {
            try {
              await showCallsStatusAsync({ id: statusId });
            } catch (error) {
              console.error("Error showing status", error);
            }
          }}
        >
          see status
        </button>
      )}
    </div>
  );
};
