
function Comment({comment}) {

    return<>
            <div className="comment-box">
                <hr/>
                <h5 id='comment'>↪ {comment.content}</h5><br/>
                <div className="comment-detail">
                <h5 id="comment-margin">By: {comment.user.first_name} {comment.user.last_name}</h5><br/>
                <h5>Posted: {comment.date}</h5>
                </div>
            </div>
        </>
}

export default Comment;