export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      <div className="w-full h-auto rounded-lg bg-white shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] lg:px-5 lg:py-3">
        <div className="w-full border-b pb-2 flex justify-between">
          <h2 className="text-1xl text-gray-500">Home Page</h2>
          <button>
            New Project
          </button>
        </div>
      </div>
      <div className="w-full h-auto rounded-lg bg-white shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] lg:px-5 lg:py-3">
        <div className="w-full border-b pb-2 flex justify-between">
          <h2 className="text-1xl text-gray-500">Home Page</h2>
          <button>
            New Project
          </button>
        </div>
      </div>
    </div>
  )
}
