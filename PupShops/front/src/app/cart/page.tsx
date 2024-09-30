import CartContent from "@/components/CartContent/cartContent";

export default function Cart() {
  return (
    <div className="flex justify-center mt-20 items-center min-h-screen p-4 bg-slate-50">
      <div className="border-2 border-teal-600 rounded-lg p-6 w-full max-w-md shadow-md">
        <h1 className="text-2xl font-bold text-center text-teal-600 mb-4">
          Tu Carrito
        </h1>
        <CartContent />
      </div>
    </div>
  );
}
