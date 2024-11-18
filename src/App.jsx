import { useEffect, useRef } from "react";
import { useCallback } from "react";
import { useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charcterAllowed, setCharcterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // use ref hooks

  const refValue = useRef(null);

  const usecallfunc = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charcterAllowed) {
      str += "@#$%^!&*";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [numberAllowed, charcterAllowed, length, setPassword]);

  const copyPasswordClipBoard = () => {
    refValue.current?.select();
    // refValue.current?.setSelectionRange(0, 8);
    console.log(refValue.current?.setSelectionRange(0, 8), "pawan");
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    usecallfunc();
  }, [length, numberAllowed, charcterAllowed]);

  return (
    <>
      <div className="w-full bg-black h-[100vh] text-white">
        <div className="mx-auto mx-width-md text-center pt-[50px] ">
          <input
            type="text"
            className="w-[500px] h-[40px] text-black pl-4 "
            value={password}
            ref={refValue}
            readOnly
          />
          <button
            className="py-[10px] px-[30px] ml-2 bg-sky-700 hover:bg-sky-400"
            onClick={copyPasswordClipBoard}
          >
            Copy
          </button>
          <div className="  mt-4 item-center flex gap-x-1 text-center mx-auto justify-center">
            <input
              type="range"
              min={8}
              max={60}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label className="mr-3">Length:{length}</label>
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label className="mr-3">Number</label>
            <div>
              <input
                type="checkbox"
                id="charcterInput"
                defaultChecked={charcterAllowed}
                onChange={() => {
                  setCharcterAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="charcterInput" className="mr-3">
                Charctor
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
