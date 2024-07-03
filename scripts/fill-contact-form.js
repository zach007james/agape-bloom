async function generateFormData() {
  const prompt = document.getElementById('form-prompt').value;
  const HUGGINGFACE_API_KEY = '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';

  const customPrompt = `
    Given the following information:
    ${prompt}
    Fill out the following form fields to the best of your ability:
    Name:
    Company:
    Email:
    Phone:
    Reason for Contact (choose multiple if applicable): Consulting, Web Development, Custom Model Development, Software Development, Data Analysis, C++ Development, Java Development, Python Development, React Development
    Message:
  `;

  const response = await fetch('https://api-inference.huggingface.co/models/gpt-neo-2.7B', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputs: customPrompt })
  });

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  const generated_text = data[0].generated_text;

  // Parse the generated text and fill the form fields (customize as needed)
  const formData = parseGeneratedText(generated_text);

  document.getElementById('name').value = formData.name || '';
  document.getElementById('company').value = formData.company || '';
  document.getElementById('email').value = formData.email || '';
  document.getElementById('phone').value = formData.phone || '';
  document.getElementById('message').value = formData.message || '';

  // Handle call time options based on the presence of the phone number
  if (formData.phone) {
    document.querySelectorAll('input[name="call-time"]').forEach(checkbox => {
      checkbox.checked = false; // Reset checkboxes
      if (formData.callTimes && formData.callTimes.includes(checkbox.value)) {
        checkbox.checked = true;
      }
    });
  } else {
    document.querySelectorAll('input[name="call-time"]').forEach(checkbox => {
      checkbox.checked = false;
    });
  }

  // Handle interests
  document.querySelectorAll('input[name="interest"]').forEach(checkbox => {
    checkbox.checked = false; // Reset checkboxes
    if (formData.interests && formData.interests.includes(checkbox.value)) {
      checkbox.checked = true;
    }
  });
}

function parseGeneratedText(generated_text) {
  const lines = generated_text.split('\n');
  const formData = {};

  lines.forEach(line => {
    if (line.includes('Name:')) {
      formData.name = line.split('Name:')[1].trim();
    } else if (line.includes('Company:')) {
      formData.company = line.split('Company:')[1].trim();
    } else if (line.includes('Email:')) {
      formData.email = line.split('Email:')[1].trim();
    } else if (line.includes('Phone:')) {
      formData.phone = line.split('Phone:')[1].trim();
    } else if (line.includes('Reason for Contact:')) {
      formData.interests = line.split('Reason for Contact:')[1].trim().split(', ');
    } else if (line.includes('Message:')) {
      formData.message = line.split('Message:')[1].trim();
    }
  });

  return formData;
}

// Test function to ensure the API call works
async function testGenerateFormData() {
  const prompt = document.getElementById('form-prompt').value;

  const HUGGINGFACE_API_KEY = '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';

  const customPrompt = `
    Given the following information:
    ${prompt}
    Fill out the following form fields to the best of your ability:
    Name:
    Company:
    Email:
    Phone:
    Reason for Contact (choose multiple if applicable): Consulting, Web Development, Custom Model Development, Software Development, Data Analysis, C++ Development, Java Development, Python Development, React Development
    Message:
  `;

  const response = await fetch('https://api-inference.huggingface.co/models/gpt-neo-2.7B', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ inputs: customPrompt })
  });

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  const generated_text = data[0].generated_text;

  // Display the generated text in a popup for testing
  alert("Generated Text:\n" + generated_text);
}
