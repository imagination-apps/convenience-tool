import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function LegalPageLayout({ title, updated, children }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        <ArrowLeft size={15} />
        トップページに戻る
      </Link>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-10">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
        {updated && <p className="mt-2 text-sm text-slate-400 dark:text-slate-500">最終更新日：{updated}</p>}
        <div className="mt-8 space-y-8">{children}</div>
      </div>
    </div>
  )
}

export function Section({ heading, children }) {
  return (
    <section>
      {heading && <h2 className="mb-3 text-base font-semibold text-slate-800 dark:text-slate-100">{heading}</h2>}
      <div className="space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{children}</div>
    </section>
  )
}

export function P({ children }) {
  return <p>{children}</p>
}

export function Ul({ children }) {
  return <ul className="list-disc space-y-1.5 pl-5">{children}</ul>
}

export function Li({ children }) {
  return <li>{children}</li>
}

export function DefinitionTable({ rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} className="border-b border-slate-200 last:border-b-0 dark:border-slate-800">
              <th className="w-40 shrink-0 whitespace-nowrap bg-slate-50 px-4 py-3 text-left align-top font-medium text-slate-500 dark:bg-slate-800/60 dark:text-slate-400 sm:w-48">
                {label}
              </th>
              <td className="px-4 py-3 align-top leading-relaxed text-slate-700 dark:text-slate-200">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
