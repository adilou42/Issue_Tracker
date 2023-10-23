import prisma from '@/prisma/client'
import { TableBody, TableCell, TableColumnHeaderCell, TableHeader, TableRoot, TableRow } from '@radix-ui/themes'
import { IssueStatusBadge, Link } from '@/app/components'
import NextLink from 'next/link'
import IssueActions from './IssueActions'
import dynamic from 'next/dynamic'
import { Issue, Status } from '@prisma/client'
import { ArrowUpIcon } from '@radix-ui/react-icons'

interface Props {
  searchParams: { status: Status, orderBy: keyof Issue }
}

const IssuesPage = async ({ searchParams }: Props) => {

  const columns: { 
    label: string
    value: keyof Issue
    className?: string
   }[] =[
    { label: 'Issue', value: 'title'},
    { label: 'Status', value: 'status', className:'hidden md:table-cell'},
    { label: 'Created', value: 'createdAt', className:'hidden md:table-cell'}
  ]

  const statuses = Object.values(Status)
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined

  const orderBy = columns.map(column => column.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc'}
    : undefined

  const issues = await prisma.issue.findMany({
    where: {
      status
    },
    orderBy
  })

  return (
    <div>
      <IssueActions />
      <TableRoot variant='surface'>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
            <TableColumnHeaderCell key={column.value}>
              <NextLink href={{
                query: { ...searchParams, orderBy: column.value }
              }}>{column.label}</NextLink>
              {column.value === searchParams.orderBy && <ArrowUpIcon className='inline' />}
            </TableColumnHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map(issue => (
            <TableRow key={issue.id}>
              <TableCell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status}/>
                </div>
              </TableCell>
              <TableCell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status}/>
              </TableCell>
              <TableCell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableRoot>
      </div>
  )
}

//Refresh every 0 seconds
export const revalidate = 0
//Force to render dynamicallly the page
//export const dynamic = 'force-dynamic'

export default IssuesPage