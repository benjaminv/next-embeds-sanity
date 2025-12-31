import { Card, Flex } from '@sanity/ui'
import AuthorAvatar from 'components/AuthorAvatar'
import type { Author } from 'lib/sanity.queries'

export default function AuthorAvatarPreviewPane(props: Author) {
  const { firstName, lastName, picture } = props
  return (
    <Card padding={6}>
      <Flex justify="center">
        <AuthorAvatar {...props} />
      </Flex>
    </Card>
  )
}
