import React, { useState, useEffect } from "react";
import { dbService, storageService } from "fbase";
import Nweet from "components/Nweet";
import { v4 as uuidv4 } from 'uuid';

const Home = ({userObj}) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
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
    let attachmentURL = "";
    if(attachment != ""){
      const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);//참조
      const response = await attachmentRef.putString(attachment, 'data_url').then(function(snapshot){
        console.log("Uploaded a data_url string!");
      })
      attachmentURL = await attachmentRef.getDownloadURL();
    }
    const nweetObj = {
      text:nweet,
      createdAt: Date.now(),
      creatorId : userObj.uid,
      attachmentURL
    }
    await dbService.collection("nweets").add(nweetObj)
    setNweet("");
    setAttachment("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  const onFileChange = (event) =>{
    const {target:{files}} = event; //event안에서 target 안으로 가 파일을 받아오는 것
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {currentTarget:{result}} = finishedEvent
      setAttachment(result)
    }
    reader.readAsDataURL(theFile);
  }
  const onClearAttachment = () => setAttachment(null)

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
        <input type="file" accept="image/*" onChange={onFileChange}/>
        <input type="submit" value="Nweet" />
        {attachment && 
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Сlear</button>
          </div>
        }
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id} 
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
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