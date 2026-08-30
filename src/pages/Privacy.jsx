import LegalPageLayout, { Li, P, Section, Ul } from '../components/LegalPageLayout'

export default function Privacy() {
  return (
    <LegalPageLayout title="プライバシーポリシー" updated="2026年8月30日">
      <Section>
        <P>
          Imagination apps（以下「運営者」といいます）は、運営者が提供するWebP一括変換ツール「WebP Converter」（以下「本サービス」といいます）における、ユーザーの情報の取扱いについて、以下のとおりプライバシーポリシー（以下「本ポリシー」といいます）を定めます。
        </P>
      </Section>

      <Section heading="第1条（基本方針）">
        <P>
          本サービスは、画像ファイルの変換処理をすべてユーザーの端末（ブラウザ）内で完結させる設計となっており、変換対象の画像データが運営者のサーバーへ送信・保存されることは一切ありません。運営者は、本ポリシーおよび関連法令を遵守し、ユーザーの個人情報を適切に取り扱います。
        </P>
      </Section>

      <Section heading="第2条（取得する情報と利用目的）">
        <P>運営者が取得する可能性のある情報および利用目的は、以下のとおりです。</P>
        <Ul>
          <Li>
            <span className="font-medium text-slate-700 dark:text-slate-200">お問い合わせ情報：</span>
            ユーザーがメール等でお問い合わせいただいた際のメールアドレス・お名前・お問い合わせ内容。お問い合わせへの対応・返信のために利用します。
          </Li>
          <Li>
            <span className="font-medium text-slate-700 dark:text-slate-200">決済情報：</span>
            Pro版のご購入時にStripe社の決済ページにて入力される氏名、メールアドレス、クレジットカード情報等。詳細は第3条をご覧ください。
          </Li>
          <Li>
            <span className="font-medium text-slate-700 dark:text-slate-200">端末内のローカル設定：</span>
            表示言語の設定、Pro版のライセンス有効化状態（フラグ）を、ユーザーの端末のブラウザ内（localStorage）にのみ保存します。これらの情報が運営者のサーバーへ送信されることはありません。
          </Li>
        </Ul>
        <P>
          なお、変換対象としてアップロード（選択）された画像ファイル自体は、ユーザーの端末内でのみ処理され、運営者を含む第三者に送信・取得されることはありません。
        </P>
      </Section>

      <Section heading="第3条（決済処理における個人情報の取扱い）">
        <P>
          本サービスのPro版の決済は、Stripe, Inc.（以下「Stripe社」といいます）が提供する決済サービスを通じて行われます。決済にあたって入力されるクレジットカード番号等の決済情報は、Stripe社のシステム上で直接処理されるものであり、運営者はクレジットカード番号等の決済情報を取得・保存しません。
        </P>
        <P>
          Stripe社における個人情報の取扱いについては、Stripe社が定めるプライバシーポリシーが適用されます。詳細は
          <a
            href="https://stripe.com/jp/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Stripe社のプライバシーポリシー
          </a>
          をご確認ください。
        </P>
      </Section>

      <Section heading="第4条（Cookie等の利用）">
        <P>
          本サービスは、ユーザーの利便性向上（表示言語の記憶、Pro版の有効化状態の保持等）のため、ブラウザのlocalStorageを利用します。これらは第三者へ送信されることのない、ユーザーの端末内にのみ保存される情報です。ユーザーはブラウザの設定により、これらの情報を削除することができます。
        </P>
      </Section>

      <Section heading="第5条（第三者提供の制限）">
        <P>
          運営者は、以下の場合を除き、あらかじめユーザーの同意を得ることなく、取得した個人情報を第三者に提供いたしません。
        </P>
        <Ul>
          <Li>法令に基づく場合</Li>
          <Li>人の生命、身体または財産の保護のために必要がある場合であって、ユーザーの同意を得ることが困難であるとき</Li>
          <Li>決済処理のためStripe社に必要な範囲の情報を提供する場合（第3条のとおり）</Li>
          <Li>その他、個人情報の保護に関する法律その他の法令で認められる場合</Li>
        </Ul>
      </Section>

      <Section heading="第6条（安全管理措置）">
        <P>
          運営者は、取得した個人情報の漏えい、滅失またはき損の防止その他の個人情報の安全管理のために、必要かつ適切な措置を講じます。前述のとおり、画像データ自体は端末内処理にとどめることで、そもそも運営者が画像データを保持しない設計とし、情報漏えいのリスクを低減しています。
        </P>
      </Section>

      <Section heading="第7条（開示・訂正・利用停止等の請求）">
        <P>
          ユーザーは、運営者が保有する自己の個人情報について、開示、訂正、追加、削除、利用停止等を求めることができます。ご希望の場合は、第9条のお問い合わせ窓口までご連絡ください。運営者は、ご本人からの請求であることを確認のうえ、合理的な期間内に対応いたします。
        </P>
      </Section>

      <Section heading="第8条（本ポリシーの変更）">
        <P>
          運営者は、必要と判断した場合には、ユーザーへの事前の通知なく本ポリシーを変更することができるものとします。変更後のプライバシーポリシーは、本サービス上に表示された時点より効力を生じるものとします。
        </P>
      </Section>

      <Section heading="第9条（お問い合わせ窓口）">
        <P>
          本ポリシーに関するお問い合わせは、下記までご連絡ください。
        </P>
        <P>
          Imagination apps　メールアドレス：
          <a href="mailto:imagination.support@gmail.com" className="text-indigo-600 hover:underline dark:text-indigo-400">
            imagination.support@gmail.com
          </a>
        </P>
      </Section>
    </LegalPageLayout>
  )
}
