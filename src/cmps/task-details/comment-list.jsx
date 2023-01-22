import { CommentPreview } from "./comment-preview"

export function CommentList({ task }) {
    return task.comments?.length && task.comments.map(comment => <CommentPreview comment={comment} />)
}