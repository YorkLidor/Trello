import { CommentPreview } from "./comment-preview"

export function CommentList({ task }) {
    return task.comments?.length > 0 && task.comments.map(comment => <CommentPreview key={comment.id} comment={comment} />)
}