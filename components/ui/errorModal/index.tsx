import { CustomError } from 'types'
import {Box} from '@chakra-ui/react'

interface Props {
  error: CustomError;
  onHandleClose?: () => void;
}

export const ErrorModal = ({ error, onHandleClose }: Props) => {
  return (
    <Box onHandleClose={onHandleClose ? () => onHandleClose() : undefined}>
      <h3>Status Code: {error.status || 400}</h3>
      <h2>{error.message}</h2>
      <pre>
        <code>
          {error.stack}
        </code>
      </pre>
    </Box>
  )
}