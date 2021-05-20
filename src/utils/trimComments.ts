export const trimComments = (
  statement: string,
  commentStarted: boolean = false
): { statement: string; commentStarted: boolean } => {
  let trimmed = (statement || '').trim()

  if (commentStarted || trimmed.startsWith('/*')) {
    const parts = trimmed.split('*/')
    if (parts.length === 2) {
      return {
        statement: (parts.pop() as string).trim(),
        commentStarted: false
      }
    } else if (parts.length > 2) {
      parts.shift()
      return trimComments(parts.join('*/'), false)
    } else {
      return { statement: '', commentStarted: true }
    }
  }
  return { statement: trimmed, commentStarted: false }
}
