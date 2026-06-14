import { createSignal } from "solid-js";

export default function Counter() {
  const [count, setCount] = createSignal(0);

  console.log('Counter', localStorage);

  return (
    <button
      class="w-[200px] rounded-full bg-gray-700 border border-gray-300 focus:border-gray-400 active:border-gray-400 px-[2rem] py-[1rem]"
      onClick={() => setCount(count() + 1)}
    >
      Clicks: {count()}
    </button>
  );
}
