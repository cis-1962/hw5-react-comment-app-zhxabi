import React, { useState, useEffect } from 'react';
import Posts from "./posts";

const allPosts : Post[] = []

export default function App() {
  const [commentInput, changeCommentInput] = useState('');
  const [nameInput, changeNameInput] = useState('');
  const [submitBtn, setSubmitBtn] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [currPosts, setCurrPosts] = useState(allPosts);

  useEffect(() => {
    // const isDisabled = (nameInput.length + commentInput.length) === 0
    setDisabled(nameInput.length === 0 || commentInput.length === 0)
  }, [commentInput, nameInput]);
  
  useEffect(() => {
    if(submitBtn){
      const newPosts = currPosts;
      const currPost : Post = {
        name: nameInput,
        comment: commentInput,
        children: []
      };
      newPosts.push(currPost);
      setCurrPosts(newPosts)
      changeNameInput("");
      changeCommentInput("");
      setSubmitBtn(false);
    }
  }, [commentInput, currPosts, nameInput, submitBtn]);

  return (
    <main>
      <div className="container">
      <div>
        <form className="d-flex flex-column mx-4 my-4">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => changeNameInput(e.target.value)}
            placeholder="Name"
            className='w-full py-1 my-1'
          />
          <textarea
            value={commentInput}
            onChange={(e) => changeCommentInput(e.target.value)}
            placeholder="Comment"
            className='w-full py-1 my-2'
          />
          <div className="d-flex flex-row">
          <button 
            type="button" 
            onClick={() => setSubmitBtn(true)} 
            disabled={isDisabled}
            className='btn btn-info'
          >
            Submit
          </button>
          </div>
        </form>
        </div>
       
        <div>
        {currPosts?.map((p) => (
              <Posts
                depth={3}
                post={p}
              />
            ))}
        </div>
      </div>
    </main>
  
  );

}
