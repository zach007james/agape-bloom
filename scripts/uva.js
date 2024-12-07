async function fetchUVAStats()
{
    const userID = "1641288";
    const apiURL = `https://uhunt.onlinejudge.org/api/ranklist/${userID}/0`;

    try 
    {
        const response = await fetch(apiURL);
        const data = await response.json();

        let html = 
        `<p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Rank:</strong> ${data.rank}</p>
        <p><strong>AC Submissions:</strong> ${data.ac}</p>
        <p><strong>Total Submissions:</strong> ${data.total_submissions}</p>`;

        document.getElementById("uva-stats").innerHTML = html;
    }
    catch (error) { console.error("Error fetching UVA stats:", error); }
}

fetchUVAStats();