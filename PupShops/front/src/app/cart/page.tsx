import CartContent from "@/components/CartContent/cartContent";

export default function Cart() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-slate-50">
      <div className="border-2 rounded-lg p-6 w-full max-w-md">
        <CartContent />
      </div>
    </div>
  );
}
