import LegalPageLayout, { DefinitionTable, Section } from '../components/LegalPageLayout'

const ROWS = [
  ['販売事業者名', 'Imagination apps'],
  ['代表者名', '請求があった場合に遅滞なく開示いたします。'],
  ['所在地', '請求があった場合に遅滞なく開示いたします。'],
  ['電話番号', '請求があった場合に遅滞なく開示いたします。'],
  [
    'メールアドレス',
    <a key="email" href="mailto:imagination.support@gmail.com" className="text-indigo-600 hover:underline dark:text-indigo-400">
      imagination.support@gmail.com
    </a>,
  ],
  ['販売価格', '各購入画面（Stripe決済画面）に表示（Proプラン $4.99）'],
  ['お支払方法', 'クレジットカード決済（Stripe）'],
  ['お支払時期', 'ご注文（決済）確定時に即時決済されます。'],
  ['引き渡し時期', '決済完了後、即時利用可能'],
  ['返品・キャンセル', 'デジタルコンテンツの特性上、購入後の返金・キャンセルには応じかねます。ただし、当方の責めに帰すべき事由によりサービスが提供できなかった場合は、上記メールアドレスまでご連絡ください。'],
  ['動作環境', '最新版の主要ウェブブラウザ（Google Chrome、Safari、Firefox、Microsoft Edge 等）を推奨します。'],
]

export default function Tokushoho() {
  return (
    <LegalPageLayout title="特定商取引法に基づく表記" updated="2026年8月30日">
      <Section>
        <p>
          本ページは、特定商取引法第11条（通信販売についての広告）に基づき、本サービス「WebP Converter」（以下「本サービス」といいます）における商品・サービスの表示に関する事項を記載するものです。
        </p>
      </Section>

      <Section>
        <DefinitionTable rows={ROWS} />
      </Section>

      <Section heading="追加手数料等">
        <p>
          インターネット接続料金、通信料金等はお客様のご負担となります。上記以外に商品代金以外の手数料等は発生いたしません。
        </p>
      </Section>
    </LegalPageLayout>
  )
}
