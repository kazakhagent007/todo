import { Button } from '@headlessui/react';
import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  return (
    <div className="flex flex-col items-center mt-[100px] gap-4">
      <h2>
        To <span className="text-blue">create</span>/<span className="text-green">update</span>/
        <span className="text-red">delete</span> todo list
      </h2>
      <Link href={token ? '/list' : '/login'} passHref>
        <Button className="rounded bg-gray-800 py-2 px-4 text-sm text-white data-[hover]:bg-black data-[active]:bg-black">
          Start
        </Button>
      </Link>
    </div>
  );
}
