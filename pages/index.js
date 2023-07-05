import useSWR from "swr";
import {useEffect} from "react";
import {Matrix} from "@/components/matrix";

export default function Home() {
  return (
    <div className={'flex justify-center'}>
      <img className={'w-96 h-96'} src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNWkwwKsZdfhYQim4NLSHXExTU5Ne8_EFQVfF2O7HE3A&s'}/>
    </div>
  )
}
