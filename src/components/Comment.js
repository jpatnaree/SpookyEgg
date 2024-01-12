
function Comment({comment}) {

    return<>
            <div className="comment-box">
                <h4>{comment.content}</h4><br/>
                <h5>{comment.user.first_name} {comment.user.last_name}</h5><br/>
                <h5>{comment.date}</h5>
            </div>
        </>
}

export default Comment;