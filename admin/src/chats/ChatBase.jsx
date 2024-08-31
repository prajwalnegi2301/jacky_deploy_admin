

// import React, { useEffect, useMemo } from 'react';
// import { getSocket } from '../lib/socket.config';
// import { v4 as uuidV4 } from 'uuid';

// function ChatBase() {
//   const socket = useMemo(() => {
//     const socketInstance = getSocket();
//     socketInstance.connect(); // Assuming socketInstance requires connect to be called
//     return socketInstance;
//   }, []);

//   useEffect(() => {
//     socket.on('message', (data) => {
//       console.log('Socket message is', data);
//     });

//     return () => {
//       socket.disconnect(); // Properly disconnect the socket
//     };
//   }, [socket]); // Add socket to the dependency array

//   const handleClick = () => {
//     socket.emit('message', { name: 'TestName', id: uuidV4() });
//   };

//   return (
//     <div>
//       <button className='bg-purple-600 px-4 py-1 m-1 rounded-md text-white' onClick={handleClick}>
//         Send Message
//       </button>
//     </div>
//   );
// }

// export default ChatBase;





// import React, { useEffect, useMemo, useCallback } from 'react';
// import { getSocket } from '../lib/socket.config';
// import { v4 as uuidV4 } from 'uuid';

// function ChatBase() {
//   // Memoize the socket instance
//   const socket = useMemo(() => {
//     const socketInstance = getSocket();
    
//     // Setup authentication before connecting
//     socketInstance.auth = { room: '123' };

//     return socketInstance.connect();
//   }, []);

//   useEffect(() => {
//     // Listen for messages
//     socket.on('message', (data) => {
//       console.log('Socket message:', data);
//     });

//     // Cleanup on component unmount
//     return () => {
//       socket.off('message'); // Unsubscribe from the 'message' event
//       socket.disconnect(); // Properly disconnect the socket
//     };
//   }, [socket]); // Dependencies include socket

//   // Memoize handleClick to prevent unnecessary re-renders
//   const handleClick = useCallback(() => {
//     socket.emit('message', { name: 'TestName', id: uuidV4() });
//   }, [socket]);

//   return (
//     <div>
//       <button
//         className="bg-purple-600 px-4 py-1 m-1 rounded-md text-white"
//         onClick={handleClick}
//       >
//         Send Message
//       </button>
//     </div>
//   );
// }

// export default ChatBase;

// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { getSocket } from '../lib/socket.config';
// import { v4 as uuidV4 } from 'uuid';

// function ChatBase() {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');

//   // Memoize the socket instance
//   const socket = useMemo(() => {
//     const socketInstance = getSocket();
    
//     // Setup authentication before connecting
//     socketInstance.auth = { room: '123' };

//     return socketInstance.connect();
//   }, []);

//   useEffect(() => {
//     // Listen for incoming messages
//     socket.on('message', (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     // Cleanup on component unmount
//     return () => {
//       socket.off('message');
//       socket.disconnect();
//     };
//   }, [socket]);

//   // Memoize handleSendMessage to prevent unnecessary re-renders
//   const handleSendMessage = useCallback(() => {
//     if (inputValue.trim()) {
//       const newMessage = { name: 'TestName', id: uuidV4(), text: inputValue };
//       socket.emit('message', newMessage);
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       setInputValue(''); // Clear the input field
//     }
//   }, [socket, inputValue]);

//   return (
//     <div className="flex flex-col h-screen p-4 ">
//       <div className="flex-1 overflow-y-auto mb-4">
//         <div className="space-y-2">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={`p-2 rounded-md ${
//                 message.name === 'TestName' ? 'bg-blue-600 self-end' : 'bg-gray-700'
//               }`}
//             >
//               <strong>{message.name}:</strong> {message.text}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex">
//         <input
//           type="text"
//           className="flex-1 p-2 rounded-l-md "
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           placeholder="Type your message..."
//           onKeyPress={(e) => {
//             if (e.key === 'Enter') handleSendMessage();
//           }}
//         />
//         <button
//           className="bg-purple-600 px-4 py-2 rounded-r-md"
//           onClick={handleSendMessage}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatBase;






// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { getSocket } from '../lib/socket.config';
// import { v4 as uuidV4 } from 'uuid';

// function ChatBase() {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');

//   // Memoize the socket instance
//   const socket = useMemo(() => {
//     const socketInstance = getSocket();
    
//     // Setup authentication before connecting
//     socketInstance.auth = { room: '123' };

//     return socketInstance.connect();
//   }, []);

//   useEffect(() => {
//     // Listen for incoming messages
//     socket.on('message', (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     // Cleanup on component unmount
//     return () => {
//       socket.off('message');
//       socket.disconnect();
//     };
//   }, [socket]);

//   // Memoize handleSendMessage to prevent unnecessary re-renders
//   const handleSendMessage = useCallback(() => {
//     if (inputValue.trim()) {
//       const newMessage = { name: 'TestName', id: uuidV4(), text: inputValue };
//       socket.emit('message', newMessage);
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       setInputValue(''); // Clear the input field
//     }
//   }, [socket, inputValue]);

//   return (
//     <div className="flex flex-col h-screen p-4 bg-purple-100 text-gray-800">
//       <div className="flex-1 overflow-y-auto mb-4">
//         <div className="space-y-2">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={`p-2 rounded-md ${
//                 message.name === 'TestName' ? 'bg-purple-400 self-end' : 'bg-purple-200'
//               }`}
//             >
//               <strong>{message.name}:</strong> {message.text}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex">
//         <input
//           type="text"
//           className="flex-1 p-2 rounded-l-md bg-purple-50 text-gray-800"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           placeholder="Type your message..."
//           onKeyPress={(e) => {
//             if (e.key === 'Enter') handleSendMessage();
//           }}
//         />
//         <button
//           className="bg-purple-500 text-white px-4 py-2 rounded-r-md"
//           onClick={handleSendMessage}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatBase;


import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getSocket } from '../lib/socket.config';
import { v4 as uuidV4 } from 'uuid';

function ChatBase() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const currentUserName = 'TestName'; // Replace with the actual user's name or ID

  // Memoize the socket instance
  const socket = useMemo(() => {
    const socketInstance = getSocket();
    
    // Setup authentication before connecting
    socketInstance.auth = { room: '123' };

    return socketInstance.connect();
  }, []);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('message');
      socket.disconnect();
    };
  }, [socket]);

  // Memoize handleSendMessage to prevent unnecessary re-renders
  const handleSendMessage = useCallback(() => {
    if (inputValue.trim()) {
      const newMessage = { name: currentUserName, id: uuidV4(), text: inputValue };
      socket.emit('message', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputValue(''); // Clear the input field
    }
  }, [socket, inputValue]);

  return (
    <div className="flex flex-col h-screen p-4 bg-purple-100 text-gray-800">
      <div className="flex-1 overflow-y-auto mb-4">
        <div className="space-y-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-2 max-w-xs break-words rounded-md ${
                message.name === currentUserName
                  ? 'bg-purple-400 self-end text-right'
                  : 'bg-purple-200 self-start text-left'
              }`}
            >
              <strong>{message.name}:</strong> {message.text}
            </div>
          ))}
        </div>
      </div>
      <div className="flex">
        <input
          type="text"
          className="flex-1 p-2 rounded-l-md bg-purple-50 text-gray-800"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
        />
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded-r-md"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBase;
