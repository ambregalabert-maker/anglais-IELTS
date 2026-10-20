// Copier du texte dans le presse-papiers (avec une solution de secours pour les vieux navigateurs).

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const area = document.createElement('textarea')
    area.value = text
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    return ok
  }
}

/** Le texte à coller à Claude pour faire corriger un essai. */
export function correctionPrompt(task: 1 | 2, question: string, essay: string, words: number): string {
  return `Here is my IELTS Academic Writing Task ${task} (${words} words). My target is band 8.5-9 (C2).

QUESTION:
${question}

MY ANSWER:
${essay}

Please:
1. Give me an estimated band score for each criterion (Task ${task === 1 ? 'Achievement' : 'Response'}, Coherence and Cohesion, Lexical Resource, Grammatical Range and Accuracy) and an overall band.
2. List my errors (grammar, vocabulary, punctuation) with corrections and a short explanation in French.
3. Suggest more advanced (C1-C2) vocabulary and structures I could have used.
4. Rewrite one paragraph at band 9 level so I can compare.`
}
