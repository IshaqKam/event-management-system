import { memo } from 'react';

function InfoCard({ count, heading }: { count: number; heading: string }) {
  return (
    <div className="shadow-lg h-20 w-52 p-6">
      <div className="container gap-3 flex items-stretch justify-between">
        <div className="flex flex-col">
          <p className="text-sm text-gray-600">{heading}</p>
        </div>
        <div className="flex flex-col">
          <h4 className="text-xl font-semibold">{count}</h4>
        </div>
      </div>
    </div>
  );
}

export default memo(InfoCard);
