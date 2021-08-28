import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Nweet = ({nweetObj, isOwner}) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async() => {
    const ok = window.confirm("Are you sure?");
    if(ok){
      //delete nweet
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentURL).delete()
    }
  }
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async(event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text:newNweet
    })
    setEditing(false);
  }
  const onChange = (event) =>{
    const { target:{value} } = event;
    setNewNweet(value);
  }

  return (
    <div>
      {editing ? (
        <>
        <form onSubmit={onSubmit}>
          <input type="text"
          placeholder="Edit your nweet"
          value={newNweet}
          onChange={onChange}
          required/>
          <input type="submit" value="newNweet"></input>
        </form>
        <button onClick={toggleEditing}>cancel</button>
        </>
        )
        :
        <>
        <div>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentURL && <img src={nweetObj.attachmentURL} width="100px" heigh="auto" />}
          {
            isOwner &&(
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>)
          }
      </div>
        </>
      }
    </div>
  )
}

export default Nweet