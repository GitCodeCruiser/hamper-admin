import { memo, useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

interface StatusSwitchProps {
  status: string | boolean;
  id: string;
  onStatusChange: (id: string, newStatus: boolean) => Promise<void>;
  loading?: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
  confirmTitle?: string;
  refetch: () => void;
  confirmMessageGenerator?: (newStatus: boolean) => string;
}

const CommonStatusSwitch = ({
  status,
  id,
  onStatusChange,
  refetch,
  loading = false,
  activeLabel = 'Active',
  inactiveLabel = 'Inactive',
  confirmTitle = 'Confirm Status Change',
  confirmMessageGenerator = (newStatus) =>
    `Are you sure you want to ${newStatus ? 'activate' : 'deactivate'} this item?`,
}: StatusSwitchProps) => {
  const initialStatus =
    typeof status === 'string' ? status.toLowerCase() === 'active' : Boolean(status);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [pendingStatus, setPendingStatus] = useState(currentStatus);

  const handleStatusChange = useCallback(() => {
    setPendingStatus(!currentStatus);
    setDialogOpen(true);
  }, [currentStatus]);

  const handleCancel = useCallback(() => {
    setPendingStatus(currentStatus);
    setDialogOpen(false);
  }, [currentStatus]);

  const handleConfirm = useCallback(async () => {
    try {
      await onStatusChange(id, !currentStatus);
      refetch();
      setCurrentStatus(!currentStatus);
    } catch (error) {
      toast.error('An error occurred while updating status');
    }
    setDialogOpen(false);
  }, [id, currentStatus, onStatusChange, refetch]);

  return (
    <div className="flex items-center gap-2">
      {/* Toggle Switch */}
      <button
        disabled={loading}
        onClick={handleStatusChange}
        className={`relative inline-flex h-5 w-10 items-center rounded-full transition ${currentStatus ? 'bg-green-600' : 'bg-gray-300'} ${loading && 'cursor-not-allowed opacity-50'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${currentStatus ? 'translate-x-5' : 'translate-x-1'}`}
        />
      </button>

      {/* Status Label */}
      <span
        className={`text-sm font-semibold ${currentStatus ? 'text-green-700' : 'text-gray-500'}`}
      >
        {currentStatus ? activeLabel : inactiveLabel}
      </span>

      {/* Confirmation Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-[360px] rounded-lg bg-white p-5 shadow-xl">
            <h3 className="mb-2 text-lg font-semibold">{confirmTitle}</h3>

            <p className="mb-6 text-sm text-gray-600">{confirmMessageGenerator(pendingStatus)}</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(CommonStatusSwitch);
