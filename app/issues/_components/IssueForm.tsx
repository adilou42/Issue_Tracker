'use client'

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { IssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, CalloutRoot, CalloutText, TextFieldInput, TextFieldRoot } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from 'react-simplemde-editor';
import z from 'zod';

type IssueFormData = z.infer<typeof IssueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const router = useRouter()
    const {register, control, handleSubmit, formState: { errors }} = useForm<IssueFormData>({
        resolver: zodResolver(IssueSchema)
    })
    const [error, setError] = useState('')
    const [isSubmitting, setSubmitting] = useState(false)

    const onSubmit = handleSubmit(async(data) => {
        try {
            setSubmitting(true)
            if (issue)
                await axios.patch('/api/issues/' + issue.id, data)
            else
                await axios.post('/api/issues', data);
            router.push('/issues/list')
            router.refresh()
        } catch (error) {
            setSubmitting(false)
            setError('An unexpected error occured.')
        }
    })

  return (
    <div className='max-w-xl'>
        {error && <CalloutRoot color='red' className='mb-5'>
            <CalloutText>{error}</CalloutText>
            </CalloutRoot>}
        <form className=' space-y-3' 
        onSubmit={onSubmit}>
            <TextFieldRoot>
                <TextFieldInput defaultValue={issue?.title} placeholder='Title' {...register('title')} />
            </TextFieldRoot>
            <ErrorMessage>
                {errors.title?.message}
            </ErrorMessage>
            <Controller 
                name="description"
                defaultValue={issue?.description}
                control={control}
                render={({ field }) => <SimpleMDE placeholder='Descritption' {...field}/>
            }
            />
            <ErrorMessage>
                {errors.description?.message}
            </ErrorMessage>
            <Button disabled={isSubmitting}>
                {issue ? 'Update Issue' : 'Submit New Issue'}{' '}
                {isSubmitting && <Spinner />}
            </Button>
        </form>
    </div>
  )
}

export default IssueForm