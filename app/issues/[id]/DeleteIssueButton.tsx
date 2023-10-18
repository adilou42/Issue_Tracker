'use client'

import { Spinner } from '@/app/components'
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogRoot, AlertDialogTitle, AlertDialogTrigger, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter()

    const [error, setError] = useState(false)
    const [isDeleting, setDeleting] = useState(false)

    const deleteIssue = async () => {
        try {
            setDeleting(true)
            await axios.delete('/api/issues/' + issueId)
            router.push('/issues/list')
            router.refresh()
        } catch (error) {
            setDeleting(false)
            setError(true)
        }
    }

  return (
    <>
        <AlertDialogRoot>
            <AlertDialogTrigger>
            <Button color='red' disabled={isDeleting}>
                Delete Issue
                {isDeleting && <Spinner />}
            </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                <AlertDialogDescription>
                    Are you sure you want to delete ? This action cannot be undone
                </AlertDialogDescription>
                <Flex mt="4" gap="3">
                    <AlertDialogCancel>
                        <Button variant='soft' color='gray'>Cancel</Button>
                    </AlertDialogCancel>
                    <AlertDialogAction>
                        <Button color='red' onClick={deleteIssue}>Delete Issue</Button>
                    </AlertDialogAction>
                </Flex>
            </AlertDialogContent>
        </AlertDialogRoot>
        <AlertDialogRoot open={error}>
            <AlertDialogContent>
                <AlertDialogTitle>Error</AlertDialogTitle>
                <AlertDialogDescription>This issue could not be deleted</AlertDialogDescription>
                <Button color='gray' variant='soft' mt="2" onClick={() => setError(false)}>OK</Button>
            </AlertDialogContent>
        </AlertDialogRoot>
    </>

  )
}

export default DeleteIssueButton