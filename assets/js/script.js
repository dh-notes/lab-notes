
const generateSomeText = async (targetDiv) => {
  if(targetDiv) {
    const url = "https://cu-nil.github.io";
    try {
      const response = await fetch(url);
      if(!response.ok) {
          throw new Error("Network response was not ok");
      }

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const content = doc.querySelector("div#content-for-generated-text");
      if(content){
        const textContent = content.textContent;

        return generateSummary(textContent);
      } else {
        throw new Error("Could not find the content div in the fetched webpage");
      }
    } catch (error) {
      console.error("Error generating text", error);

      return "Error telling you about CU∅";
    }
  }
}

const generateSummary = async (text) => {
    const apiUrl = "https://api.nlpcloud.io/v1/bart-large-cnn/summarization";

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${apiKey}`
            },
            body: JSON.stringify({text}) 
        });
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();

        return data.summary_text;
    } catch (error) {
        console.error('Error:', error);

        return 'Failed to fetch response from NLPCloud.';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
  const targetDiv = document.getElementById("generated-text");
  const generatedText = await generateSomeText(targetDiv);
  targetDiv.innerHTML = generatedText;
});
