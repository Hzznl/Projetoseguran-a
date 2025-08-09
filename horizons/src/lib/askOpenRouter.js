export const OPENROUTER_API_KEY = "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";

export async function askOpenRouter(message) {
  const referer = window.location.origin;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': referer
    },
    body: JSON.stringify({
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        { role: 'system', content: 'Você é um assistente especialista em segurança do trabalho, NRs, EPIs, treinamentos e riscos.' },
        { role: 'user', content: message }
      ]
    })
  });

  if (!response.ok) {
    throw new Error("Erro ao consultar a IA");
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Não foi possível obter resposta da IA.";
}
