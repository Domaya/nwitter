import React, { useState, useEffect } from "react";
import { dbService } from "fbase";

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
    const dbNweets = await dbService.collection("nweets").get();
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
    });
  };
  useEffect(() => {
    getNweets();
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id:doc.id,
        ...doc.data()
      }))
     setNweets(nweetArray);
    })
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      text:nweet, //nweet는 state인 nweet의 value
      createdAt: Date.now(),
      creatorId : userObj.uid
    });
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  console.log(nweets);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
// import { dbService } from "fbase";
// import React, { useEffect, useState } from "react";

// const Home = () => {
//   const [nweet, SetNweet] = useState(""); //nweet 작성을 위한
//   const [nweets, SetNweets] = useState(""); //nweet를 가져오기 위한
//   const getNweets = async() => {
//     const dbNweets = await dbService.collection("nweets").get();
//     dbNweets.forEach((document) => {
//       const nweetObject = {
//         ...document.data(),
//         id : document.id
//       }
//       SetNweets((prev) => [nweetObject, ...prev]);
//     })
//   }
//   useEffect(() => {
//     getNweets();
//   }, [])
//   const onSubmit = async(event) =>{
//     event.preventDefault();
//     await dbService.collection("nweets").add({
//         nweet,
//         createdAt : Date.now(),
//       })
//       SetNweet("");
//   }
//   const onChange = (event) =>{
//     const { target:{value}} = event;
//     SetNweet(value);
//   }
//   console.log(nweets);
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           value={nweet}
//           onChange={onChange}
//           type="text"
//           placeholder="What's on your mind?"
//           maxLength={120}
//         />
//         <input type="submit" value="Nweet" />
//       </form>
//       <div>
//         {nweets.map((nweet) => (
//           <div key={nweet.id}>
//             <h4>{nweet.nweet}</h4>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

export default Home