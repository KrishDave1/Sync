/** @format */

//This is also a special file name that is created when loading state is required.

//Inherently the structure looks like this:
{
  /* <Suspense fallback={<Loading />}>
  <Page />
</Suspense>; */
} // meaning till the Page is loading we fallback to the Loading component.

import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return (
    <div className='w-full flex flex-col gap-3'>
      <Skeleton className='mb-4' height={60} width={500} />
      <Skeleton height={20} width={150} />
      <Skeleton height={50} width={400} />
    </div>
  );
};

export default loading;
