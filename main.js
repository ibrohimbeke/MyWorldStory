// main.js provides the api endpoints

// getMyWorldStory reads/gets a story record from the database.
// it handles two cases: 
// 1. It will return a owner's record by id, or
// 2. it will return the ownder's first record, if no id value is provided.
export async function getMyWorldStory(apiKey, ownerName, id) {
    const encodedOwnerName = encodeURIComponent(ownerName);
    let slash = '';
    if (id) {
        slash = '/'+ id;
    }
    try {
        const url = `https://ue-code.eu/api/myworldstory${slash}?ownerName=${encodedOwnerName}&apiKey=${apiKey}`;
        const response = await fetch(url, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // or return a default value
    }

}

// newMyWorldStory creates a new record for the owner in the database and 
// returns the newly created record. It is ok to pass it some empty data, 
// it can always be updated later. The main 
// purpose is to get a new record with a valid id field.
export async function newMyWorldStory(apiKey, ownerName, storyData) {
    const encodedOwnerName = encodeURIComponent(ownerName);
    const url = `https://ue-code.eu/api/myworldstory?ownerName=${encodedOwnerName}&apiKey=${apiKey}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(storyData),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating story:", error);
        throw error;
    }
}

// saveMyWorldStory updates the story data in the database. The id field has to be
// a valid id and is provided as a property of the storyData object.
export async function saveMyWorldStory(apiKey, ownerName, storyData) {
    const { id } = storyData;
    if (!id) {
        throw new Error('An id must be provided to save a story.');
    }
    const encodedOwnerName = encodeURIComponent(ownerName);
    const url = `https://ue-code.eu/api/myworldstory?ownerName=${encodedOwnerName}&apiKey=${apiKey}`;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(storyData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error saving story:", error);
        throw error;
    }
}

// deleteMyWorldStory deletes a story from the database by id.
export async function deleteMyWorldStory(apiKey, ownerName, id) {
  if (!id) {
    throw new Error("An id must be provided to delete a story.");
  }
  const encodedOwnerName = encodeURIComponent(ownerName);
  try {
    const response = await fetch(
      `https://ue-code.eu/api/myworldstory/${id}?ownerName=${encodedOwnerName}&apiKey=${apiKey}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete story. Status: ${response.status}`);
    }

    // API usually returns 204 (No Content) on successful delete
    return { success: true };
  } catch (error) {
    console.error("Error deleting story:", error);
    throw error;
  }
}
