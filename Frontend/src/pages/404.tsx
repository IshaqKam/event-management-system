import Image from 'next/image';

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-semibold text-center">
            {'404: The page you are looking for isn’t here'}
          </h1>
          <p className="my-5 text-lg w-6/12 text-center">
            {
              'You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation'
            }
          </p>
          <div>
            <Image
              alt="404"
              width={450}
              height={300}
              className="bg-cover"
              src={'/images/errorPageImages/404.png'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
