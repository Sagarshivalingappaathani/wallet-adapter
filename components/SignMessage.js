import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { encode } from 'bs58';
import { toast } from 'react-toastify';

export default function SignMessage() {
  const { publicKey, signMessage } = useWallet();
  const [message, setMessage] = useState('Hello from Solana!');
  const [signedMessage, setSignedMessage] = useState(null);

  const handleSignMessage = async () => {
    if (!publicKey || !signMessage) {
      toast.error('Wallet not connected or does not support message signing');
      return;
    }

    try {
      const encodedMessage = new TextEncoder().encode(message);
      const signature = await signMessage(encodedMessage);
      const encodedSignature = encode(signature);
      setSignedMessage(encodedSignature);
      toast.success(`Message signed successfully! Signature: ${encodedSignature}`);
    } catch (error) {
      console.error('Error signing message:', error);
      toast.error(`Error signing message: ${error.message}`);
    }
  }

  return (
    <div>
      <h3 className="font-semibold mb-2 text-black">Sign a Message</h3>

      {publicKey ? (
        <div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
            placeholder="Enter message to sign"
          ></textarea>

          <button
            onClick={handleSignMessage}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Sign Message
          </button>
        </div>
      ) : (
        <p className="text-gray-600">Connect your wallet to sign a message.</p>
      )}
    </div>
  );
}
