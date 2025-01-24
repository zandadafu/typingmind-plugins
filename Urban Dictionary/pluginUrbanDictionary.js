async function searchUD({ input }, userSettings) {
  const apiUrl = `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(input)}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data.list && data.list.length > 0) {
      const definitions = data.list.map(item => {
        return `Word: ${item.word}\nDefinition: ${item.definition}\nExample: ${item.example}\nAuthor: ${item.author}\nWritten On: ${item.written_on}\nThumbs Up: ${item.thumbs_up}\nThumbs Down: ${item.thumbs_down}\n`;
      }).join("\n\n");
      return definitions;
    } else {
      return "No definitions found for this word.";
    }
  } catch (error) {
    return `Error fetching definition: ${error.message}`;
  }
}