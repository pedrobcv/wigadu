import { addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp } from 'firebase/firestore'

export const QUESTION_SUBCOLLECTION = 'questions'

export function sanitizeAnswers(answers = []) {
  return Array.from({ length: 4 }, (_, index) => (answers[index] ?? '').toString())
}

export function questionFormFromDoc(question = {}, orderFallback = 1) {
  return {
    prompt: question.prompt ?? '',
    answers: sanitizeAnswers(question.answers),
    correctIndex: Number.isInteger(question.correctIndex) ? question.correctIndex : 0,
    explanation: question.explanation ?? '',
    points: Number.isFinite(question.points) ? question.points : 100,
    active: question.active ?? true,
    order: Number.isFinite(question.order) ? question.order : orderFallback,
  }
}

export function questionPayloadFromForm(form, user) {
  const answers = sanitizeAnswers(form.answers).map((answer) => answer.trim())
  const safeCorrectIndex = Math.min(Math.max(Number(form.correctIndex) || 0, 0), answers.length - 1)
  return {
    prompt: form.prompt.trim(),
    answers,
    correctIndex: safeCorrectIndex,
    explanation: form.explanation.trim(),
    points: Number(form.points) || 100,
    active: Boolean(form.active),
    order: Number(form.order) || 1,
    createdBy: user?.uid || '',
    createdByEmail: user?.email || '',
    updatedAt: serverTimestamp(),
  }
}

export async function cloneGameQuestions(db, sourceGameId, targetGameId) {
  const sourceQuery = query(collection(db, 'games', sourceGameId, QUESTION_SUBCOLLECTION), orderBy('order', 'asc'))
  const snapshot = await getDocs(sourceQuery)
  if (snapshot.empty) return 0

  let clonedCount = 0
  for (const questionDoc of snapshot.docs) {
    const data = questionDoc.data()
    await addDoc(collection(db, 'games', targetGameId, QUESTION_SUBCOLLECTION), {
      prompt: data.prompt ?? '',
      answers: sanitizeAnswers(data.answers),
      correctIndex: Number.isInteger(data.correctIndex) ? data.correctIndex : 0,
      explanation: data.explanation ?? '',
      points: Number.isFinite(data.points) ? data.points : 100,
      active: data.active ?? true,
      order: Number.isFinite(data.order) ? data.order : clonedCount + 1,
      duplicatedFrom: questionDoc.id,
      sourceGameId,
      createdBy: data.createdBy ?? '',
      createdByEmail: data.createdByEmail ?? '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    clonedCount += 1
  }

  return clonedCount
}
