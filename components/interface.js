const backend = 'http://localhost:8082/'

export async function generateCustom(prompt, aimodel) {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      prompt: prompt,
      aimodel: aimodel
  }),
    headers: {
        'Content-Type': 'application/json', 
    },
  };
  const response = await fetch(backend + "generatecustom", options);
  const output = await response.json();
  return output;
}

export async function generateStable(prompt) {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      prompt: prompt
  }),
    headers: {
        'Content-Type': 'application/json', 
    },
  };
  const response = await fetch(backend + "generatestable", options);
  const output = await response.json();
  return output;
}

export async function generateDallE(prompt) {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      prompt: prompt
  }),
    headers: {
        'Content-Type': 'application/json', 
    },
  };
  const response = await fetch(backend + "generatedalle", options);
  const output = await response.json();
  return output;
}