import prisma from '@/prisma/client'
import { TableBody, TableCell, TableColumnHeaderCell, TableHeader, TableRoot, TableRow } from '@radix-ui/themes'
import { IssueStatusBadge, Link } from '@/app/components'
import IssueActions from './IssueActions'
import dynamic from 'next/dynamic'

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany()

  return (
    <div>
      <IssueActions />
      <TableRoot variant='surface'>
        <TableHeader>
          <TableRow>
            <TableColumnHeaderCell>Issue</TableColumnHeaderCell>
            <TableColumnHeaderCell className='hidden md:table-cell'>Status</TableColumnHeaderCell>
            <TableColumnHeaderCell className='hidden md:table-cell'>Created</TableColumnHeaderCell>
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