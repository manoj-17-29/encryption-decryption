import { useState } from "react";
import CryptoJS from "crypto-js";
import { Button, Input, Textarea } from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaRegCopy } from "react-icons/fa";
import { CiLock, CiUnlock } from "react-icons/ci";
import { FaRegPaste } from "react-icons/fa6";
import { FiRefreshCw } from "react-icons/fi";

function App() {

   const [text, setText] = useState<string>("");
   const [key, setKey] = useState<string>("");
   const [ans, SetAns] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);
    const [encryptMode, setEncryptMode] = useState<boolean>(true);



     const handleEncrypt = () => {
       if (text) {
         const encrypted = CryptoJS.AES.encrypt(text, key).toString();
         SetAns(encrypted);
       } else {
         toast.error("Please Enter Text");
       }
     };

     const handleDecrypt = () => {
       if (text) {
         try {
           const bytes = CryptoJS.AES.decrypt(text, key);
           const originalText = bytes.toString(CryptoJS.enc.Utf8);
           console.log((originalText))
           if ((originalText)===""){
             toast.error("This Combination doesn't Exists.");
             SetAns("");
             return;
           }
            SetAns(originalText);
         } catch (e) {
           toast.error("Incorrect key or corrupted encrypted text.");
         }
       } else{
        toast.error("Please Enter Text ");
       }
     };

  return (
    <>
      <div>
        <div className="flex justify-center items-center h-dvh">
          <div className="w-full md:w-1/2 lg:w-5/12 px-3">
            <h1 className="font-bold text-2xl my-8">ENCYPTION & DECRYPTION</h1>

            <div className="flex gap-4 text-lg font-semibold">
              <p>Status : </p>
              <p> {encryptMode ? "Encryption Mode" : "Decryption Mode"}</p>
              <Button
                isIconOnly
                size="sm"
                className="border-2 border-black text-black font-semibold hover:text-white hover:bg-gray-900 duration-200"
                onClick={() => (
                  setEncryptMode(!encryptMode), toast.success("Mode Changed"), SetAns("")
                )}
              >
                <FiRefreshCw />
              </Button>
            </div>

            <div className="my-5 space-y-5">
              <Input
                label="Enter Secret Key"
                size="sm"
                className=""
                variant="faded"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                endContent={
                  <button
                    className="focus:outline-none px-1"
                    type="button"
                    onClick={() => setIsVisible(!isVisible)}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
                      <FaEyeSlash className="text-2xl text-default-400 pointer-events-none mb-1" />
                    ) : (
                      <FaEye className="text-2xl text-default-400 pointer-events-none mb-1" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />

              {/* <Divider className="w-11/12 mx-auto" /> */}

              <Input
                variant="faded"
                type="text"
                label={
                  encryptMode
                    ? "Enter Text to Encrypt"
                    : "Enter Text to Decrypt"
                }
                size="sm"
                className=""
                value={text}
                onChange={(e) => setText(e.target.value)}
                endContent={
                  <button
                    className="focus:outline-none px-1"
                    type="button"
                    onClick={async () => (
                      setText(await navigator.clipboard.readText()),
                      toast.success("Pasted from Clipboard")
                    )}
                  >
                    <FaRegPaste className="text-lg text-default-500 pointer-events-none mb-2" />
                  </button>
                }
              />

              <div className="flex justify-end me-2 py-2">
                {encryptMode ? (
                  <Button
                    className="border-2 border-black text-black font-semibold hover:text-white hover:bg-gray-900 duration-200"
                    onClick={handleEncrypt}
                  >
                    Encrypt
                    <CiLock />
                  </Button>
                ) : (
                  <Button
                    className="border-2 border-black text-black font-semibold hover:text-white hover:bg-gray-900 duration-200"
                    onClick={handleDecrypt}
                  >
                    Decrypt
                    <CiUnlock />
                  </Button>
                )}
              </div>

              {ans && (
                <div>
                  <h1 className="mb-3 font-medium ms-2">
                    {encryptMode ? "Encrypted Value :" : "Decrypted Value :"}
                  </h1>
                  <Textarea
                  readOnly
                  variant="faded"
                    maxRows={8}
                    minRows={4}
                    label={encryptMode ? "Encrypted Value" : "Decrypted Value"}
                    value={ans}
                  />
                  <div className="flex justify-end me-4 my-4">
                    <Button
                      className="border-2 border-black text-black font-semibold hover:text-white hover:bg-gray-900 duration-200"
                      onClick={() => (
                        navigator.clipboard.writeText(ans),
                        toast.success("Copied to Clipboard")
                      )}
                    >
                      <FaRegCopy />
                      Copy
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
