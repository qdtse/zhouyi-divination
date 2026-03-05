import './App.css'
import { useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || ''

type Lang = 'zh' | 'en' | 'fr'

function App() {
  const [lang, setLang] = useState<Lang>('en')
  const [loadingKey, setLoadingKey] = useState<string | null>(null)
  const [results, setResults] = useState<Record<string, string>>({})

  const t = useMemo(() => {
    if (lang === 'fr') {
      return {
        title: 'Divination Zhouyi',
        subtitle: 'Destinée · Zhuge Shenshu · Analyse des Noms',
        textTitle: 'Analyse Nom/Texte',
        textDesc:
          'Entrez tout texte chinois, nombre ou anglais pour obtenir un hexagramme selon Meihua Yishu.',
        textPlaceholder: 'Entrez votre question ou nom',
        textButton: 'Diviner',
        zhugeTitle: 'Zhuge Shenshu (384 sorts)',
        zhugeDesc:
          'Entrez trois caractères pour tirer un sort Zhuge poétique.',
        zhugePlaceholder: '3 caractères',
        zhugeButton: 'Diviner',
        pairTitle: 'Divination Numérique',
        pairDesc:
          'Entrez deux nombres pour former un hexagramme (trigrammes supérieur & inférieur).',
        num1Placeholder: 'Nombre supérieur',
        num2Placeholder: 'Nombre inférieur',
        pairButton: 'Diviner',
        randomTitle: 'Divination Aléatoire',
        randomDesc:
          'Concentrez-vous sur votre question puis cliquez pour un hexagramme aléatoire.',
        randomButton: 'Lancer',
        timeTitle: 'Divination du Moment',
        timeDesc: 'Utilisez la date et heure actuelles pour sentir la fortune.',
        timeButton: 'Diviner',
        baziTitle: 'Analyse Bazi (4 Piliers)',
        baziDesc:
          'Entrez votre date de naissance pour analyser Bazi et les 5 Éléments.',
        baziButton: 'Analyser',
        matchTitle: 'Compatibilité Mariage',
        matchDesc:
          'Entrez les dates de naissance pour vérifier la compatibilité Bazi.',
        matchButton: 'Vérifier',
        maleLabel: 'Homme',
        femaleLabel: 'Femme',
        year: 'Année',
        month: 'Mois',
        day: 'Jour',
        hour: 'Heure (0-23)',
        resultLabel: 'Résultat',
        errorPrefix: 'Erreur: ',
        inputRequired: 'Veuillez remplir les champs requis.',
        donateText: 'Soutenez ce projet',
        donateDesc: 'Si vous trouvez cet outil utile, vous pouvez nous soutenir',
        alipay: 'Alipay',
        wechat: 'WeChat',
        paypal: 'PayPal: sugarworm',
      }
    }

    if (lang === 'en') {
      return {
        title: 'Zhouyi Divination',
        subtitle: 'Destiny · Zhuge Shenshu · Name Analysis',
        textTitle: 'Name / Text Divination',
        textDesc:
          'Input any Chinese, number or English text and we will cast a hexagram using Meihua Yishu.',
        textPlaceholder: 'Please type your question or name',
        textButton: 'Divine Now',
        zhugeTitle: 'Zhuge Shenshu (384 lots)',
        zhugeDesc:
          'Enter three characters to draw a Zhuge lot and get a poetic prediction.',
        zhugePlaceholder: 'Enter 3 characters',
        zhugeButton: 'Divine Now',
        pairTitle: 'Number Divination',
        pairDesc:
          'Enter two numbers to form a hexagram (upper & lower trigrams).',
        num1Placeholder: 'Upper number',
        num2Placeholder: 'Lower number',
        pairButton: 'Divine Now',
        randomTitle: 'Random Divination',
        randomDesc:
          'Focus on your question in your heart and click the button to cast a random hexagram.',
        randomButton: 'Cast Hexagram',
        timeTitle: 'Current Time Divination',
        timeDesc: 'Use the current date and time to sense the fortune of this moment.',
        timeButton: 'Divine Now',
        baziTitle: 'Bazi Analysis (Four Pillars)',
        baziDesc:
          'Enter your birth date and hour to analyze your Bazi and Five Elements.',
        baziButton: 'Analyze Bazi',
        matchTitle: 'Marriage Compatibility',
        matchDesc:
          'Enter both birth dates to check Bazi-based marriage compatibility.',
        matchButton: 'Check Compatibility',
        maleLabel: 'Male',
        femaleLabel: 'Female',
        year: 'Year',
        month: 'Month',
        day: 'Day',
        hour: 'Hour (0-23)',
        resultLabel: 'Result',
        errorPrefix: 'Error: ',
        inputRequired: 'Please fill in required fields.',
        donateText: 'Support This Project',
        donateDesc: 'If you find this tool helpful, consider supporting us',
        alipay: 'Alipay',
        wechat: 'WeChat',
        paypal: 'PayPal: sugarworm',
      }
    }

    return {
      title: '周易卜卦',
      subtitle: '命理测算 · 诸葛神数 · 姓名分析',
      textTitle: '公司 / 姓名 / 号码测吉凶',
      textDesc: '输入任何汉字、数字或英文，利用梅花易数原理进行起卦分析。',
      textPlaceholder: '请输入问题、公司名、姓名等',
      textButton: '开始占卜',
      zhugeTitle: '诸葛神数（384签）',
      zhugeDesc: '报字测前程，输入三个字，通过笔画数理求取诸葛神签。',
      zhugePlaceholder: '请输入三个字',
      zhugeButton: '开始占卜',
      pairTitle: '数字起卦（梅花易数）',
      pairDesc: '凭直觉输入两个数字，上卦与下卦，直接起卦预测。',
      num1Placeholder: '上卦数',
      num2Placeholder: '下卦数',
      pairButton: '开始占卜',
      randomTitle: '随机起卦',
      randomDesc: '心诚则灵，随机抽取六爻卦象，解答心中疑惑。',
      randomButton: '立即测算',
      timeTitle: '当前时间起卦',
      timeDesc: '以当前年月日时为基准，占测此刻的整体气场。',
      timeButton: '立即测算',
      baziTitle: '八字算命（四柱分析）',
      baziDesc: '输入出生时间，分析八字命盘、五行喜忌及日主强弱。',
      baziButton: '分析八字',
      matchTitle: '八字合婚（姻缘匹配）',
      matchDesc: '输入双方出生时间，测算婚姻匹配度及五行互补情况。',
      matchButton: '开始合婚',
      maleLabel: '男方信息',
      femaleLabel: '女方信息',
      year: '年',
      month: '月',
      day: '日',
      hour: '时（0-23）',
      resultLabel: '【测算结果】',
      errorPrefix: '错误：',
      inputRequired: '请输入完整信息。',
      donateText: '支持本项目',
      donateDesc: '如果这个工具对您有帮助，欢迎打赏支持',
      alipay: '支付宝',
      wechat: '微信',
      paypal: 'PayPal: sugarworm',
    }
  }, [lang])

  function formatResult(key: string, data: any): string {
    if (typeof data !== 'object' || data === null) {
      return String(data)
    }
    
    // Zhuge Shenshu formatting
    if (key === 'zhuge' || data.type === 'zhuge') {
      const lines = []
      if (data.poem) lines.push(`【签诗】${data.poem}`)
      if (data.explain) lines.push(`\n【解签】${data.explain}`)
      if (data.poem_en && lang !== 'zh') lines.push(`\n[English Poem] ${data.poem_en}`)
      if (data.explain_en && lang !== 'zh') lines.push(`[Explanation] ${data.explain_en}`)
      return lines.join('\n') || JSON.stringify(data, null, 2)
    }
    
    // Text/Meihua divination formatting
    if (key === 'text' || key === 'pair' || key === 'random' || key === 'current' || 
        data.type === 'hexagram' || data.ben_gua) {
      const lines = []
      if (data.ben_gua) lines.push(`【本卦】${data.ben_gua}` + (data.ben_gua_en ? ` (${data.ben_gua_en})` : ''))
      if (data.zhi_gua) lines.push(`【之卦】${data.zhi_gua}` + (data.zhi_gua_en ? ` (${data.zhi_gua_en})` : ''))
      if (data.summary) lines.push(`\n【卦象】${data.summary}`)
      if (data.main_text) lines.push(`\n【主爻】${data.main_text}`)
      if (data.ben_gua_text) lines.push(`\n【卦辞】${data.ben_gua_text}`)
      if (data.main_text_en && lang !== 'zh') lines.push(`\n[Main Text] ${data.main_text_en}`)
      return lines.join('\n') || JSON.stringify(data, null, 2)
    }
    
    // Bazi analysis formatting
    if (key === 'bazi' || data.type === 'bazi') {
      const lines = []
      if (data.solar_date) lines.push(`【阳历】${data.solar_date}`)
      if (data.lunar_date) lines.push(`【阴历】${data.lunar_date}`)
      if (data.bazi) lines.push(`\n【八字】${data.bazi}`)
      if (data.wuxing_count) lines.push(`\n【五行】${JSON.stringify(data.wuxing_count)}`)
      if (data.day_master) lines.push(`【日主】${data.day_master}`)
      if (data.strength) lines.push(`【日主强弱】${data.strength}`)
      if (data.missing_wuxing) lines.push(`【缺失五行】${data.missing_wuxing}`)
      return lines.join('\n') || JSON.stringify(data, null, 2)
    }
    
    // Marriage match formatting
    if (key === 'match' || data.type === 'match') {
      const lines = []
      if (data.compatibility) lines.push(`【合婚指数】${data.compatibility}`)
      if (data.score !== undefined) lines.push(`【匹配分数】${data.score}/100`)
      if (data.male_bazi) lines.push(`\n【男方八字】${data.male_bazi}`)
      if (data.female_bazi) lines.push(`【女方八字】${data.female_bazi}`)
      if (data.analysis) lines.push(`\n【分析】${data.analysis}`)
      return lines.join('\n') || JSON.stringify(data, null, 2)
    }
    
    return JSON.stringify(data, null, 2)
  }

  async function callApi(
    key: string,
    path: string,
    options?: RequestInit,
  ) {
    setLoadingKey(key)
    try {
      const res = await fetch(`${API_BASE || ''}/divine${path}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
      })
      const data = await res.json()
      const pretty = formatResult(key, data)
      setResults((prev) => ({ ...prev, [key]: pretty }))
    } catch (e: any) {
      setResults((prev) => ({
        ...prev,
        [key]: `${t.errorPrefix}${e?.message || String(e)}`,
      }))
    } finally {
      setLoadingKey((prev) => (prev === key ? null : prev))
    }
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <div>
          <h1 className="app-title">{t.title}</h1>
          <p className="app-subtitle">{t.subtitle}</p>
        </div>
        <div className="lang-switch">
          <button
            className={lang === 'zh' ? 'lang-btn active' : 'lang-btn'}
            onClick={() => setLang('zh')}
          >
            中文
          </button>
          <button
            className={lang === 'en' ? 'lang-btn active' : 'lang-btn'}
            onClick={() => setLang('en')}
          >
            English
          </button>
          <button
            className={lang === 'fr' ? 'lang-btn active' : 'lang-btn'}
            onClick={() => setLang('fr')}
          >
            Français
          </button>
        </div>
      </header>

      <main className="cards-grid">
        <section className="card">
          <h2>{t.textTitle}</h2>
          <p className="card-desc">{t.textDesc}</p>
          <textarea
            className="input"
            id="text-input"
            rows={3}
            placeholder={t.textPlaceholder}
            onBlur={(e) => {
              const value = e.target.value.trim()
              if (!value) return
              callApi('text', '/text', {
                method: 'POST',
                body: JSON.stringify({ text: value, focus: 'general' }),
              })
            }}
          />
          <button
            className="primary-btn"
            onClick={() => {
              const el = document.getElementById('text-input') as HTMLTextAreaElement | null
              const value = el?.value.trim() || ''
              if (!value) {
                alert(t.inputRequired)
                return
              }
              callApi('text', '/text', {
                method: 'POST',
                body: JSON.stringify({ text: value, focus: 'general' }),
              })
            }}
            id="text-submit"
          >
            {loadingKey === 'text' ? '···' : t.textButton}
          </button>
          {results.text && (
            <pre className="result-block">
              <span className="result-label">{t.resultLabel}</span>
              {'\n'}
              {results.text}
            </pre>
          )}
        </section>

        <section className="card">
          <h2>{t.zhugeTitle}</h2>
          <p className="card-desc">{t.zhugeDesc}</p>
          <input
            id="zhuge-input"
            className="input"
            maxLength={20}
            placeholder={t.zhugePlaceholder}
          />
          <button
            className="primary-btn"
            onClick={() => {
              const el = document.getElementById('zhuge-input') as HTMLInputElement | null
              const value = el?.value.trim() || ''
              if (!value) {
                alert(t.inputRequired)
                return
              }
              callApi('zhuge', '/zhuge', {
                method: 'POST',
                body: JSON.stringify({ text: value }),
              })
            }}
          >
            {loadingKey === 'zhuge' ? '···' : t.zhugeButton}
          </button>
          {results.zhuge && (
            <pre className="result-block">
              <span className="result-label">{t.resultLabel}</span>
              {'\n'}
              {results.zhuge}
            </pre>
          )}
        </section>

        <section className="card">
          <h2>{t.pairTitle}</h2>
          <p className="card-desc">{t.pairDesc}</p>
          <div className="row">
            <input
              id="num1-input"
              className="input"
              type="number"
              placeholder={t.num1Placeholder}
            />
            <input
              id="num2-input"
              className="input"
              type="number"
              placeholder={t.num2Placeholder}
            />
          </div>
          <button
            className="primary-btn"
            onClick={() => {
              const n1 = (document.getElementById('num1-input') as HTMLInputElement | null)?.value
              const n2 = (document.getElementById('num2-input') as HTMLInputElement | null)?.value
              if (!n1 || !n2) {
                alert(t.inputRequired)
                return
              }
              callApi('pair', '/pair', {
                method: 'POST',
                body: JSON.stringify({ num1: Number(n1), num2: Number(n2) }),
              })
            }}
          >
            {loadingKey === 'pair' ? '···' : t.pairButton}
          </button>
          {results.pair && (
            <pre className="result-block">
              <span className="result-label">{t.resultLabel}</span>
              {'\n'}
              {results.pair}
            </pre>
          )}
        </section>

        <section className="card">
          <h2>{t.randomTitle}</h2>
          <p className="card-desc">{t.randomDesc}</p>
          <button
            className="primary-btn"
            onClick={() => callApi('random', '/random')}
          >
            {loadingKey === 'random' ? '···' : t.randomButton}
          </button>
          {results.random && (
            <pre className="result-block">
              <span className="result-label">{t.resultLabel}</span>
              {'\n'}
              {results.random}
            </pre>
          )}
        </section>

        <section className="card">
          <h2>{t.timeTitle}</h2>
          <p className="card-desc">{t.timeDesc}</p>
          <button
            className="primary-btn"
            onClick={() => callApi('current', '/current')}
          >
            {loadingKey === 'current' ? '···' : t.timeButton}
          </button>
          {results.current && (
            <pre className="result-block">
              <span className="result-label">{t.resultLabel}</span>
              {'\n'}
              {results.current}
            </pre>
          )}
        </section>

        <section className="card">
          <h2>{t.baziTitle}</h2>
          <p className="card-desc">{t.baziDesc}</p>
          <div className="row">
            <input id="bazi-year" className="input" type="number" placeholder={t.year} />
            <input id="bazi-month" className="input" type="number" placeholder={t.month} />
          </div>
          <div className="row">
            <input id="bazi-day" className="input" type="number" placeholder={t.day} />
            <input id="bazi-hour" className="input" type="number" placeholder={t.hour} />
          </div>
          <button
            className="primary-btn"
            onClick={() => {
              const y = (document.getElementById('bazi-year') as HTMLInputElement | null)?.value
              const m = (document.getElementById('bazi-month') as HTMLInputElement | null)?.value
              const d = (document.getElementById('bazi-day') as HTMLInputElement | null)?.value
              const h = (document.getElementById('bazi-hour') as HTMLInputElement | null)?.value
              if (!y || !m || !d || !h) {
                alert(t.inputRequired)
                return
              }
              callApi('bazi', '/bazi', {
                method: 'POST',
                body: JSON.stringify({
                  year: Number(y),
                  month: Number(m),
                  day: Number(d),
                  hour: Number(h),
                }),
              })
            }}
          >
            {loadingKey === 'bazi' ? '···' : t.baziButton}
          </button>
          {results.bazi && (
            <pre className="result-block">
              <span className="result-label">{t.resultLabel}</span>
              {'\n'}
              {results.bazi}
            </pre>
          )}
        </section>

        <section className="card">
          <h2>{t.matchTitle}</h2>
          <p className="card-desc">{t.matchDesc}</p>
          <div className="sub-title">{t.maleLabel}</div>
          <div className="row">
            <input id="m-year" className="input" type="number" placeholder={t.year} />
            <input id="m-month" className="input" type="number" placeholder={t.month} />
          </div>
          <div className="row">
            <input id="m-day" className="input" type="number" placeholder={t.day} />
            <input id="m-hour" className="input" type="number" placeholder={t.hour} />
          </div>
          <div className="sub-title">{t.femaleLabel}</div>
          <div className="row">
            <input id="f-year" className="input" type="number" placeholder={t.year} />
            <input id="f-month" className="input" type="number" placeholder={t.month} />
          </div>
          <div className="row">
            <input id="f-day" className="input" type="number" placeholder={t.day} />
            <input id="f-hour" className="input" type="number" placeholder={t.hour} />
          </div>
          <button
            className="primary-btn"
            onClick={() => {
              const getVal = (id: string) =>
                (document.getElementById(id) as HTMLInputElement | null)?.value
              const y1 = getVal('m-year')
              const m1 = getVal('m-month')
              const d1 = getVal('m-day')
              const h1 = getVal('m-hour')
              const y2 = getVal('f-year')
              const m2 = getVal('f-month')
              const d2 = getVal('f-day')
              const h2 = getVal('f-hour')
              if (!y1 || !m1 || !d1 || !h1 || !y2 || !m2 || !d2 || !h2) {
                alert(t.inputRequired)
                return
              }
              callApi('match', '/match', {
                method: 'POST',
                body: JSON.stringify({
                  male_year: Number(y1),
                  male_month: Number(m1),
                  male_day: Number(d1),
                  male_hour: Number(h1),
                  female_year: Number(y2),
                  female_month: Number(m2),
                  female_day: Number(d2),
                  female_hour: Number(h2),
                }),
              })
            }}
          >
            {loadingKey === 'match' ? '···' : t.matchButton}
          </button>
          {results.match && (
            <pre className="result-block">
              <span className="result-label">{t.resultLabel}</span>
              {'\n'}
              {results.match}
            </pre>
          )}
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-copyright">
            <span>© 2026 Zhouyi Divination System</span>
            <span>Email: 70334174@qq.com</span>
          </div>
          <div className="donate-section">
            <h4>{t.donateText}</h4>
            <p>{t.donateDesc}</p>
            <div className="donate-methods">
              <div className="donate-item">
                <img src="/alipay-qr.png" alt={t.alipay} className="qr-image" />
                <span className="qr-label">{t.alipay}</span>
              </div>
              <div className="donate-item">
                <img src="/wechat-qr.png" alt={t.wechat} className="qr-image" />
                <span className="qr-label">{t.wechat}</span>
              </div>
              <div className="donate-item paypal-item">
                <img src="/paypal-logo.png" alt="PayPal" className="paypal-logo" />
                <span className="paypal-text">{t.paypal}</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
