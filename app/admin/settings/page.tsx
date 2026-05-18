import { getSiteSettings } from '@/sanity/lib/siteSettings'
import { MotionDiv } from '@/components/ui/motion'
import { SettingsTabs } from './SettingsTabs'

export const metadata = { title: 'Settings | Admin Dashboard' }
export const revalidate = 0

export default async function SettingsPage() {
  const settings = await getSiteSettings()

  return (
    <div className="flex flex-col h-full gap-5">
      <MotionDiv
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="shrink-0"
      >
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-gray-400 text-sm font-medium mt-0.5">Customize your portfolio without touching any code</p>
      </MotionDiv>

      <div className="flex-1 min-h-0">
        <SettingsTabs settings={settings} />
      </div>
    </div>
  )
}
