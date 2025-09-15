import { LogoutButton } from "@/components/logout-button";

export default function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-md space-y-4">
        <LogoutButton />
      </div>
    </div>
  );
}
