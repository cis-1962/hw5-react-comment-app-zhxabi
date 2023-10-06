import React, { useState, useEffect } from 'react';

export default function Posts({ depth, post }: {depth: number; post: Post }) {
  const [postState, changePostState] = useState(post);
  const [numLikes, changeNumLikes] = useState(0);
  const [commentBtn,  setCommentBtn] = useState(true);
  const [commentInput, changeCommentInput] = useState('');
  const [nameInput, changeNameInput] = useState('');
  const [submitBtn, setSubmitBtn] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  useEffect(() => {
    // const isDisabled = (nameInput.length + commentInput.length) === 0
    setDisabled(nameInput.length === 0 || commentInput.length === 0)
  }, [commentInput, nameInput]);
  
  useEffect(() => {
    if(submitBtn){
      const newPost = postState;
      const currPost = {
        name: nameInput,
        comment: commentInput,
        children: []
      };
      newPost.children.push(currPost);
      changePostState(newPost)
      changeNameInput("");
      changeCommentInput("");
      setSubmitBtn(false);
      setCommentBtn(true);
    }
  }, [commentInput, nameInput, postState, submitBtn]);
  

  if (depth === 0) {
    // Base case
    return null;
  }

  return(
    <div className=''>
    <div className="shadow-sm p-3 mb-3 mx-4 bg-white rounded" >
    <div className="" >
      <div className="d-flex flex-column" >
        {/* <div>
          <p>Depth: {depth}</p>
        </div> */}
        <div >
          <h3>{post.name}</h3>
          <p>{post.comment}</p>
          {(depth > 1) ? 
            <div> 
              {commentBtn ?
                <button 
                  type="button" 
                  onClick={() => setCommentBtn(false)} 
                  className='btn btn-light'
                >Reply</button>
                : 
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
              }
                </div>
              : null}  
              
        </div>
        <div className='d-inline-flex p-2 flex-row-reverse'>
          <div className='d-inline-flex flex-row'>
                <button 
                  type="button" 
                  onClick={() => changeNumLikes(numLikes + 1)} 
                  className='btn btn-sm btn-info d-flex text-center px-2'
                >
                  ▲
                </button>
                <p className='w-25 text-center px-2'>
                  {numLikes}
                </p>
                <button 
                  type="button" 
                  onClick={() => changeNumLikes(numLikes - 1)} 
                  className='btn btn-sm btn-info d-flex text-center px-2'
                >
                  ▼
                </button>
            </div>
        </div>
        <div className='py-3'>
          {postState.children?.map((p) => (
                <Posts
                  depth={depth - 1}
                  post={p}
                />
              ))}
        </div>
      </div>
      
    </div>
    </div>
    </div>
  );

};
