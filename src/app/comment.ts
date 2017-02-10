/**
 * Created by yuriel on 2/9/17.
 */
export interface Comment {
    id: number
    parent: number
    created: number
    modified: number
    text: string
    author: string
    website: string
    likes: number
    dislikes: number
    userIdentity: string
    totalReplies: number
    hiddenReplies: number
    replies: Comment[]
}

export interface PendingComment {
    uri: string
    title: string
    text: string
    author: string
    email: string
    website: string
    parent: number
}

export interface CreateCommentResult {
    id: number
    comment: Comment
    ip: string
    token: string
}