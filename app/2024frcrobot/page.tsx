import type { Metadata } from 'next'
import { RobotPage } from '@/components/robot-page'
import { robotMetadata } from '@/data/robots'

export const metadata: Metadata = robotMetadata('2024frcrobot')

export default function Page() {
  return <RobotPage slug="2024frcrobot" />
}
