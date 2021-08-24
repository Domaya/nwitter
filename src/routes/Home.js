import { dbService } from "fbase";
import React, { useState } from "react";

const Home = () => {
  const onSubmit = async(event) =>{
    event.preventDefault();
    await dbService.collection("nweets").add({
        nweet,
        createdAt : Date.now(),
      })
      SetNweet("");
  }
  const [nweet, SetNweet] = useState("");
  const onChange = (event) =>{
    const { target:{value}} = event;
    SetNweet(value);
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={nweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120}></input>
        <input type="submit" value="Nweet"></input>
      </form>
    </div>
  )
}

export default Home