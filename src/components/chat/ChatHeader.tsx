type ChatHeaderProps = {
  onClose: () => void;
};

export default function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <h3 className="font-semibold">Customer Support</h3>

      <button
        onClick={onClose}
        aria-label="Close chat"
        className="text-gray-500 hover:text-black"
      >
        ✕
      </button>
    </div>
  );
}
